"use server";

import axios from "axios";

async function markMessageAsRead(messageId) {
	try {
		const response = await axios.patch(
			`${process.env.BACKEND_URL}/api/messages/${messageId}/read`
		);

		if (response.status === 200) {
			return { success: true, readStatus: response.data.read };
		} else {
			throw new Error(
				response.data.error || "Failed to mark message as read"
			);
		}
	} catch (error) {
		console.error("Error marking message as read:", error);
		return { error: "An error occurred while marking the message as read" };
	}
}

export default markMessageAsRead;
