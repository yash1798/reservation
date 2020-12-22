import React from "react"
import { Switch, BrowserRouter, Route } from "react-router-dom"
import Homepage from "./components/pages/Homepage"
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={SignUp} />
				<Route path="/signin" exact component={SignIn} />
				<Route path="/home" exact component={Homepage} />
			</Switch>
		</BrowserRouter>
	)
}

export default MainRouter
