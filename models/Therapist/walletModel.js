const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
      min: 0
    },
    therapistData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
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
    therapistData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
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

const Wallet = mongoose.model("TherapistWallet", walletSchema);
const WalletHistory = mongoose.model("TherapistWalletHistory", walletHistorySchema);

module.exports = {
  Wallet,
  WalletHistory,
};
