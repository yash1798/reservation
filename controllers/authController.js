const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const AppError = require("../utils/errorHandler")
const User = require("../models/userModel")

exports.signup = asyncHandler(async (req, res) => {
	const { name, password } = req.body

	const hashed_password = await bcrypt.hash(password, 10)

	const user = await User.create({
		name,
		hashed_password,
	})

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	})

	if (!user) {
		throw new AppError("Something went wrong.", 500)
	}
	res.json({ status: "success", payload: token })
})

exports.signin = asyncHandler(async (req, res) => {
	const { name, password } = req.body

	const user = await User.findOne({ name })

	const { hashed_password } = user
	const decoded = await bcrypt.compare(password, hashed_password)
	if (decoded) {
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		})
		return res.json({
			status: "success",
			payload: {
				id: user._id,
				name: user.name,
				token,
			},
		})
	}
	throw new AppError(400, "Invalid username or password.")
})
