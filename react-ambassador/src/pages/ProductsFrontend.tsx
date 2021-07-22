// pages/ProductsFrontend.tsx
import { useEffect, useState } from 'react'
import { Product } from '../models/product'
import { Filters } from '../models/filters'
import Layout from '../components/Layout'
import Products from '../pages/Products'
import axios from 'axios'

const ProductsFrontend = () => {
	const frontendUrl = 'products/frontend'
	const [filterProducts, setFilterProducts] = useState<Product[]>([])
	const [allProducts, setAllProducts] = useState<Product[]>([])
	const [filters, setFilters] = useState<Filters>({
		q: '',
		sort: '',
	})

	useEffect(() => {
		(
			async () => {
				const {data} = await axios.get(frontendUrl)
				if (data) {
					setAllProducts(data)
					setFilterProducts(data)
				}
			}
		)()
	}, [])

	useEffect(() => {
		let products = allProducts.filter(
			p =>
				p.title.toLocaleLowerCase().indexOf(
					filters.q.toLowerCase()) >= 0 ||
				p.description.toLowerCase().indexOf(
					filters.q.toLowerCase()) >= 0)

		if (filters.sort === 'asc') {
			products.sort((a: Product, b: Product) => {
				if (a.price > b.price) {
					return 1
				}
				if (a.price < b.price) {
					return -1
				}
				return 0
			})
		} else if (filters.sort === 'desc') {
			products.sort((a: Product, b: Product) => {
				if (a.price > b.price) {
					return -1
				}
				if (a.price < b.price) {
					return 1
				}
				return 0
			})
		}
		setFilterProducts(products)
	}, [filters])

	return (
		<Layout>
			<Products
				products={filterProducts}
				filters={filters}
				setFilters={setFilters}
			/>
		</Layout>
	)
}

export default ProductsFrontend
