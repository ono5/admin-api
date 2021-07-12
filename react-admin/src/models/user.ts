// models/user.ts

export class User {
	first_name: string
	last_name: string
	email: string
	password: string
	password_confirm: string

	constructor(
		first_name: string, last_name: string, email: string,
		password: string, password_confirm: string) {

		this.first_name = first_name
		this.last_name = last_name
		this.email = email
		this.password = password
		this.password_confirm = password_confirm
	}
}

// interfeace -> classに変更
export class UserProps {
	id!: number
	first_name!: string
	last_name!: string
	email!: string
}
