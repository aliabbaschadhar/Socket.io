import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"


const PORT = process.env.PORT || 8000;
const app = express();
const wsServer = createServer(app);
const io = new Server(wsServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true // allows cookies/auth headers from frontend
  }
});


app.use(cors())
app.use(express.json())


io.on("connection", (socket) => {
  console.log("User connected with:" + socket.id)

  socket.emit("welcome", { message: `Welcome to the server!:${socket.id}` })

  socket.broadcast.emit("newUser", { message: `A new user has joined: ${socket.id}` })

  // Handle incoming messages from clients
  socket.on("sendMessage", (data) => {
    console.log(`Message from ${socket.id}:`, data.message)

    // Send the message to all connected clients (including sender)
    io.emit("receiveMessage", {
      message: data.message,
      senderId: socket.id,
      timestamp: new Date().toISOString()
    })
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:" + socket.id)
    socket.broadcast.emit("userLeft", { message: `A user has left: ${socket.id}` })
  })
})

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});


// We will use here wsServer bcz we need to attach the socket.io server to the HTTP server
// If we use the app here then we will create an Express server instead of a Socket.io server
wsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
