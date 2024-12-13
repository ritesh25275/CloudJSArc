import axios from "axios";

async function updateProperty(propertyId, updatedData) {
	try {
		const response = await axios.put(
			`${process.env.BACKEND_URL}/api/properties/${propertyId}`,
			updatedData
		);

		if (response.status === 200) {
			return { success: true, property: response.data.property };
		}
	} catch (error) {
		console.error("Error updating property:", error);
		return { error: "An error occurred while updating the property" };
	}
}

export default updateProperty;
