// pages/products/ProductForm.tsx
import { useEffect, useState, SyntheticEvent } from 'react'
import { Button, TextField } from '@material-ui/core'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

// Propsをつける
const ProductForm = (props: any) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [price, setPrice] = useState(0)
	const [redirect, setRedirect] = useState(false)
	const productCreateUrl = 'products'
	const productGetEditUrl = `products/${props.match.params.id}`

	// ページが表示されたタイミングで、APIからデータを取得する
	useEffect(() => {
		(
			async () => {
				if (props.match.params.id) {
					const { data } = await axios.get(productGetEditUrl)
					setTitle(data.title)
					setDescription(data.description)
					setImage(data.image)
					setPrice(data.price)
				}
			}
		)()
	}, [])


	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()
		const data = {
			title,
			description,
			image,
			price
		}

		// もしIDが渡されていた場合、Edit機能を呼ぶ
		if (props.match.params.id) {
			await axios.put(productGetEditUrl, data)
		} else {
			await axios.post(productCreateUrl, data)
		}

		setRedirect(true)
	}

	if (redirect) {
		return <Redirect to={'/' + productCreateUrl} />
	}

	return(
		<Layout>
			<form onSubmit={submit}>
				<div className="mb-3">
					<TextField
						label="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<TextField
						label="Description"
						value={description}
						rows={4} multiline
						onChange={e => setDescription(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<TextField
						label="Image"
						value={image}
						onChange={e => setImage(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<TextField
						label="Price"
						value={price}
						type="number"
						onChange={e => setPrice(Number(e.target.value))}
					/>
				</div>
				<Button variant="contained" color="primary" type="submit">
					Submit
				</Button>
			</form>
		</Layout>
	)
}

export default ProductForm
