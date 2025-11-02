import { login, signUp, signOut } from "./actions";

export default function LoginPage() {


    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />

                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />

                <label htmlFor="name">Nombre y Apellido:</label>
                <input id="name" name="name" required />

                <label htmlFor="username">Nombre de usuario:</label>
                <input id="username" name="username" required />


                <button formAction={login}>Log in</button>
                <button formAction={signUp}>Sign up</button>
            </form>
            <button className="border-2 border-amber-300 text-white bg-amber-900" onClick={signOut}>Sign out</button>
        </div>
    )
}