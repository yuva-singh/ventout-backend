const express = require("express");
const {
  createStory,
  updateStory,
  getAllStory,
  getSingleStory,
  deleteStory,
} = require("../../controllers/Admin/storyController");
const uploadToCloudinary = require("../../middleware/uploadToCloudnary");

const router = express.Router();

router.post(
  "/create",
  uploadToCloudinary("story", ["image"], [1]),
  createStory
);
router.put(
  "/update/:id",
  uploadToCloudinary("story", ["image"], [1]),
  updateStory
);
router.get("/all", getAllStory);
router.get("/single/:id", getSingleStory);
router.delete("/delete/:id", deleteStory);

module.exports = router;
