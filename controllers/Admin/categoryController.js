const asyncHandler = require("express-async-handler");
const Category = require("../../models/Admin/categoryModel");

const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    res.status(404);
    throw new Error("All Fields required!");
  }

  const category = await Category.create({
    categoryName,
  });

  if (!category) {
    res.status(401);
    throw new Error("data is not valid!");
  }

  res.status(201).json({
    message: "New Category created!",
    category,
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  if (!categories) {
    res.status(404);
    throw new Error("data is not found!");
  }

  res.status(200).json(categories);
});

const updateCategory = asyncHandler(async (req, res) => {
  const catId = req.params.id;

  const { categoryName } = req.body;

  if (!categoryName) {
    res.status(404);
    throw new Error("All Fields required!");
  }

  const updateCategory = await Category.findByIdAndUpdate(catId, {
    categoryName,
  });

  if (!updateCategory) {
    res.status(404);
    throw new Error("Category not found!");
  }

  res.status(200).json({ message: "Category Updated successfully!" });
});

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
};
