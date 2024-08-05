const mongoose = require("mongoose");

const withdrawRequestSchema = mongoose.Schema(
  {
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Threrapist",
    },
    amount: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const WithdrawRequest = mongoose.model(
  "WithdrawRequest",
  withdrawRequestSchema
);

module.exports = {
  WithdrawRequest,
};
