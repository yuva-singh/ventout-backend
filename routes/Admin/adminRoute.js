const express = require("express");
const {
  loginAdmin,
  registerAdmin,
  forgotPasswordAdmin,
  getTotalCounts,
} = require("../../controllers/Admin/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.post("/forgotPassword", forgotPasswordAdmin);
router.get("/counts", getTotalCounts);

module.exports = router;
