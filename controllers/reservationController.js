const expressAsyncHandler = require("express-async-handler")
const Reservation = require("../models/ReservationModel")
const AppError = require("../utils/errorHandler")

exports.getReservations = expressAsyncHandler(async (req, res) => {
	const { id, isAdmin } = req.user

	let reservations

	if (isAdmin === 1) {
		reservations = await Reservation.find()
	} else {
		reservations = await Reservation.find({ user: id })
	}
	if (!reservations) {
		throw new AppError("No Reservations Found.", 404)
	}
	res.json({ status: "success", payload: reservations })
})

exports.createReservation = expressAsyncHandler(async (req, res) => {
	const { id } = req.user
	const { name, date } = req.body
	const reservation = await Reservation.create({ user: id, name, date })
	if (!reservation) {
		throw new AppError(404, "No Reservations Found.")
	}
	res.json({ status: "success", payload: reservation })
})

exports.updateReservation = expressAsyncHandler(async (req, res) => {
	const { id } = req.user
	const { reservationId } = req.params
	const { name, date } = req.body
	console.log(reservationId)
	let reservation = await Reservation.findById(reservationId)
	console.log(reservation)
	if (!reservation) {
		throw new AppError(404, "No Reservations Found.")
	}

	if (parseInt(id) === reservation.user) {
		if (name) {
			reservation.name = name
		}

		if (date) {
			reservation.date = date
		}

		reservation = await reservation.save()

		res.json({ status: "success", payload: reservation })
	}

	throw new AppError(401, "Authentication Error.")
})

exports.deleteReservation = expressAsyncHandler(async (req, res) => {
	const { reservationId } = req.params

	await Reservation.findByIdAndDelete(reservationId)

	res.json({ status: "success", payload: "Deleted Successfully." })
})
