"use server";

import axios from "axios";
import { getSessionUser } from "@/utils/getServerSession";

async function deleteMessage(messageId) {
	try {
		// Retrieve the session user
		const sessionUser = await getSessionUser();

		if (!sessionUser) {
			return { error: "You must be logged in to delete a message" };
		}

		const { userId } = sessionUser;

		// Make the API request to the backend
		const response = await axios.delete(
			`${process.env.BACKEND_URL}/api/messages/${messageId}`,
			{
				data: { userId }, // Pass userId in the request body
			}
		);

		if (response.data.error) {
			return { error: response.data.error };
		}

		return { success: true };
	} catch (error) {
		console.error("Error deleting message:", error);
		return { error: "An error occurred while deleting the message" };
	}
}

export default deleteMessage;
