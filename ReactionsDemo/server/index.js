const cookieSession = require("cookie-session");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Channel = require("./models/channel");
const Message = require("./models/message");
const User = require("./models/user");
const constants = require("./constants");

const app = express();
const httpServer = http.createServer(app);
const socketServer = socketIo(httpServer);
let onlineUserIds = [];

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secret: "chat-app-secret",
    signed: false,
    httpOnly: false
  })
);

const fetchAndEmitChannels = async socket => {
  const channels = await Channel.getAll();
  socket.emit(constants.serverEvents.UPDATE_ALL_CHANNELS, channels);
};

const fetchAndEmitMessages = async socket => {
  const messages = await Message.getAll();
  socket.emit(constants.serverEvents.UPDATE_ALL_MESSAGES, messages);
};

const fetchAndEmitUsers = async socket => {
  const users = await User.getAll();
  socket.emit(
    constants.serverEvents.UPDATE_ALL_USERS,
    users.map(user => ({
      ...user,
      isOnline: onlineUserIds.includes(user.id)
    }))
  );
};

app.post("/login", (req, res) => {
  const { id } = req.body;
  req.session.userId = id;
  if (!onlineUserIds.includes(id)) {
    onlineUserIds.push(id);
    fetchAndEmitUsers(socketServer);
  }
  res.status(200).send();
});

app.post("/logout", (req, res) => {
  const { userId } = req.session;
  if (onlineUserIds.includes(userId)) {
    onlineUserIds = onlineUserIds.filter(
      onlineUserId => onlineUserId !== userId
    );
    fetchAndEmitUsers(socketServer);
  }
  req.session = null;
  res.status(200).send();
});

app.post("/users", async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  fetchAndEmitUsers(socketServer);
  res.status(200).send();
});

app.post("/channels", async (req, res) => {
  const { channelName } = req.body;
  const channel = new Channel({ name: channelName });
  await channel.save();
  fetchAndEmitChannels(socketServer);
  res.status(200).send();
});

app.post("/channels/:channelId/messages", async (req, res) => {
  const { userId } = req.session;
  const { content } = req.body;
  const { channelId } = req.params;
  const message = new Message({ channelId, userId, content });
  await message.save();
  fetchAndEmitMessages(socketServer);
  res.status(200).send();
});

/**
  Edit logic reused for Reactions.
  Update the message to include/exclude the toggled reaction.
*/
app.patch("/channels/:channelId/messages/:messageId", async (req, res) => {
  const { messageId } = req.params;
  const { content, reactions } = req.body;
  const message = await Message.getById(messageId);
  if (message != null) {
    if (message.userId === req.session.userId) {
      message.content = content;
    }
    message.reactions = reactions;
    try {
      await message.save();
      fetchAndEmitMessages(socketServer);
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }

  res.status(200).send();
});

socketServer.sockets.on("connection", socket => {
  socket.on(constants.clientEvents.FETCH_ALL_CHANNELS, () =>
    fetchAndEmitChannels(socket)
  );
  socket.on(constants.clientEvents.FETCH_ALL_MESSAGES, () =>
    fetchAndEmitMessages(socket)
  );
  socket.on(constants.clientEvents.FETCH_ALL_USERS, () =>
    fetchAndEmitUsers(socket)
  );
});

httpServer.listen(8000, function() {
  console.log("listening on *:8000");
});
