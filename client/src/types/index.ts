export interface Message {
  id: string
  message: string
  senderId: string
  senderName: string
  roomId: string
  timestamp: string
}

export interface Room {
  id: string
  name: string
  participantCount: number
}

export interface Participant {
  id: string
  username: string
}

export interface CurrentRoom {
  id: string
  name: string
  participants: Participant[]
}

export interface RoomData {
  id: string
  name: string
  createdBy: string
  createdAt: string
  participants: string[]
}

export interface SocketEvents {
  userJoined: (data: { userId: string; username: string; rooms: Room[] }) => void
  roomCreated: (data: { room: RoomData }) => void
  joinedRoom: (data: { room: RoomData; messages: Message[]; participants: Participant[] }) => void
  leftRoom: () => void
  receiveMessage: (message: Message) => void
  userJoinedRoom: (data: { userId: string; username: string; participantCount: number }) => void
  userLeftRoom: (data: { userId: string; username: string; participantCount: number }) => void
  roomListUpdated: (data: { rooms: Room[] }) => void
  error: (data: { message: string }) => void
}
