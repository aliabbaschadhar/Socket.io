import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData
} from './types/index.ts';
import { DataManager } from './services/dataManager';
import { SocketHandlers } from './handlers/SocketHandlers.ts';

const PORT = process.env.PORT || 8000;

class ChatServer {
  private app: express.Application;
  private server: any;
  private io: Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;
  private dataManager: DataManager;
  private socketHandlers: SocketHandlers;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.dataManager = new DataManager();

    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    this.socketHandlers = new SocketHandlers(this.dataManager, this.io);

    this.setupMiddleware();
    this.setupRoutes();
    this.setupSocketHandlers();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({
        message: "Socket.IO Group Chat Server is running!",
        version: "2.0.0",
        timestamp: new Date().toISOString()
      });
    });

    this.app.get("/health", (req, res) => {
      res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    });
  }

  private setupSocketHandlers(): void {
    this.io.on("connection", (socket) => {
      this.socketHandlers.handleConnection(socket);
    });
  }

  public start(): void {
    this.server.listen(PORT, () => {
      console.log(`🚀 Chat server is running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    });
  }

  public stop(): void {
    this.server.close();
  }
}

// Create and start the server
const chatServer = new ChatServer();
chatServer.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Received SIGTERM, shutting down gracefully');
  chatServer.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 Received SIGINT, shutting down gracefully');
  chatServer.stop();
  process.exit(0);
});
