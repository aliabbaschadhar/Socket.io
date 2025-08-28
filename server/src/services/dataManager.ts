import type { User, Room, Message, RoomSummary, ParticipantInfo } from '../types/index';

export class DataManager {
  private users = new Map<string, User>();
  private rooms = new Map<string, Room>();
  private messages = new Map<string, Message[]>();

  // User management
  addUser(user: User): void {
    this.users.set(user.id, user);
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  removeUser(userId: string): void {
    this.users.delete(userId);
  }

  // Room management
  createRoom(room: Room): void {
    this.rooms.set(room.id, room);
    this.messages.set(room.id, []);
  }

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId: string): void {
    this.rooms.delete(roomId);
    this.messages.delete(roomId);
  }

  getRoomSummaries(): RoomSummary[] {
    return Array.from(this.rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      participantCount: room.participants.length
    }));
  }

  addParticipantToRoom(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
    }
    return true;
  }

  removeParticipantFromRoom(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    room.participants = room.participants.filter(id => id !== userId);
    return true;
  }

  getRoomParticipants(roomId: string): ParticipantInfo[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    return room.participants.map(id => {
      const user = this.users.get(id);
      return { id, username: user?.username || "Unknown" };
    });
  }

  // Message management
  addMessage(message: Message): void {
    const roomMessages = this.messages.get(message.roomId) || [];
    roomMessages.push(message);
    this.messages.set(message.roomId, roomMessages);
  }

  getRoomMessages(roomId: string): Message[] {
    return this.messages.get(roomId) || [];
  }

  // Utility methods
  generateRoomId(): string {
    return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
