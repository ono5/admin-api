// redux/actions/setUserAction.ts
import { UserProps as User } from '../../models/user'

export const setUserAction = (user: User) => ({
	type: 'SET_USER',
	user
})
