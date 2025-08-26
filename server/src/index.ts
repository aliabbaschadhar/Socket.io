import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors"


const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


app.use(cors())
app.use(express.json())

io.on("connection", (socket) => {
  console.log("User connected")
  console.log(socket.id)
})

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
