// pages/Users.tsx
import { useEffect, useState } from 'react'
import { UserProps } from '../models/user'
import { Table, TableBody, TableRow, TableHead, TableCell } from '@material-ui/core'
import Layout from '../components/Layout'
import axios from 'axios'

const Users = () => {
	// 状態管理
	const [users, setUsers] = useState<UserProps[]>([])
	let ambassadorsUrl = 'ambassadors'

	useEffect(() => {
		(
			async () => {
				const { data } = await axios.get(ambassadorsUrl)
				setUsers(data)
			}
		)()
	}, [])// 第二引数は第一引数に指定した関数の実行タイミングを決める
	      // 空を渡した場合、マウント・アンマウント時のみ第１引数の関数を実行

	return (
		<Layout>
			<Table className="table table-striped table-sm">
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map(user => {
						return (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.first_name} {user.last_name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell></TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Layout>
	)
}

export default Users
