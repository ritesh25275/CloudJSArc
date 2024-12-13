import axios from "axios";

async function addProperty(propertyData) {
	try {
		const response = await axios.post(
			`${process.env.BACKEND_URL}/api/properties`,
			propertyData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
		);

		if (response.status === 201) {
			return { success: true, property: response.data.property };
		}
	} catch (error) {
		console.error("Error adding property:", error);
		return { error: "An error occurred while adding the property" };
	}
}

export default addProperty;
