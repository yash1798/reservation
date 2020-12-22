const express = require("express")

const {
	getReservations,
	createReservation,
	updateReservation,
	deleteReservation,
} = require("../controllers/reservationController")
const { tokenCheck } = require("../middlewares/authMiddleware")

const router = express.Router()

router.get("/", tokenCheck, getReservations)
router.post("/", tokenCheck, createReservation)
router.put("/:reservationId", tokenCheck, updateReservation)
router.delete("/:reservationId", tokenCheck, deleteReservation)

module.exports = router
