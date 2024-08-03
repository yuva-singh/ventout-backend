const asyncHandler = require("express-async-handler");
const { Wallet, WalletHistory } = require("../../models/User/walletModel");

const getWallet = asyncHandler(async (req, res) => {
  const userId = req.user;

  const walletBalance = await Wallet.findOne({ userData: userId });

  if (!walletBalance) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  res.status(200).json(walletBalance);
});

const addBalance = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { addMoney } = req.body;

  const wallet = await Wallet.findOne({ userData: userId });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  if (addMoney === 0) {
    res.status(401);
    throw new Error("Amount should be more than 0!");
  }

  let newBalance = wallet.balance + addMoney;

  wallet.balance = newBalance;

  wallet.save();

  await WalletHistory.create({
    transactionAmount: addMoney,
    isDeducted: false,
    userData: userId,
    transactionWith: userId,
    transactionToModel: "User",
  });

  res
    .status(200)
    .json({ message: `${withdrawMoney} rupees added successfully!` });
});

////////// Wallet History //////////
const getWalletHistory = asyncHandler(async (req, res) => {
  const userId = req.user;

  const walletHistory = await WalletHistory.find({
    userData: userId,
  }).populate("transactionWith", "name profileImg");

  if (!walletHistory) {
    res.status(404);
    throw new Error("Wallet History not found");
  }

  res.status(200).json(walletHistory);
});

module.exports = {
  getWallet,
  addBalance,
  getWalletHistory,
};
