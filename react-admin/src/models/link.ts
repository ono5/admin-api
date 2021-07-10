// models/link.ts
import { Order } from './order'

export interface Link {
	id: string
	code: string
	orders: Order[]
}
