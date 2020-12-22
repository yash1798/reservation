const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const AppError = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")

exports.tokenCheck = expressAsyncHandler(async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1]

	const decoded = await jwt.verify(token, process.env.JWT_SECRET)

	if (!decoded) {
		throw new AppError("Token fail.", 400)
	}

	const user = await User.findById(decoded.id)

	if (!user) {
		throw new AppError("No user found.", 404)
	}

	req.user = user
	next()
})
