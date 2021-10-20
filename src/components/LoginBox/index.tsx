import { VscGithubInverted } from 'react-icons/vsc'
import style from './style.module.scss'

export function LoginBox() {
  return (
    <div className={style.loginBoxWrapper}>
      <strong>Entre e compartile sua mensagem</strong>
      <a href="#" className={style.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  )
}
