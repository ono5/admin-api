// pages/Login.tsx
import { SyntheticEvent, useState } from 'react'
import '../Login.css'
import axios from 'axios'
import { Redirect } from 'react-router'

const Login = () => {
	// ログイン情報
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const loginUrl = 'login'
	const [redirect, setRedirect] = useState(false)

	const submit = async (e: SyntheticEvent) => {
		// formのデフォルトの挙動をキャンセル
		e.preventDefault()

		// ログイン情報を送信
		await axios.post(loginUrl, {
			email: email,
			password: password

			// withCredentials
			// リクエストに Cookie を添えて送信する
			// API側ではCookieにTokenを保存している
		})

		// リダイレクトフラグをTrue
		setRedirect(true)
	}

	if (redirect) {
		// Homeへリダイレクトする
		return <Redirect to={'/'} />
	}

	return (
		<main className="form-signin">
			<form onSubmit={submit}>
				<h1 className="h3 mb-3 fw-normal">Please sign in</h1>

				<div className="form-floating">
					<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
						// Emailをセット
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
					<input type="password" className="form-control" id="floatingPassword" placeholder="Password"
						// Passwordをセット
						onChange={e => setPassword(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>

				<button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
			</form>
	  	</main>
	)
}

export default Login
