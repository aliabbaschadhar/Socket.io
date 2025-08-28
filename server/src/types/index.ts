export interface User {
  id: string;
  username: string;
  currentRoom?: string;
}

export interface Room {
  id: string;
  name: string;
  createdBy: string;
  createdAt: Date;
  participants: string[];
}

export interface Message {
  id: string;
  message: string;
  senderId: string;
  senderName: string;
  roomId: string;
  timestamp: string;
}

export interface SocketData {
  username?: string;
  userId?: string;
}

export interface ServerToClientEvents {
  userJoined: (data: { userId: string; username: string; rooms: RoomSummary[] }) => void;
  roomCreated: (data: { room: Room }) => void;
  joinedRoom: (data: { room: Room; messages: Message[]; participants: ParticipantInfo[] }) => void;
  leftRoom: () => void;
  receiveMessage: (message: Message) => void;
  userJoinedRoom: (data: { userId: string; username: string; participantCount: number }) => void;
  userLeftRoom: (data: { userId: string; username: string; participantCount: number }) => void;
  roomListUpdated: (data: { rooms: RoomSummary[] }) => void;
  error: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  joinWithUsername: (data: { username: string }) => void;
  createRoom: (data: { roomName: string }) => void;
  joinRoom: (data: { roomId: string }) => void;
  leaveRoom: () => void;
  sendMessage: (data: { message: string }) => void;
}

export interface RoomSummary {
  id: string;
  name: string;
  participantCount: number;
}

export interface ParticipantInfo {
  id: string;
  username: string;
}
