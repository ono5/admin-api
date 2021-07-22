// pages/ProductsBackend.tsx
import { useEffect, useState } from 'react'
import { Product } from '../models/product'
import { Filters } from '../models/filters'
import Layout from '../components/Layout'
import Products from '../pages/Products'
import axios from 'axios'

const ProductsBackend = () => {
	const backendUrl = 'products/backend'
	const [products, setProducts] = useState<Product[]>([])
	const [filters, setFilters] = useState<Filters>({
		q: '',
		sort: '',
	})

	useEffect(() => {
		(
			async () => {
				const arr = []

				if (filters.q) {
					arr.push(`q=${filters.q}`)
				}

				if (filters.sort) {
					arr.push(`sort=${filters.sort}`)
				}

				const {data} = await axios.get(
					backendUrl + '?' + arr.join('&'))

				if (data.data) {
					setProducts(data.data)
				}
			}
		)()
	}, [filters])

	return (
		<Layout>
			<Products
				products={products}
				filters={filters}
				setFilters={setFilters}
			/>
		</Layout>
	)
}

export default ProductsBackend
