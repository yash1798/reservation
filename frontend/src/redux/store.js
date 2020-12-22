import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import reducer from "./mainReducer"

const thunk = require("redux-thunk").default

if (localStorage.getItem("user")) {
	var userInfo = {
		user: JSON.parse(localStorage.getItem("user")),
		loggedIn: true,
	}
} else {
	userInfo = {
		user: {},
	}
}

const initialState = { userInfo }

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
