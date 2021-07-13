// redux/reducers/setUserReducer.ts

import { UserProps } from "../../models/user"

const initialState = {
	user: new UserProps()
}

export const setUserReducer = (
	state = initialState, action: {type: string, user: UserProps}) => {
		switch (action.type) {
			case 'SET_USER':
				return {
					...state,
					user: action.user
				}
			default:
				return state
		}
}
