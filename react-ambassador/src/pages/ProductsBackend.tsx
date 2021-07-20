// pages/ProductsBackend.tsx
import { useEffect, useState } from 'react'
import { Product } from '../models/product'
import Layout from '../components/Layout'
import Products from '../pages/Products'
import axios from 'axios'

const ProductsBackend = () => {
	const backendUrl = 'products/backend'
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		(
			async () => {
				const {data} = await axios.get(backendUrl)
				if (data.data) {
					setProducts(data.data)
				}
			}
		)()
	}, [])

	return (
		<Layout>
			<Products products={products} />
		</Layout>
	)
}

export default ProductsBackend
