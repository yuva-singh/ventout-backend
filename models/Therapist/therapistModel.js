const mongoose = require("mongoose");

const therapistSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    fees: {
      type: Number,
    },
    feesPerMinute: {
      type: Number,
    },
    discountedFees: {
      type: Number,
    },
    aadharCard: {
      type: String,
    },
    degree: {
      type: String,
    },
    phone: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiration: {
      type: Date,
      default: Date.now,
      get: (otpExpiration) => otpExpiration.getTime(),
      set: (otpExpiration) => new Date(otpExpiration),
    },
    DOB: {
      type: String,
    },
    gender: {
      type: String,
    },
    language: {
      type: Array,
    },
    qualification: {
      type: String,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    about: {
      type: String,
    },
    psychologistCategory: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Therapist = mongoose.model("Therapist", therapistSchema);

module.exports = {
  Therapist,
};
