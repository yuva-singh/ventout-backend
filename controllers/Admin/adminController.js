const asyncHandler = require("express-async-handler");
const Admin = require("../../models/Admin/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const adminEmail = await Admin.findOne({ email });
  const adminCount = await Admin.find();

  if (adminEmail) {
    res.status(403);
    throw new Error("Admin already exist with this email!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (adminCount.length < 1) {
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin Registered!", admin });
  } else {
    res.status(401).json({ message: "Cannot create more than 1 admin!" });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const adminAvailable = await Admin.findOne({ email });

  if (!adminAvailable) {
    res.status(404);
    throw new Error("Admin not found!");
  }

  if (!(await bcrypt.compare(password, adminAvailable.password))) {
    res.status(404);
    throw new Error("email or password is wrong!");
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: adminAvailable._id,
      },
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "90d" }
  );

  res.status(200).json({
    message: "Admin logged In successfully!",
    _id: adminAvailable._id,
    token: accessToken,
  });
});

const forgotPasswordAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const adminAvailable = await Admin.findOne({ email });

  if (!adminAvailable) {
    res.status(404);
    throw new Error("Admin not found!");
  }

  if (await bcrypt.compare(password, adminAvailable.password)) {
    res.status(403);
    throw new Error("Please enter new password!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (email == adminAvailable.email) {
    await Admin.updateOne({
      password: hashedPassword,
    });
  }

  res.status(200).json({
    message: "password changed successfully!",
  });
});

// const getTotalCounts = asyncHandler(async(req, res) => {
//   const users = await User.countDocuments();
//   const therapists = await Therapist.countDocuments();
//   const user = await User.countDocuments();
//   const user = await User.countDocuments();
// })

module.exports = {
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin,
};
