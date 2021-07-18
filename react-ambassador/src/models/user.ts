// models/user.ts

export class User {
	id?: number
	first_name!: string
	last_name!: string
	email!: string
	password?: string
	password_confirm?: string
	revenue?: number
}
