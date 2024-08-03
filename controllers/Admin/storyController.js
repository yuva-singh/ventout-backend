const asyncHandler = require("express-async-handler");
const { AdminStory } = require("../../models/Admin/storyModel");

const createStory = asyncHandler(async (req, res) => {
  const { title, subtitle, description, categoryId } = req.body;

  if ((!title, !subtitle, !description, !categoryId)) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const story = await AdminStory.create({
    title,
    subtitle,
    description,
    image,
    categoryId,
  });

  if (!story) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(201).json({ message: "Story created successfully!", story });
});

const updateStory = asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const { title, subtitle, description, categoryId } = req.body;

  if ((!title, !subtitle, !description, !categoryId)) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const story = await AdminStory.findByIdAndUpdate(
    storyId,
    {
      title,
      subtitle,
      description,
      image,
      categoryId,
    },
    { new: true }
  );

  if (!story) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(201).json({ message: "Story updated successfully!", story });
});

const getAllStory = asyncHandler(async (req, res) => {
  const stories = AdminStory.find();

  if (!stories) {
    res.status(404);
    throw new Error("stories not found!");
  }

  res.status(200).json(stories);
});

const getSingleStory = asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const story = AdminStory.findById(storyId);

  if (!story) {
    res.status(404);
    throw new Error("story not found!");
  }

  res.status(200).json(story);
});

const deleteStory = asyncHandler(async (req, res) => {
  const storyId = req.params.id;
  const story = AdminStory.findByIdAndDelete(storyId);

  if (!story) {
    res.status(404);
    throw new Error("story not found!");
  }

  res.status(200).json({ message: "Story deleted successfully!" });
});

module.exports = {
  createStory,
  updateStory,
  getAllStory,
  getSingleStory,
  deleteStory,
};
