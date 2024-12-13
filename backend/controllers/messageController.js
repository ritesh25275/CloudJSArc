import Message from "../models/Message.js";
import connectDB from "../config/database.js";

// Add a new message
export const addMessage = async (req, res) => {
	try {
		await connectDB();

		const { userId, recipient, property, name, email, phone, message } =
			req.body;

		if (!userId) {
			return res
				.status(401)
				.json({ error: "You must be logged in to send a message" });
		}

		if (userId === recipient) {
			return res
				.status(400)
				.json({ error: "You cannot send a message to yourself" });
		}

		const newMessage = new Message({
			sender: userId,
			recipient,
			property,
			name,
			email,
			phone,
			body: message,
		});

		await newMessage.save();

		res.status(201).json({
			message: "Message sent successfully",
			newMessage,
		});
	} catch (error) {
		console.error("Error adding message:", error);
		res.status(500).json({
			error: "An error occurred while sending the message",
		});
	}
};

// Get all messages for a user
export const getMessages = async (req, res) => {
	try {
		await connectDB();

		const { userId } = req.body;

		if (!userId) {
			return res
				.status(401)
				.json({ error: "You must be logged in to view messages" });
		}

		const messages = await Message.find({ recipient: userId }).populate(
			"sender property"
		);

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error fetching messages:", error);
		res.status(500).json({
			error: "An error occurred while fetching messages",
		});
	}
};

// Delete a message
export const deleteMessage = async (req, res) => {
	try {
		await connectDB();

		const { userId } = req.body;
		const { id } = req.params;

		if (!userId) {
			return res
				.status(401)
				.json({ error: "You must be logged in to delete a message" });
		}

		const message = await Message.findById(id);

		if (!message) {
			return res.status(404).json({ error: "Message not found" });
		}

		if (message.recipient.toString() !== userId) {
			return res.status(403).json({
				error: "You are not authorized to delete this message",
			});
		}

		await Message.findByIdAndDelete(id);

		res.status(200).json({ message: "Message deleted successfully" });
	} catch (error) {
		console.error("Error deleting message:", error);
		res.status(500).json({
			error: "An error occurred while deleting the message",
		});
	}
};

// Get the count of unread messages
export const getUnreadMessageCount = async (req, res) => {
	try {
		await connectDB();

		const { userId } = req.body;

		if (!userId) {
			return res.status(401).json({ error: "Unauthorized access" });
		}

		const unreadCount = await Message.countDocuments({
			recipient: userId,
			read: false,
		});

		res.status(200).json({ unreadCount });
	} catch (error) {
		console.error("Error fetching unread message count:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Mark a message as read
export const markMessageAsRead = async (req, res) => {
	try {
		await connectDB();

		const { userId } = req.body;
		const { messageId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "Unauthorized access" });
		}

		const message = await Message.findById(messageId);

		if (!message) {
			return res.status(404).json({ error: "Message not found" });
		}

		if (message.recipient.toString() !== userId) {
			return res.status(403).json({
				error: "You are not authorized to update this message",
			});
		}

		message.read = true;
		await message.save();

		res.status(200).json({ success: true, read: message.read });
	} catch (error) {
		console.error("Error marking message as read:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
