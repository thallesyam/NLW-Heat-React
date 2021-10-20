import { createContext, ReactNode } from 'react'

const AuthContext = createContext(null)

type AuthProvider = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProvider) {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
}

// 1:18:25 tempo de aula