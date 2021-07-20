// pages/ProductsFrontend.tsx
import { useEffect, useState } from 'react'
import { Product } from '../models/product'
import Layout from '../components/Layout'
import Products from '../pages/Products'
import axios from 'axios'

const ProductsFrontend = () => {
	const backendUrl = 'products/frontend'
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		(
			async () => {
				const {data} = await axios.get(backendUrl)
				if (data) {
					setProducts(data)
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

export default ProductsFrontend
