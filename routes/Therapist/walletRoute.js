const express = require("express");
const validateToken = require("../../middleware/validateToken");
const {
  getWallet,
  withdrawBalance,
  getWalletHistory,
} = require("../../controllers/Therapist/walletController");

const router = express.Router();

router.get("/getBalance", validateToken, getWallet);
router.patch("/withdraw", validateToken, withdrawBalance);

////////// Wallet History Routes //////////
router.get("/walletHistory", validateToken, getWalletHistory);

module.exports = router;
