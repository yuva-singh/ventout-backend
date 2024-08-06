const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../../controllers/Chat/chatController");

const router = express.Router();

router.post("/send", sendMessage);  
router.get("/messages", getMessages);

module.exports = router;
