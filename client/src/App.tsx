import { useState, useRef, useEffect, useCallback } from "react"
import type { Message, Room, CurrentRoom, RoomData, Participant } from "./types"
import { useSocket } from "./hooks/useSocket"
import { LoginForm } from "./components/LoginForm"
import { Sidebar } from "./components/Sidebar"
import { ChatArea } from "./components/ChatArea"

function App() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentRoom, setCurrentRoom] = useState<CurrentRoom | null>(null)
  const [availableRooms, setAvailableRooms] = useState<Room[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [newRoomName, setNewRoomName] = useState("")
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Socket event handlers
  const handleUserJoined = useCallback((data: { userId: string; username: string; rooms: Room[] }) => {
    setIsLoggedIn(true)
    setAvailableRooms(data.rooms)
  }, [])

  const handleRoomCreated = useCallback((data: { room: RoomData }) => {
    setCurrentRoom({
      id: data.room.id,
      name: data.room.name,
      participants: [{ id: data.room.createdBy, username }]
    })
    setMessages([])
    setShowCreateRoom(false)
    setNewRoomName("")
  }, [username])

  const handleJoinedRoom = useCallback((data: { room: RoomData; messages: Message[]; participants: Participant[] }) => {
    setCurrentRoom({
      id: data.room.id,
      name: data.room.name,
      participants: data.participants
    })
    setMessages(data.messages)
  }, [])

  const handleLeftRoom = useCallback(() => {
    setCurrentRoom(null)
    setMessages([])
  }, [])

  const handleReceiveMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const handleUserJoinedRoom = useCallback((data: { userId: string; username: string; participantCount: number }) => {
    setCurrentRoom(prev => prev ? {
      ...prev,
      participants: [...prev.participants, { id: data.userId, username: data.username }]
    } : null)
  }, [])

  const handleUserLeftRoom = useCallback((data: { userId: string; username: string; participantCount: number }) => {
    setCurrentRoom(prev => prev ? {
      ...prev,
      participants: prev.participants.filter(p => p.id !== data.userId)
    } : null)
  }, [])

  const handleRoomListUpdated = useCallback((data: { rooms: Room[] }) => {
    setAvailableRooms(data.rooms)
  }, [])

  const handleError = useCallback((data: { message: string }) => {
    alert(data.message)
  }, [])

  const socket = useSocket(
    handleUserJoined,
    handleRoomCreated,
    handleJoinedRoom,
    handleLeftRoom,
    handleReceiveMessage,
    handleUserJoinedRoom,
    handleUserLeftRoom,
    handleRoomListUpdated,
    handleError
  )

  // UI event handlers
  const handleLogin = useCallback(() => {
    if (username.trim()) {
      socket.joinWithUsername(username.trim())
    }
  }, [username, socket])

  const handleCreateRoom = useCallback(() => {
    if (newRoomName.trim()) {
      socket.createRoom(newRoomName.trim())
    }
  }, [newRoomName, socket])

  const handleJoinRoom = useCallback((roomId: string) => {
    socket.joinRoom(roomId)
  }, [socket])

  const handleLeaveRoom = useCallback(() => {
    socket.leaveRoom()
  }, [socket])

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() && currentRoom) {
      socket.sendMessage(newMessage.trim())
      setNewMessage("")
    }
  }, [newMessage, currentRoom, socket])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!isLoggedIn) {
        handleLogin()
      } else if (showCreateRoom) {
        handleCreateRoom()
      } else {
        handleSendMessage()
      }
    }
  }, [isLoggedIn, showCreateRoom, handleLogin, handleCreateRoom, handleSendMessage])

  const handleToggleCreateRoom = useCallback(() => {
    setShowCreateRoom(!showCreateRoom)
  }, [showCreateRoom])

  const handleCancelCreateRoom = useCallback(() => {
    setShowCreateRoom(false)
    setNewRoomName("")
  }, [])

  // Login screen
  if (!isLoggedIn) {
    return (
      <LoginForm
        username={username}
        onUsernameChange={setUsername}
        onLogin={handleLogin}
        onKeyPress={handleKeyPress}
      />
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex">
      <Sidebar
        username={username}
        currentRoom={currentRoom}
        availableRooms={availableRooms}
        showCreateRoom={showCreateRoom}
        newRoomName={newRoomName}
        onToggleCreateRoom={handleToggleCreateRoom}
        onRoomNameChange={setNewRoomName}
        onCreateRoom={handleCreateRoom}
        onCancelCreateRoom={handleCancelCreateRoom}
        onJoinRoom={handleJoinRoom}
        onLeaveRoom={handleLeaveRoom}
        onKeyPress={handleKeyPress}
      />

      <ChatArea
        currentRoom={currentRoom}
        messages={messages}
        newMessage={newMessage}
        currentUserId={socket.socket?.id}
        messagesEndRef={messagesEndRef}
        onMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default App