// pages/Profile.tsx
import { SyntheticEvent, useEffect, useState } from 'react'
import {
	Button,
	TextField
} from '@material-ui/core'
import Layout from '../components/Layout'
import axios from 'axios'

const Profile = () => {
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password_confirm, setPasswordConfirm] = useState("")

	const userUrl = 'user'
	const userInfo = 'info'
	const userPassword = 'password'

	useEffect(() => {
		(
			async () => {
				const { data } = await axios.get(userUrl)
				setFirstName(data.first_name)
				setLastName(data.last_name)
				setEmail(data.email)
			}
		)()
	}, [])

	const infoSubmit = async(e: SyntheticEvent) => {
		e.preventDefault()

		await axios.put(userInfo, {
			first_name,
			last_name,
			email
		})
	}

	const passwordSubmit = async(e: SyntheticEvent) => {
		e.preventDefault()

		await axios.put(userPassword, {
			password,
			password_confirm
		})
	}

	return (
		<Layout>
			<h3>Account Information</h3>
			<form onSubmit={infoSubmit}>
				<div className="mb-3">
					<TextField
						label="First Name"
						onChange={e => setFirstName(e.target.value)}
						value={first_name} />
				</div>
				<div className="mb-3">
					<TextField
						label="Last Name"
						onChange={e => setLastName(e.target.value)}
						value={last_name} />
				</div>
				<div className="mb-3">
					<TextField
						label="Email"
						onChange={e => setEmail(e.target.value)}
						value={email} />
				</div>
				<Button
					variant="contained"
					color="primary"
					type="submit">
						Submit
				</Button>
			</form>

			<h3 className="mt-4">Change Password</h3>
			<form onSubmit={passwordSubmit}>
				<div className="mb-3">
					<TextField
						label="Password"
						type="password"
						onChange={e => setPassword(e.target.value)} />
				</div>
				<div className="mb-3">
					<TextField
						label="Password Confirm"
						type="password"
						onChange={e => setPasswordConfirm(e.target.value)} />
				</div>
				<Button
					variant="contained"
					color="primary"
					type="submit">
						Submit
				</Button>
			</form>
		</Layout>
	)
}

export default Profile
