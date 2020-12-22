import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import DeleteIcon from "@material-ui/icons/Delete"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
	},
	margin: {
		margin: theme.spacing(1),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}))

export default function Appointment({ appoin }) {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{appoin.name}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{appoin.date}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					startIcon={<DeleteIcon />}
					endIcon={<Icon>send</Icon>}
				>
					EDIT
				</Button>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					startIcon={<DeleteIcon />}
				>
					DELETE
				</Button>
			</CardActions>
		</Card>
	)
}
