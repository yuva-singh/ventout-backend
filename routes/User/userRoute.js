const express = require("express");
const {
  loginUser,
  verifyUserOTP,
  registerUser,
  addProfileImg,
  getAllUser,
} = require("../../controllers/User/userController");
const validateOTP = require("../../helper/validateOTP");
const validateToken = require("../../middleware/validateToken");
const uploadToCloudinary = require("../../middleware/uploadToCloudnary");

const router = express.Router();

router.post("/login", loginUser);
router.post("/verify", verifyUserOTP);
router.post("/register", validateOTP, registerUser);
router.patch(
  "/addImg",
  validateToken,
  uploadToCloudinary("profileImg", ["profileImg"], [1]),
  addProfileImg
);
router.get("/all", getAllUser);

module.exports = router;
