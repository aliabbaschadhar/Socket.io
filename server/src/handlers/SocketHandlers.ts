import type { Socket } from 'socket.io';
import type {
  User,
  Room,
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData
} from '../types/index.ts';
import { DataManager } from '../services/dataManager.ts';

export class SocketHandlers {
  constructor(
    private dataManager: DataManager,
    private io: any // Socket.IO server instance
  ) { }

  handleConnection(socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>) {
    console.log("User connected with:", socket.id);

    socket.on("joinWithUsername", (data) => this.handleJoinWithUsername(socket, data));
    socket.on("createRoom", (data) => this.handleCreateRoom(socket, data));
    socket.on("joinRoom", (data) => this.handleJoinRoom(socket, data));
    socket.on("leaveRoom", () => this.handleLeaveRoom(socket));
    socket.on("sendMessage", (data) => this.handleSendMessage(socket, data));
    socket.on("disconnect", () => this.handleDisconnect(socket));
  }

  private handleJoinWithUsername(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
    data: { username: string }
  ) {
    const user: User = {
      id: socket.id,
      username: data.username
    };

    this.dataManager.addUser(user);

    socket.emit("userJoined", {
      userId: socket.id,
      username: data.username,
      rooms: this.dataManager.getRoomSummaries()
    });

    console.log(`User ${data.username} (${socket.id}) joined`);
  }

  private handleCreateRoom(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
    data: { roomName: string }
  ) {
    const user = this.dataManager.getUser(socket.id);
    if (!user) {
      socket.emit("error", { message: "User not found. Please refresh and try again." });
      return;
    }

    const roomId = this.dataManager.generateRoomId();
    const room: Room = {
      id: roomId,
      name: data.roomName,
      createdBy: socket.id,
      createdAt: new Date(),
      participants: [socket.id]
    };

    this.dataManager.createRoom(room);
    socket.join(roomId);
    user.currentRoom = roomId;

    socket.emit("roomCreated", { room });
    socket.broadcast.emit("roomListUpdated", {
      rooms: this.dataManager.getRoomSummaries()
    });

    console.log(`Room "${data.roomName}" created by ${user.username}`);
  }

  private handleJoinRoom(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
    data: { roomId: string }
  ) {
    const user = this.dataManager.getUser(socket.id);
    const room = this.dataManager.getRoom(data.roomId);

    if (!user) {
      socket.emit("error", { message: "User not found. Please refresh and try again." });
      return;
    }

    if (!room) {
      socket.emit("error", { message: "Room not found." });
      return;
    }

    // Leave current room if any
    if (user.currentRoom) {
      this.leaveCurrentRoom(socket, user);
    }

    // Join new room
    socket.join(data.roomId);
    this.dataManager.addParticipantToRoom(data.roomId, socket.id);
    user.currentRoom = data.roomId;

    const roomMessages = this.dataManager.getRoomMessages(data.roomId);
    const participants = this.dataManager.getRoomParticipants(data.roomId);

    socket.emit("joinedRoom", {
      room,
      messages: roomMessages,
      participants
    });

    socket.to(data.roomId).emit("userJoinedRoom", {
      userId: socket.id,
      username: user.username,
      participantCount: room.participants.length
    });

    this.io.emit("roomListUpdated", {
      rooms: this.dataManager.getRoomSummaries()
    });

    console.log(`User ${user.username} joined room "${room.name}"`);
  }

  private handleLeaveRoom(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
  ) {
    const user = this.dataManager.getUser(socket.id);
    if (!user || !user.currentRoom) {
      return;
    }

    this.leaveCurrentRoom(socket, user);
    user.currentRoom = undefined;
    socket.emit("leftRoom");
    console.log(`User ${user.username} left room`);
  }

  private handleSendMessage(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
    data: { message: string }
  ) {
    const user = this.dataManager.getUser(socket.id);
    if (!user || !user.currentRoom) {
      socket.emit("error", { message: "You must be in a room to send messages." });
      return;
    }

    const message: Message = {
      id: this.dataManager.generateMessageId(),
      message: data.message,
      senderId: socket.id,
      senderName: user.username,
      roomId: user.currentRoom,
      timestamp: new Date().toISOString()
    };

    this.dataManager.addMessage(message);
    this.io.to(user.currentRoom).emit("receiveMessage", message);

    console.log(`Message from ${user.username} in room ${user.currentRoom}: ${data.message}`);
  }

  private handleDisconnect(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
  ) {
    const user = this.dataManager.getUser(socket.id);
    if (user) {
      console.log(`User ${user.username} (${socket.id}) disconnected`);

      if (user.currentRoom) {
        this.leaveCurrentRoom(socket, user);
      }

      this.dataManager.removeUser(socket.id);
    }
  }

  private leaveCurrentRoom(
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
    user: User
  ) {
    if (!user.currentRoom) return;

    const room = this.dataManager.getRoom(user.currentRoom);
    if (room) {
      socket.leave(user.currentRoom);
      this.dataManager.removeParticipantFromRoom(user.currentRoom, socket.id);

      socket.to(user.currentRoom).emit("userLeftRoom", {
        userId: socket.id,
        username: user.username,
        participantCount: room.participants.length
      });

      // If room is empty, delete it
      if (room.participants.length === 0) {
        this.dataManager.deleteRoom(user.currentRoom);
        console.log(`Room "${room.name}" deleted (empty)`);
      }

      // Broadcast updated room list
      this.io.emit("roomListUpdated", {
        rooms: this.dataManager.getRoomSummaries()
      });
    }
  }
}
