const asyncHandler = require("express-async-handler");
const { Wallet, WalletHistory } = require("../../models/Therapist/walletModel");

const getWallet = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const walletBalance = await Wallet.findOne({ therapistData: therapistId });

  if (!walletBalance) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  res.status(200).json(walletBalance);
});

const withdrawBalance = asyncHandler(async (req, res) => {
  const therapistId = req.user;
  const { withdrawMoney } = req.body;

  const wallet = await Wallet.findOne({ therapistData: therapistId });

  if (!wallet) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  if (withdrawMoney === 0) {
    res.status(401);
    throw new Error("Amount should be more than 0!");
  }

  if (wallet.balance < withdrawMoney) {
    res.status(401);
    throw new Error("insufficient Balance!");
  }

  let newBalance = wallet.balance - withdrawMoney;

  wallet.balance = newBalance;

  wallet.save();

  await WalletHistory.create({
    transactionAmount: withdrawMoney,
    isDeducted: true,
    therapistData: therapistId,
    transactionWith: therapistId,
    transactionToModel: "Therapist",
  });

  res
    .status(200)
    .json({ message: `${withdrawMoney} rupees withdrawl successfully!` });
});

////////// Wallet History //////////
const getWalletHistory = asyncHandler(async (req, res) => {
  const therapistId = req.user;

  const walletHistory = await WalletHistory.find({
    therapistData: therapistId,
  }).populate("transactionWith", "name profileImg");

  if (!walletHistory) {
    res.status(404);
    throw new Error("Wallet not found");
  }

  res.status(200).json(walletHistory);
});

module.exports = {
  getWallet,
  withdrawBalance,
  getWalletHistory,
};
