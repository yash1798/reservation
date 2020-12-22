export const userReducer = (state = {}, action) => {
	const { type, payload } = action
	switch (type) {
		case "USER_LOGIN_SUCCESS":
			localStorage.setItem("user", JSON.stringify(payload))
			return { user: payload }
		case "USER_LOGOUT":
			localStorage.removeItem("user")
			return { ...state, userInfo: { user: {} } }
		default:
			return state
	}
}
