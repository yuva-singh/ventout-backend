const express = require("express");
const {
  loginAdmin,
  registerAdmin,
  forgotPasswordAdmin,
} = require("../../controllers/Admin/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.post("/forgotPassword", forgotPasswordAdmin);

module.exports = router;
