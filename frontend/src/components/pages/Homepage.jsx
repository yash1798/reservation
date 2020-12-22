import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Container, Typography, Grid } from "@material-ui/core"
import fetchCall from "../../utility/fetchCall"
import Appointment from "../functional/Appointment"

const Homepage = () => {
	const token = useSelector((state) => state.userInfo.user)

	const [appointments, setAppointments] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchCall("reservations", "GET", token)

			if (data.status === "success") {
				setAppointments(data.payload)
				console.log(data.payload)
			}
		}
		fetchData()
	}, [token])

	return (
		<Container>
			<Typography style={{ textAlign: "center", padding: "10px" }} variant="h3">
				Homepage
			</Typography>
			<Grid container direction="column" spacing={10}>
				{appointments.length > 0 ? (
					appointments.map((appoin) => (
						<Grid item>
							<Appointment appoin={appoin} />
						</Grid>
					))
				) : (
					<Grid item>
						<Typography variant="h3">No Reservations Yet</Typography>
					</Grid>
				)}
			</Grid>
			<Button
				variant="contained"
				color="secondary"
				className={classes.button}
				startIcon={<DeleteIcon />}
			>
				Delete
			</Button>
		</Container>
	)
}

export default Homepage
