const express = require("express");
const validateToken = require("../../middleware/validateToken");
const {
  addBalance,
  getWallet,
  getWalletHistory,
} = require("../../controllers/User/walletController");

const router = express.Router();

router.get("/getBalance", validateToken, getWallet);
router.patch("/add", validateToken, addBalance);

////////// Wallet History Routes //////////
router.get("/walletHistory", validateToken, getWalletHistory);

module.exports = router;
