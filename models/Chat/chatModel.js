const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "senderRole",
      },
      role: {
        type: String,
        required: true,
        enum: ["User", "Therapist"],
      },
    },
    receiver: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "receiverRole",
      },
      role: {
        type: String,
        required: true,
        enum: ["User", "Therapist"],
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
