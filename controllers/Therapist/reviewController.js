const asyncHandler = require("express-async-handler");
const { Review } = require("../../models/Therapist/reviewModel");

const createReview = asyncHandler(async (req, res) => {
  const userId = req.user;
  const therapistId = req.params.id;
  const { review, rating } = req.body;

  if ((!review, !rating)) {
    res.status(400);
    throw new Error("Review and Rating is required!");
  }

  const createReview = await Review.create({
    review,
    rating,
    therapistId,
    userId,
  });

  if (!createReview) {
    res.status(500);
    throw new Error("Server Error!");
  }

  res
    .status(201)
    .json({ message: "review created successfully", createReview });
});

const updateReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  const { review, rating } = req.body;

  if ((!review, !rating)) {
    res.status(400);
    throw new Error("Review and Rating is required!");
  }

  const updateReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      review,
      rating,
    },
    { new: true }
  );

  if (!updateReview) {
    res.status(500);
    throw new Error("Server Error!");
  }

  res
    .status(200)
    .json({ message: "review updated successfully", updateReview });
});

const updateReviewStatus = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  const { isApproved } = req.body;

  const updateReview = await Review.findByIdAndUpdate(reviewId, {
    isApproved,
  });

  if (!updateReview) {
    res.status(500);
    throw new Error("Server Error!");
  }

  res.status(200).json({ message: "review status updated successfully" });
});

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isApproved: true }).populate(
    "userId",
    "name profileImg"
  );

  if (!reviews) {
    res.status(404);
    throw new Error("Reviews not found!");
  }

  res.status(200).json(reviews);
});

const getReviewsForAdmin = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate("userId", "name profileImg");

  if (!reviews) {
    res.status(404);
    throw new Error("Reviews not found!");
  }

  res.status(200).json(reviews);
});

const getSingleReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId)
    .populate("userId", "name profileImg")
    .populate("therapistId", "name profileImg");

  if (!review) {
    res.status(404);
    throw new Error("Review not found!");
  }

  res.status(200).json(review);
});

const deleteReview = asyncHandler(async (req, res) => {
  const reviewId = req.params.id;
  
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({ message: "review deleted successfully!" });
});

module.exports = {
  createReview,
  updateReview,
  updateReviewStatus,
  getReviews,
  getReviewsForAdmin,
  getSingleReview,
  deleteReview,
};
