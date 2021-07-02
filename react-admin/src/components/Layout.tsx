// components/Layout.tsx
import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { UserProps } from '../models/user'
import Nav from '../components/Nav'
import Menu from '../components/Menu'
import axios from 'axios'

const Layout = (props: any) => {
	const userURL = 'user'
	const [redirect, setRedirect] = useState(false)
	// User情報のState
	const [user, setUser] = useState<UserProps | null>(null)

	useEffect(() => {
		(
			async () => {
				try {
					const { data } = await axios.get(userURL)
					// User情報をセット
					setUser(data)
				} catch(e) {
					setRedirect(true)
				}
			}
		)()
	}, [])

	if (redirect) {
		// ログイン画面へリダイレクト
		return <Redirect to={'/login'} />
	}

	return (
		<div>
			<Nav user={user}/>
			<div className="container-fluid">
				<div className="row">
					<Menu />

					<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<div className="table-responsive">
							{props.children}
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default Layout
