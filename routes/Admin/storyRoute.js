const express = require("express");
const {
  createStory,
  updateStory,
  getAllStory,
  getSingleStory,
  deleteStory,
  viewStory,
  getStoryViewers,
  updateStoryIndex,
} = require("../../controllers/Admin/storyController");
const uploadToCloudinary = require("../../middleware/uploadToCloudnary");
const validateToken = require("../../middleware/validateToken");

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
router.patch("/index/:id", updateStoryIndex);
router.get("/all", getAllStory);
router.get("/single/:id", getSingleStory);
router.delete("/delete/:id", deleteStory);

////////// Story Viewers Routes //////////
router.post("/view/:id", validateToken, viewStory);
router.get("/viewedUsers/:id", getStoryViewers);

module.exports = router;
