"use server";

import axios from "axios";

async function bookmarkProperty(propertyId) {
	try {
		const response = await axios.post(
			`${process.env.BACKEND_URL}/api/properties/bookmark`,
			{ propertyId },
			{ withCredentials: true }
		);

		if (response.status === 200) {
			return {
				message: response.data.message,
				isBookmarked: response.data.isBookmarked,
			};
		} else {
			throw new Error(
				response.data.error || "Failed to update bookmark status"
			);
		}
	} catch (error) {
		console.error("Error bookmarking property:", error);
		return { error: "An error occurred while bookmarking the property" };
	}
}

export default bookmarkProperty;
