import { useContext } from 'react'
import style from './App.module.scss'

import { AuthContext } from './contexts/auth'

import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageform } from './components/SendMessageform'

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main
      className={`${style.contentWrapper} ${!!user ? style.contentSigned : ''}`}
    >
      <MessageList />

      {!!user ? <SendMessageform /> : <LoginBox />}
    </main>
  )
}
