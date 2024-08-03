const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

////////// Wallet History Schema //////////
const walletHistorySchema = mongoose.Schema(
  {
    transactionAmount: {
      type: Number,
      default: 0,
    },
    isDeducted: {
      type: Boolean,
    },
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transactionWith: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "transactionToModel",
    },
    transactionToModel: {
      type: String,
      required: true,
      enum: ["User", "Therapist"],
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("UserWallet", walletSchema);
const WalletHistory = mongoose.model("UserWalletHistory", walletHistorySchema);

module.exports = {
  Wallet,
  WalletHistory,
};
