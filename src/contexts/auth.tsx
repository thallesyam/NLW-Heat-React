import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

type AuthResponse = {
  token: string
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}

type User = {
  id: string
  name: string
  login: string
  avatar_url: string
}

type AuthContextData = {
  user: User | null
  signInUrl: string
  signOut: () => void
}

type AuthProvider = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)
const client_id = '42613540cccc83a748ae'

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`

  async function signIn(githubCode: string) {
    const { data } = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = data

    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)
      signIn(githubCode)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')
    api.defaults.headers.common.authorization = `Bearer ${token}`

    if (token) {
      api.get<User>('profile').then((response) => {
        setUser(response.data)
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
