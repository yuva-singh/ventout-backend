const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
} = require("../../controllers/Admin/categoryController");

const router = express.Router();

router.post("/create", createCategory);
router.put("/update/:id", updateCategory);
router.get("/get", getCategory);

module.exports = router;
