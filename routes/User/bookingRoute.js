const express = require("express");
const validateToken = require("../../middleware/validateToken");
const {
  getBookingHistoryForTherapist,
  getBookingHistoryForUser,
  createSession,
  updateSessionStatus,
  getSessionsForTherapists,
} = require("../../controllers/User/bookingController");

const router = express.Router();

router.post("/create/:id", validateToken, createSession);
router.patch("/status/:id", updateSessionStatus);
router.get("/get", validateToken, getSessionsForTherapists);

////////// Booking History Routes //////////
router.get(
  "/therapist/bookingHistory",
  validateToken,
  getBookingHistoryForTherapist
);
router.get("/user/bookingHistory", validateToken, getBookingHistoryForUser);

module.exports = router;
