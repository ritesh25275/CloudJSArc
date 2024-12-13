import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import messageRoutes from "./routes/messageRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// Allow requests from the frontend
const corsOptions = {
	origin: process.env.CORS_ORIGIN || "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
};

app.use(cors(corsOptions));

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
app.use("/api/messages", messageRoutes); // Add the message routes
app.use("/api/properties", propertyRoutes);

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
