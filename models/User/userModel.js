const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    age: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiration: {
      type: Date,
      default: Date.now,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timmestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
