import express from "express";
import {
	addProperty,
	deleteProperty,
	getAllProperties,
	getRecentProperties,
	updateProperty,
	checkBookmarkStatus,
	bookmarkProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", addProperty); // Add a new property
router.get("/", getAllProperties); // Get all properties
router.get("/recent", getRecentProperties);
router.delete("/:id", deleteProperty); // Delete a property
router.put("/:id", updateProperty); // Update a property
router.get("/bookmark-status/:propertyId", checkBookmarkStatus); // Check if property is bookmarked
router.post("/bookmark", bookmarkProperty); // Toggle bookmark for a property

export default router;
