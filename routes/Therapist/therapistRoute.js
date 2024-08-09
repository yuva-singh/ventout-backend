const express = require("express");
const validateToken = require("../../middleware/validateToken");
const uploadToCloudinary = require("../../middleware/uploadToCloudnary");
const {
  loginTherapist,
  verifyOTP,
  registerTherapist,
  updateProfile,
  updateKYC,
  updateAvailability,
  getTherapistProfile,
  deleteTherapistProfile,
  getAllTherapistByCategory,
  getAllTherapist,
  suspendTherapist,
  getAllTherapistForAdmin,
  getTherapistAvailability,
  updateFreeStatus,
} = require("../../controllers/Therapist/therapistController");
const router = express.Router();

router.post("/login", loginTherapist);
router.post("/verify", verifyOTP);
router.put(
  "/register",
  validateToken,
  uploadToCloudinary("profileImg", ["profileImg"], [1]),
  registerTherapist
);
router.put(
  "/updateProfile",
  validateToken,
  uploadToCloudinary("profileImg", ["profileImg"], [1]),
  updateProfile
);
router.patch(
  "/KYC",
  validateToken,
  uploadToCloudinary("KYC", ["aadharCard", "degree"], [1, 1]),
  updateKYC
);
router.patch("/Availability", validateToken, updateAvailability);
router.patch("/free/:id", updateFreeStatus);
router.patch("/suspend/:id", suspendTherapist);
router.get("/all", getAllTherapist);
router.get("/allForAdmin", getAllTherapistForAdmin);
router.get("/all/:id", getAllTherapistByCategory);
router.get("/profile/:id", getTherapistProfile);
router.get("/availability/:id", getTherapistAvailability);
router.delete("/delete", validateToken, deleteTherapistProfile);

module.exports = router;
