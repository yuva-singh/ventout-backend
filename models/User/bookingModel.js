const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
    },
    fees: {
      type: Number,
      default: 0,
    },
    timeDuration: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirm", "Cancel"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

////////// Booking History Schema //////////
const bookingHistorySchema = mongoose.Schema(
  {
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
const BookingHistory = mongoose.model("BookingHistory", bookingHistorySchema);

module.exports = {
  Booking,
  BookingHistory,
};
