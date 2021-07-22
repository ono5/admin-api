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
		q: ''
	})

	useEffect(() => {
		(
			async () => {
				const {data} = await axios.get(frontendUrl)
				if (data) {
					setAllProducts(data)
				}
			}
		)()
	}, [filters])

	useEffect(() => {
		let products = allProducts.filter(
			p =>
				p.title.toLocaleLowerCase().indexOf(
					filters.q.toLowerCase()) >= 0 ||
				p.description.toLowerCase().indexOf(
					filters.q.toLowerCase()) >= 0)
		console.log({products})
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
