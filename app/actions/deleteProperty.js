import axios from "axios";

async function deleteProperty(propertyId) {
	try {
		const response = await axios.delete(
			`${process.env.BACKEND_URL}/api/properties/${propertyId}`
		);

		if (response.status === 200) {
			return { success: true, message: "Property deleted successfully" };
		}
	} catch (error) {
		console.error("Error deleting property:", error);
		return { error: "An error occurred while deleting the property" };
	}
}

export default deleteProperty;
