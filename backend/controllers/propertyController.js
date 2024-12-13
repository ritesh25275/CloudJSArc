import Property from "../models/Property.js";
import User from "../models/User.js";
import { uploadFile } from "../config/s3.js";

// Add a new property
export const addProperty = async (req, res) => {
	try {
		const { userId } = req.user;
		const {
			type,
			name,
			description,
			location,
			beds,
			baths,
			square_feet,
			amenities,
			rates,
			seller_info,
		} = req.body;

		const images = req.files || [];

		const uploadImage = async (image) => {
			try {
				const fileBuffer = image.buffer;
				const fileName = `CloudJSArc-Rental/${Date.now()}-${
					image.originalname
				}`;
				const fileType = image.mimetype;

				return await uploadFile(fileBuffer, fileName, fileType);
			} catch (error) {
				console.error(
					`Error uploading image ${image.originalname}:`,
					error
				);
				return null; // Return null or handle the error accordingly
			}
		};

		const imageUrls = await Promise.all(images.map(uploadImage));

		// Filter out any failed uploads
		const successfulUploads = imageUrls.filter((url) => url !== null);

		const property = new Property({
			type,
			name,
			description,
			location,
			beds,
			baths,
			square_feet,
			amenities,
			rates,
			seller_info,
			owner: userId,
			images: imageUrls,
		});

		await property.save();

		res.status(201).json({
			message: "Property added successfully",
			property,
		});
	} catch (error) {
		console.error("Error adding property:", error);
		res.status(500).json({
			error: "An error occurred while adding the property",
		});
	}
};

// Delete a property
export const deleteProperty = async (req, res) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;

		const property = await Property.findById(id);

		if (!property) {
			return res.status(404).json({ error: "Property not found" });
		}

		if (property.owner.toString() !== userId) {
			return res
				.status(403)
				.json({ error: "Unauthorized to delete this property" });
		}

		await Property.findByIdAndDelete(id);

		res.status(200).json({ message: "Property deleted successfully" });
	} catch (error) {
		console.error("Error deleting property:", error);
		res.status(500).json({
			error: "An error occurred while deleting the property",
		});
	}
};

// Get all properties
export const getAllProperties = async (req, res) => {
	try {
		const properties = await Property.find();
		console.log("Properties:", properties);
		res.status(200).json(properties);
	} catch (error) {
		console.error("Error fetching properties:", error);
		res.status(500).json({
			error: "An error occurred while fetching properties",
		});
	}
};

export const getRecentProperties = async (req, res) => {
	try {
		// Fetch the 3 latest properties
		const recentProperties = await Property.find({})
			.sort({ createdAt: -1 })
			.limit(3)
			.lean();

		res.status(200).json({ properties: recentProperties });
	} catch (error) {
		console.error("Error fetching recent properties:", error.message);
		res.status(500).json({ error: "Failed to fetch recent properties" });
	}
};

// Update a property
export const updateProperty = async (req, res) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;

		const property = await Property.findById(id);

		if (!property) {
			return res.status(404).json({ error: "Property not found" });
		}

		if (property.owner.toString() !== userId) {
			return res
				.status(403)
				.json({ error: "Unauthorized to update this property" });
		}

		const updatedData = req.body;
		const updatedProperty = await Property.findByIdAndUpdate(
			id,
			updatedData,
			{ new: true }
		);

		res.status(200).json({
			message: "Property updated successfully",
			property: updatedProperty,
		});
	} catch (error) {
		console.error("Error updating property:", error);
		res.status(500).json({
			error: "An error occurred while updating the property",
		});
	}
};

// Check if a property is bookmarked
export const checkBookmarkStatus = async (req, res) => {
	try {
		await connectDB();

		const { userId } = req.user; // Assume authentication middleware adds user info
		const { propertyId } = req.params;

		if (!userId) {
			return res.status(401).json({ error: "User ID is required" });
		}

		// Find user in database
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if property is bookmarked
		const isBookmarked = user.bookmarks.includes(propertyId);

		res.status(200).json({ isBookmarked });
	} catch (error) {
		console.error("Error checking bookmark status:", error);
		res.status(500).json({
			error: "An error occurred while checking bookmark status",
		});
	}
};

// Toggle property bookmark
export const bookmarkProperty = async (req, res) => {
	try {
		await connectDB();

		const { userId } = req.user; // Assume authentication middleware adds user info
		const { propertyId } = req.body;

		if (!userId) {
			return res.status(401).json({ error: "User ID is required" });
		}

		// Find user in database
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if property is bookmarked
		let isBookmarked = user.bookmarks.includes(propertyId);
		let message;

		if (isBookmarked) {
			// If already bookmarked, remove it
			user.bookmarks.pull(propertyId);
			message = "Bookmark removed successfully";
			isBookmarked = false;
		} else {
			// If not bookmarked, add it
			user.bookmarks.push(propertyId);
			message = "Bookmark added successfully";
			isBookmarked = true;
		}

		await user.save();

		res.status(200).json({ message, isBookmarked });
	} catch (error) {
		console.error("Error toggling bookmark:", error);
		res.status(500).json({
			error: "An error occurred while updating the bookmark",
		});
	}
};
