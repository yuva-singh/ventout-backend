const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { Message } = require("./models/Chat/chatModel");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to your frontend URL
  },
});

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use("/api", require("./routes/routes"));
app.use("/images", express.static("upload/images"));
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("sendMessage", async (data) => {
    const { sender, receiver, message } = data;

    const newMessage = new Message({
      sender,
      receiver,
      message,
    });

    await newMessage.save();

    io.to(receiver).emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
