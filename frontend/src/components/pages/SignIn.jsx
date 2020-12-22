import React, { useState } from "react"
import { useDispatch } from "react-redux"

import Avatar from "@material-ui/core/Avatar"
import { Redirect, Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import fetchCall from "../../utility/fetchCall"

import { login } from "../../redux/actions/userActions"

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn() {
	const classes = useStyles()
	const dispatch = useDispatch()

	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [flag, setFlag] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		const body = { name, password }

		const data = await fetchCall("auth/signup", "POST", null, body)

		if (data.status === "success") {
			setFlag(true)
			dispatch(login(data.payload))
		}
	}

	if (flag) {
		return <Redirect to="/home" />
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={(e) => handleSubmit(e)}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link to="/" variant="body2">
								<p>"Don't have an account? Sign Up"</p>
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}
