"use server";

import axios from "axios";

async function getUnreadMessageCount() {
	try {
		// Fetch unread message count from the backend
		const response = await axios.get(
			`${process.env.BACKEND_URL}/api/messages/unread-count`,
			{ withCredentials: true } // Ensure cookies are sent for authentication
		);

		if (response.status === 200) {
			// Return the count from the response
			return { count: response.data.count };
		} else {
			// Handle non-successful responses
			throw new Error(
				response.data.error || "Failed to fetch unread message count"
			);
		}
	} catch (error) {
		// Log and return error details
		console.error("Error fetching unread message count:", error);
		return { error: "An error occurred while fetching unread messages" };
	}
}

export default getUnreadMessageCount;
