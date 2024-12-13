import axios from "axios";

async function checkBookmarkStatus(propertyId) {
	try {
		const response = await axios.get(
			`${process.env.BACKEND_URL}/api/properties/bookmark-status/${propertyId}`
		);

		if (response.status === 200) {
			return { isBookmarked: response.data.isBookmarked };
		}
	} catch (error) {
		console.error("Error checking bookmark status:", error);
		return {
			error: "An error occurred while checking the bookmark status",
		};
	}
}

export default checkBookmarkStatus;
