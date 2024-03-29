const express = require("express");

const app = express();

const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const {Server} = require("socket.io");

dotenv.config();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN_URL,
  },
});


let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    }
  );

  //send and get message
  socket.on("sendMessage", (message) => {
    const user = getUser(message?.receiver);
    if(user?.socketId){
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  //send and get notificatios
  socket.on("sendNotifications", (notifications) => {
    for(const notification of notifications){
      const user = getUser(notification?.receiver);
      if(user?.socketId){
        io.to(user.socketId).emit("getNotifications", notification);
      }
    }
    
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, ()=>{
  console.log(`Socket Server is running on Port: ${process.env.PORT}`);
});
