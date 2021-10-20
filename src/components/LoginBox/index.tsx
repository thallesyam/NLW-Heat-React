import { useEffect } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../services/api'

import style from './style.module.scss'

const client_id = '42613540cccc83a748ae'

type AuthResponse = {
  token: string
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`

  async function signIn(githubCode: string) {
    const { data } = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = data

    localStorage.setItem('@dowhile:token', token)
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

  return (
    <div className={style.loginBoxWrapper}>
      <strong>Entre e compartile sua mensagem</strong>
      <a href={signInUrl} className={style.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  )
}
