const express = require("express");
const validateToken = require("../../middleware/validateToken");
const {
  createReview,
  updateReview,
  updateReviewStatus,
  getReviews,
  getReviewsForAdmin,
  getSingleReview,
  deleteReview,
} = require("../../controllers/Therapist/reviewController");

const router = express.Router();

router.post("/create/:id", validateToken, createReview);
router.put("/update/:id", updateReview);
router.patch("/status/:id", updateReviewStatus);
router.get("/get", getReviews);
router.get("/getForAdmin", getReviewsForAdmin);
router.get("/single/:id", getSingleReview);
router.delete("/delete/:id", deleteReview);

module.exports = router;
