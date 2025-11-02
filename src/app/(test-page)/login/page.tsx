import { login, signOut, signUp } from './actions'

export default function LoginPage() {
  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signUp}>Sign up</button>
      </form>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}