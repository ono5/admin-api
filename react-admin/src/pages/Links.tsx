// pages/Links.tsx
import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination
} from '@material-ui/core'
import { Link } from '../models/link'
import Layout from '../components/Layout'
import axios from 'axios'

const Links = (props: any) => {
	const [links, setLinks] = useState<Link[]>([])
	const [page, setPage] = useState(0)
	const perPage = 10

	let linksUrl = `users/${props.match.params.id}/links`

	useEffect(() => {
		(
			async () => {
				const { data } = await axios.get(linksUrl)
				setLinks(data)
			}
		)()
	}, [])

	return (
		<Layout>
			<Table className="table table-striped table-sm">
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell>Code</TableCell>
						<TableCell>Count</TableCell>
						<TableCell>Revenue</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{/* perPageごとにユーザーをスライス */}
					{links.slice(page * perPage, (page + 1) * perPage).map(link => {
						return (
							<TableRow key={link.id}>
								<TableCell>{link.id}</TableCell>
								<TableCell>{link.code}</TableCell>
								<TableCell>{link.orders.length}</TableCell>
								<TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
						count={links.length}
						page={page}
						onChangePage={(e, newPage) => setPage(newPage)}
						rowsPerPageOptions={[]}
						rowsPerPage={perPage}
						></TablePagination>
					</TableRow>
				</TableFooter>
			</Table>
		</Layout>
	)
}

export default Links
