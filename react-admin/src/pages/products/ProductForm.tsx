// pages/products/ProductForm.tsx
import { useState, SyntheticEvent } from 'react'
import { Button, TextField } from '@material-ui/core'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


const ProductForm = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [price, setPrice] = useState(0)
	const [redirect, setRedirect] = useState(false)

	// リクエスト先
	const productCreateUrl = 'products'

	// SyntheticEvent
	// https://ja.reactjs.org/docs/events.html
	const submit = async (e: SyntheticEvent) => {
		e.preventDefault()

		await axios.post(productCreateUrl, {
			title,
			description,
			image,
			price
		})

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
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<TextField
						label="Description"
						rows={4} multiline
						onChange={e => setDescription(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<TextField
						label="Image"
						onChange={e => setImage(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<TextField
						label="Price"
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
