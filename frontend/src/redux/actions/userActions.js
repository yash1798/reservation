export const login = (user) => ({
	type: "USER_LOGIN_SUCCESS",
	payload: user,
})

export const logout = () => async (dispatch) => {
	dispatch({
		type: "USER_LOGOUT",
	})
}
