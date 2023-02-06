require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const connectDB = require("./database");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());
const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173/"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

connectDB();
app.use(express.json({ limit: "5mb" }));
app.use(router);

// sockets

const socketUserMapping = {};

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ spaceId, user }) => {
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(spaceId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });

    socket.join(spaceId);
  });

  // handle relay ice
  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  // handle relay session description
  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  const leaveSpace = () => {
    const { rooms } = socket;

    Array.from(rooms).forEach((spaceId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(spaceId) || []);

      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMapping[socket.id]?.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
          userId: socketUserMapping[clientId]?.id,
        });
      });
      socket.leave(spaceId);
    });

    delete socketUserMapping[socket.id];
  };

  // leave space
  socket.on(ACTIONS.LEAVE, leaveSpace);
  socket.on("disconnecting", leaveSpace);
});

server.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
