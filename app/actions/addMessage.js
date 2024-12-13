"use server";

import axios from "axios";
import { getSessionUser } from "@/utils/getServerSession";

async function addMessage(previousState, formData) {
	try {
		// Retrieve the session user
		const sessionUser = await getSessionUser();

		if (!sessionUser) {
			return { error: "You must be logged in to send a message" };
		}

		const { userId } = sessionUser;

		// Extract form data
		const recipient = formData.get("recipient");
		const property = formData.get("property");
		const name = formData.get("name");
		const email = formData.get("email");
		const phone = formData.get("phone");
		const message = formData.get("message");

		// Make the API request to the backend
		const response = await axios.post(
			`${process.env.BACKEND_URL}/api/messages`,
			{
				userId, // Include userId from session
				recipient,
				property,
				name,
				email,
				phone,
				message,
			}
		);

		if (response.data.error) {
			return { error: response.data.error };
		}

		return { submitted: true, newMessage: response.data.newMessage };
	} catch (error) {
		console.error("Error adding message:", error);
		return { error: "An error occurred while sending the message" };
	}
}

export default addMessage;
