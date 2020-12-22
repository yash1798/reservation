const mongoose = require("mongoose")

const reservationSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	name: String,
	time: Date,
})

const Reservation = mongoose.model("Reservation", reservationSchema)

module.exports = Reservation
