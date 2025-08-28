import { useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import type { Message, Room, RoomData, Participant } from '../types'

interface UseSocketReturn {
  socket: Socket | null
  isConnected: boolean
  joinWithUsername: (username: string) => void
  createRoom: (roomName: string) => void
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  sendMessage: (message: string) => void
}

export const useSocket = (
  onUserJoined: (data: { userId: string; username: string; rooms: Room[] }) => void,
  onRoomCreated: (data: { room: RoomData }) => void,
  onJoinedRoom: (data: { room: RoomData; messages: Message[]; participants: Participant[] }) => void,
  onLeftRoom: () => void,
  onReceiveMessage: (message: Message) => void,
  onUserJoinedRoom: (data: { userId: string; username: string; participantCount: number }) => void,
  onUserLeftRoom: (data: { userId: string; username: string; participantCount: number }) => void,
  onRoomListUpdated: (data: { rooms: Room[] }) => void,
  onError: (data: { message: string }) => void
): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
    const socketInstance = io(backendUrl)

    setSocket(socketInstance)

    socketInstance.on("connect", () => {
      setIsConnected(true)
      console.log("Socket connected:", socketInstance.id)
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
      console.log("Socket disconnected")
    })

    // Set up event listeners
    socketInstance.on("userJoined", onUserJoined)
    socketInstance.on("roomCreated", onRoomCreated)
    socketInstance.on("joinedRoom", onJoinedRoom)
    socketInstance.on("leftRoom", onLeftRoom)
    socketInstance.on("receiveMessage", onReceiveMessage)
    socketInstance.on("userJoinedRoom", onUserJoinedRoom)
    socketInstance.on("userLeftRoom", onUserLeftRoom)
    socketInstance.on("roomListUpdated", onRoomListUpdated)
    socketInstance.on("error", onError)

    return () => {
      socketInstance.disconnect()
    }
  }, [
    onUserJoined,
    onRoomCreated,
    onJoinedRoom,
    onLeftRoom,
    onReceiveMessage,
    onUserJoinedRoom,
    onUserLeftRoom,
    onRoomListUpdated,
    onError
  ])

  const joinWithUsername = useCallback((username: string) => {
    socket?.emit("joinWithUsername", { username })
  }, [socket])

  const createRoom = useCallback((roomName: string) => {
    socket?.emit("createRoom", { roomName })
  }, [socket])

  const joinRoom = useCallback((roomId: string) => {
    socket?.emit("joinRoom", { roomId })
  }, [socket])

  const leaveRoom = useCallback(() => {
    socket?.emit("leaveRoom")
  }, [socket])

  const sendMessage = useCallback((message: string) => {
    socket?.emit("sendMessage", { message })
  }, [socket])

  return {
    socket,
    isConnected,
    joinWithUsername,
    createRoom,
    joinRoom,
    leaveRoom,
    sendMessage
  }
}
