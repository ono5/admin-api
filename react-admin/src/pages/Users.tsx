// pages/Users.tsx
import { useEffect, useState } from 'react'
import { UserProps } from '../models/user'
import {
	Table,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination
} from '@material-ui/core'
import Layout from '../components/Layout'
import axios from 'axios'

const Users = () => {
	const [users, setUsers] = useState<UserProps[]>([])

	// ページ情報のState
	const [page, setPage] = useState(0)
	const perPage = 10

	let ambassadorsUrl = 'ambassadors'

	useEffect(() => {
		(
			async () => {
				const { data } = await axios.get(ambassadorsUrl)
				setUsers(data)
			}
		)()
	}, [])

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
					{/* perPageごとにユーザーをスライス */}
					{users.slice(page * perPage, (page + 1) * perPage).map(user => {
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
				<TableFooter>
					<TablePagination
					  count={users.length}
					  page={page}
					  onChangePage={(e, newPage) => setPage(newPage)}
					  rowsPerPageOptions={[]}
					  rowsPerPage={perPage}
					></TablePagination>
				</TableFooter>
			</Table>
		</Layout>
	)
}

export default Users
