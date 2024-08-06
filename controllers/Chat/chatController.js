const asyncHandler = require("express-async-handler");
const { Message } = require("../../models/Chat/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { senderId, senderRole, receiverId, receiverRole, message } = req.body;

  if (!senderId || !senderRole || !receiverId || !receiverRole || !message) {
    res.status(400);
    throw new Error(
      "Sender ID, sender role, receiver ID, receiver role, and message are required"
    );
  }

  const newMessage = new Message({
    sender: { id: senderId, role: senderRole },
    receiver: { id: receiverId, role: receiverRole },
    message,
  });

  await newMessage.save();

  res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  const { user1Id, user1Role, user2Id, user2Role } = req.query;

  if (!user1Id || !user1Role || !user2Id || !user2Role) {
    res.status(400);
    throw new Error("Both user IDs and roles are required");
  }

  const messages = await Message.find({
    $or: [
      {
        "sender.id": user1Id,
        "sender.role": user1Role,
        "receiver.id": user2Id,
        "receiver.role": user2Role,
      },
      {
        "sender.id": user2Id,
        "sender.role": user2Role,
        "receiver.id": user1Id,
        "receiver.role": user1Role,
      },
    ],
  }).sort("createdAt");

  res.status(200).json(messages);
});

module.exports = {
  sendMessage,
  getMessages,
};
