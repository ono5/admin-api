// components/Layout.tsx
import { Dispatch, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { User } from '../models/user'
import { setUserAction } from '../redux/actions/setUserAction'
import Nav from './Nav'
import Header from './Header'
import axios from 'axios'

const Layout = (props: any) => {
	const userURL = 'user'
	const [redirect, setRedirect] = useState(false)
	// User情報のState

	useEffect(() => {
		(
			async () => {
				try {
					const { data } = await axios.get(userURL)
					props.setUser(data)
				} catch(e) {
					console.log(e)
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
			<Nav />
			<main>
				<Header />
				<div className="album py-5 bg-light">
					<div className="container">
						{props.children}
					</div>
				</div>
			</main>
		</div>
	)
}

// State
const mapStateToProps = (state: {user: User}) => ({
	user: state.user
})

// Dispatch
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	// setUser(Action)->dispatch
	setUser: (user: User) => dispatch(setUserAction(user))
})

// LayoutコンポーネントをRedux Storeに登録
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
