const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: String,
	hashed_password: String,
	isAdmin: {
		type: Number,
		default: 0,
	},
})

const User = mongoose.model("User", userSchema)

module.exports = User
