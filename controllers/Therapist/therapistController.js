const asyncHandler = require("express-async-handler");
const { Therapist } = require("../../models/Therapist/therapistModel");
const { Wallet } = require("../../models/Therapist/walletModel");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const validateOTP = require("../../helper/validateOTP");

const registerTherapist = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const {
    name,
    DOB,
    gender,
    language,
    qualification,
    category,
    about,
    experience,
    psychologistCategory,
  } = req.body;

  if (
    (!name,
    !DOB,
    !gender,
    !language,
    !qualification,
    !category,
    !about,
    !experience,
    !psychologistCategory)
  ) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const profileImg = req.files["profileImg"]
    ? req.files["profileImg"][0].path
    : null;

  const registerTherapist = await Therapist.findByIdAndUpdate(
    therapistId,
    {
      name,
      profileImg,
      DOB,
      gender,
      language,
      qualification,
      category,
      about,
      experience,
      psychologistCategory,
      registered: true,
    },
    { new: true }
  );

  if (!registerTherapist) {
    res.status(500);
    throw new Error("Server Error");
  }

  await Wallet.create({
    balance: 0,
    therapistData: therapistId,
  });

  res
    .status(200)
    .json({ message: "Therapist Registerd successfully!", registerTherapist });
});

const loginTherapist = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone.match(/^[6789]\d{9}$/)) {
    res.status(400);
    throw new Error("Invalid mobile number");
  }

  if (!phone) {
    res.status(400);
    throw new Error("Phone number is required!");
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const currentDate = new Date();

  const loginTherapist = await Therapist.findOneAndUpdate(
    { phone },
    { otp, otpExpiration: new Date(currentDate.getTime()) },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  if (!loginTherapist) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(200).json({ message: "OTP sent successfully", otp });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone.match(/^[6789]\d{9}$/)) {
    res.status(400);
    throw new Error("Invalid mobile number");
  }

  if ((!phone, !otp)) {
    res.status(404);
    throw new Error("Phone number and OTP required!");
  }

  const therapistAvailable = await Therapist.findOne({ phone, otp });

  if (!therapistAvailable) {
    res.status(403);
    throw new Error("Incorrect OTP!");
  }

  const isOtpExpired = await validateOTP(therapistAvailable.otpExpiration);

  if (isOtpExpired) {
    res.status(400);
    throw new Error("OTP has been Expired!");
  }

  const accessToken = await jwt.sign(
    {
      user: {
        _id: therapistAvailable._id,
      },
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "90d" }
  );

  res.status(200).json({
    message: "Therapist Verified successfully!",
    phone: phone,
    userId: therapistAvailable._id,
    token: accessToken,
    registrationStatus: therapistAvailable.registered,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const {
    name,
    DOB,
    gender,
    language,
    qualification,
    category,
    about,
    experience,
    psychologistCategory,
  } = req.body;

  if (
    (!name,
    !DOB,
    !gender,
    !language,
    !qualification,
    !category,
    !about,
    !experience,
    !psychologistCategory)
  ) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const profileImg = req.files["profileImg"]
    ? req.files["profileImg"][0].path
    : null;

  const updateTherapist = await Therapist.findByIdAndUpdate(
    therapistId,
    {
      name,
      profileImg,
      DOB,
      gender,
      language,
      qualification,
      category,
      about,
      experience,
      psychologistCategory,
    },
    { new: true }
  );

  if (!updateTherapist) {
    res.status(500);
    throw new Error("Server Error");
  }

  res
    .status(200)
    .json({ message: "Therapist updated successfully!", updateTherapist });
});

const updateKYC = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const aadharCard = req.files["aadharCard"]
    ? req.files["aadharCard"][0].path
    : null;

  const degree = req.files["degree"] ? req.files["degree"][0].path : null;

  const updateKYC = await Therapist.findByIdAndUpdate(therapistId, {
    aadharCard,
    degree,
  });

  if (!updateKYC) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(201).json({ message: "KYC updated successfully!" });
});

const updateAvailability = asyncHandler(async (req, res) => {
  const therapistId = req.user;
  const { isAvailable } = req.body;

  const updateAvailable = await Therapist.findByIdAndUpdate(therapistId, {
    isAvailable,
  });

  if (!updateAvailable) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(201).json({ message: "Availability updated successfully!" });
});

const suspendTherapist = asyncHandler(async (req, res) => {
  const therapistId = req.params.id;
  const { isSuspended } = req.body;

  const suspend = await Therapist.findByIdAndUpdate(therapistId, {
    isSuspended,
  });

  if (!suspend) {
    res.status(500);
    throw new Error("Server Error");
  }

  res.status(201).json({ message: "success!" });
});

const updateTherapistFees = asyncHandler(async (req, res) => {
  const therapistId = req.params.id;
  const { fees } = req.body;

  if (!fees) {
    res.status(400);
    throw new Error("Fees fiels is required!");
  }

  const updateFees = await Therapist.findByIdAndUpdate(therapistId, {
    fees,
  });

  if (!updateFees) {
    res.status(500);
    throw new Error("Server Error!");
  }

  res.status(200).json({ message: "Fees updated successfully" });
});

const getAllTherapist = asyncHandler(async (req, res) => {
  const therapist = await Therapist.find({
    isSuspended: false,
  })
    .populate("category", "categoryName")
    .sort({ isAvailable: -1 });

  if (!therapist) {
    res.status(404);
    throw new Error("Therapist not found!");
  }

  res.status(200).json(therapist);
});

const getAllTherapistForAdmin = asyncHandler(async (req, res) => {
  const therapist = await Therapist.find({ registered: true }).populate(
    "category",
    "categoryName"
  );

  if (!therapist) {
    res.status(404);
    throw new Error("Therapist not found!");
  }

  res.status(200).json(therapist);
});

const getAllTherapistByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const therapist = await Therapist.find({
    category: categoryId,
    isAvailable: true,
    registered: true,
  }).populate("category", "categoryName");

  if (!therapist) {
    res.status(404);
    throw new Error("Therapist not found!");
  }

  res.status(200).json(therapist);
});

const getTherapistProfile = asyncHandler(async (req, res) => {
  const therapistId = req.params.id;

  const therapist = await Therapist.findById(therapistId).populate(
    "category",
    "categoryName"
  );

  if (!therapist) {
    res.status(404);
    throw new Error("Therapist not found!");
  }

  res.status(200).json(therapist);
});

const deleteTherapistProfile = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const therapist = await Therapist.findByIdAndDelete(therapistId);

  if (!therapist) {
    res.status(404);
    throw new Error("Therapist not found!");
  }

  res.status(200).json({ message: "Therapist deleted successfully" });
});

module.exports = {
  registerTherapist,
  loginTherapist,
  verifyOTP,
  updateProfile,
  updateKYC,
  getAllTherapist,
  getAllTherapistByCategory,
  getTherapistProfile,
  updateAvailability,
  deleteTherapistProfile,
  suspendTherapist,
  getAllTherapistForAdmin,
  updateTherapistFees,
};
