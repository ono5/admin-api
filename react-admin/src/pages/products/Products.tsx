// pages/products/Products.tsx
import { useState, useEffect } from 'react'
import { Product } from '../../models/Product'
import axios from 'axios'
import {
	Button,
	Table,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableFooter,
	TablePagination
} from '@material-ui/core'
import Layout from '../../components/Layout'

const Products = () => {
	const [products, setProducts] = useState<Product[]>([])
	const productsUrl = '/products'
	const [page, setPage] = useState(0)
	const perPage = 10

	useEffect(() => {
		(
			async () => {
				const { data } = await axios.get(productsUrl)
				setProducts(data)
			}
		)()
	}, [])

	const del = async (id: number) => {
		if (window.confirm('商品を削除しますか?')) {
			await axios.delete(`${productsUrl}/${id}`)

			setProducts(products.filter(p => p.id !== id))
		}
	}

	return (
		<Layout>
			<Table className="table table-striped table-sm">
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell>Image</TableCell>
						<TableCell>Title</TableCell>
						<TableCell>Description</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.slice(page * perPage, (page + 1) * perPage).map(product => {
						return (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell><img src={product.image} width={50}/></TableCell>
								<TableCell>{product.title}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="secondary"
										onClick ={() => del(product.id)}
								 	>Delete</Button>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
						count={products.length}
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

export default Products
