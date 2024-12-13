import express from "express";
import {
	addMessage,
	getMessages,
	deleteMessage,
	getUnreadMessageCount,
	markMessageAsRead,
} from "../controllers/messageController.js";

const router = express.Router();

// Routes
router.post("/", addMessage); // Add a new message
router.get("/", getMessages); // Get all messages for the logged-in user
router.delete("/:id", deleteMessage); // Delete a specific message by ID
router.get("/unread-count", getUnreadMessageCount);
router.patch("/:id/read", markMessageAsRead); // Mark a specific message as read

export default router;
