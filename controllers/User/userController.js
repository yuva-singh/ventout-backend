const asyncHandler = require("express-async-handler");
const { User } = require("../../models/User/userModel");
const { Wallet } = require("../../models/User/walletModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const validateOTP = require("../../helper/validateOTP");

const loginUser = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    res.status(400);
    throw new Error("Phone number is required!");
  }

  if (!phone.match(/^[6789]\d{9}$/)) {
    res.status(400);
    throw new Error("Invalid mobile number");
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const currentDate = new Date();

  await User.findOneAndUpdate(
    { phone },
    { otp, otpExpiration: new Date(currentDate.getTime()) },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({ message: "OTP send Successfully!", phone, otp });
});

const verifyUserOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  if ((!phone, !otp)) {
    res.status(400);
    throw new Error("phone number and OTP is required!");
  }

  if (!phone.match(/^[6789]\d{9}$/)) {
    res.status(400);
    throw new Error("Invalid mobile number");
  }

  const user = await User.findOne({ phone, otp });

  if (!user) {
    res.status(400);
    throw new Error("OTP is incorrect!");
  }

  const isOtpExpired = await validateOTP(user.otpExpiration);

  if (isOtpExpired) {
    res.status(400);
    throw new Error("OTP has been Expired!");
  }

  const token = jwt.sign(
    {
      user: {
        _id: user._id,
      },
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );

  res.status(200).json({
    message: "OTP verified successfully",
    phone,
    userId: user._id,
    isRegistered: user.isRegistered,
    token,
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { name, age } = req.body;

  if ((!name, !age)) {
    res.status(400);
    throw new Error("name and age is required!");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name,
      age,
      isRegistered: true,
    },
    { new: true }
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  await Wallet.create({
    balance: 0,
    userData: userId,
  });

  res.status(200).json({ message: "User registered successfully!", user });
});

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find();

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  res.status(200).json(user);
});

const addProfileImg = asyncHandler(async (req, res) => {
  const userId = req.user;

  const profileImg = req.files["profileImg"]
    ? req.files["profileImg"][0].path
    : null;

  const addUserProfileImg = await User.findByIdAndUpdate(
    userId,
    {
      profileImg,
    },
    { new: true }
  );

  if (!addUserProfileImg) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(200).json({
    message: "User Profile Image added successfully!",
    addUserProfileImg,
  });
});

module.exports = {
  loginUser,
  verifyUserOTP,
  registerUser,
  addProfileImg,
  getAllUser,
};
