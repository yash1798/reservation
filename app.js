const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const mongooseConnect = require("./utils/mongooseConnect") //Connecting the mongodDB to the app
const errorController = require("./controllers/errorController") //ErrorController

const authRoutes = require("./routes/authRoutes")
const reservationRoutes = require("./routes/reservationRoutes")

dotenv.config()

const app = express()

mongooseConnect(process.env.MONGO_URI, process.env.MODE) //Connecting.....

if (process.env.MODE === "DEVELOPMENT") {
	app.use(morgan("dev"))
}

app.use(express.json()) //body parser for json
app.use(cors()) //CORS for development

app.use("/api/auth", authRoutes)
app.use("/api/reservations", reservationRoutes)

app.use(errorController)

const PORT = process.env.PORT || 5000 //Port to listen on

const dirname = path.resolve()

if (process.env.NODE_ENV === "PRODUCTION") {
	app.use(express.static(path.join(dirname, "/frontend/build")))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	})
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`)) //Connecting....
