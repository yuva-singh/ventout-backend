const asyncHandler = require("express-async-handler");
const { Booking, BookingHistory } = require("../../models/User/bookingModel");
const { Wallet } = require("../../models/User/walletModel");

const createSession = asyncHandler(async (req, res) => {
  const userId = req.user;
  const therapistId = req.params.id;
  const { fees, timeDuration, startTime } = req.body;

  if ((!fees, !timeDuration)) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const userWallet = await Wallet.findOne({ userData: userId });

  if (fees > userWallet.balance) {
    res.status(401);
    throw new Error("You don't have enough money to book session!");
  }

  const session = await Booking.create({
    bookedBy: userId,
    therapistId,
    fees,
    timeDuration,
    startTime,
  });

  if (!session) {
    res.status(500);
    throw new Error("Server Error!");
  }

  await BookingHistory.create({
    bookedBy: userId,
    therapistId,
    sessionId: session._id,
  });

  res.status(201).json({ message: "Session booked successfully!", session });
});

const updateSessionStatus = asyncHandler(async (req, res) => {
  const sessionId = req.params.id;
  const { bookingStatus } = req.body;

  if (!bookingStatus) {
    res.status(400);
    throw new Error("Status is required!");
  }

  const sessionStatus = await Booking.findByIdAndUpdate(
    sessionId,
    {
      bookingStatus,
    },
    { new: true }
  );

  if (!sessionStatus) {
    res.status(500);
    throw new Error("Server Error!");
  }

  res.status(200).json({ message: "Session Status updated succesfully!" });
});

const getSessionsForTherapists = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const sessions = await Booking.find({ therapistId }).populate(
    "bookedBy",
    "name phone profileImg age"
  );

  if (!sessions) {
    res.status(404);
    throw new Error("Sessions not found!");
  }

  res.status(200).json(sessions);
});

////////// Booking History Controllers //////////
const getBookingHistoryForTherapist = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const sessionHistory = await BookingHistory.find(therapistId)
    .populate("bookedBy", "name phone profileImg age")
    .populate("sessionId", "fees timeDuration bookingStatus");

  if (!sessionHistory) {
    res.status(404);
    throw new Error("Session History not found!");
  }

  res.status(200).json(sessionHistory);
});

const getBookingHistoryForUser = asyncHandler(async (req, res) => {
  const userId = req.user;

  const sessionHistory = await BookingHistory.find({ bookedBy: userId })
    .populate("therapistId", "name phone profileImg")
    .populate("sessionId", "fees timeDuration bookingStatus");

  if (!sessionHistory) {
    res.status(404);
    throw new Error("Session History not found!");
  }

  res.status(200).json(sessionHistory);
});

module.exports = {
  createSession,
  updateSessionStatus,
  getSessionsForTherapists,
  getBookingHistoryForTherapist,
  getBookingHistoryForUser,
};
