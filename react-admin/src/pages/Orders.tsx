// pages/Orders.tsx
import { useEffect, useState } from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core'
import { Order } from '../models/order'
import Layout from '../components/Layout'
import axios from 'axios'

const Orders = () => {
	// Stateの設定
	const [orders, setOrders] = useState<Order[]>([])
	const orderUrl = 'orders'

	// ページが読み込まれた時に実行
	useEffect(() => {
		(
			async () => {
				const { data } = await axios.get(orderUrl)
				setOrders(data)
			}
		)()
	}, [])

	return (
		<Layout>
			{orders.map(order => {
				return (
					<Accordion key={order.id}>
						<AccordionSummary>
							{order.name} ${order.total}
						</AccordionSummary>
						<AccordionDetails>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell>Product Title</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>Quantity</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order.order_items.map(item => {
										return (
											<TableRow key={item.id}>
												<TableCell>{item.id}</TableCell>
												<TableCell>{item.product_title}</TableCell>
												<TableCell>{item.price}</TableCell>
												<TableCell>{item.quantity}</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</AccordionDetails>
					</Accordion>
				)
			})}
		</Layout>
	)
}

export default Orders
