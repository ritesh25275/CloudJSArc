const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to Database with Error Handling
(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Database connection error:", error.message);
		process.exit(1); // Exit process if unable to connect
	}
})();

// Routes
const messageRoutes = require("./routes/messageRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// Use Routes
app.use("/api/messages", async (req, res, next) => {
	try {
		await messageRoutes(req, res, next);
	} catch (error) {
		console.error("Error in /api/messages route:", error.message);
		res.status(500).send({
			error: "An error occurred while processing messages",
		});
	}
});

app.use("/api/properties", async (req, res, next) => {
	try {
		await propertyRoutes(req, res, next);
	} catch (error) {
		console.error("Error in /api/properties route:", error.message);
		res.status(500).send({
			error: "An error occurred while processing properties",
		});
	}
});

// Default Route
app.get("/", (req, res) => {
	try {
		res.send("Backend API is running...");
	} catch (error) {
		console.error("Error on default route:", error.message);
		res.status(500).send({ error: "An error occurred on the server" });
	}
});

// Error Handling Middleware
app.use((err, req, res, next) => {
	console.error("Unhandled error:", err.stack);
	res.status(500).send({ message: "An unexpected error occurred" });
});

// Start Server with Error Handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting server:", err.message);
	} else {
		console.log(`Server is running on port ${PORT}`);
	}
});
