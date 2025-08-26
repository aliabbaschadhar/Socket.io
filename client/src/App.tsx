import { io, Socket } from "socket.io-client"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  message: string
  senderId: string
  timestamp: string
}

// Generate consistent colors for users based on their ID
const getUserColor = (userId: string) => {
  const colors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-orange-400 to-orange-600',
    'from-teal-400 to-teal-600',
    'from-cyan-400 to-cyan-600',
    'from-rose-400 to-rose-600',
    'from-emerald-400 to-emerald-600',
    'from-violet-400 to-violet-600',
    'from-amber-400 to-amber-600',
    'from-lime-400 to-lime-600'
  ]

  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Get avatar background for solid colors
const getAvatarBg = (userId: string) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-lime-500'
  ]

  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Get user initials from user ID
const getUserInitials = (userId: string) => {
  return userId.slice(0, 2).toUpperCase()
}

// Get readable user name
const getUserName = (userId: string, isCurrentUser: boolean) => {
  if (isCurrentUser) return 'You'
  return `User ${userId.slice(-4)}`
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

    const socketInstance = io(backendUrl)
    setSocket(socketInstance)

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id)
    })

    socketInstance.on("welcome", (data) => {
      console.log(data)
    })

    socketInstance.on("newUser", (data) => {
      console.log(data)
    })

    // Listen for incoming messages
    socketInstance.on("receiveMessage", (data: Message) => {
      setMessages(prev => [...prev, data])
    })

    // cleanup on unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.emit("sendMessage", { message: newMessage })
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <div className="h-full w-full">
        <Card className="h-full w-full rounded-none border-0 overflow-hidden backdrop-blur-sm bg-white/90 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-600 text-white relative flex-shrink-0 p-3 sm:p-4 lg:p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-cyan-600/20"></div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-center relative z-10 flex items-center justify-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl lg:text-3xl animate-pulse">💬</span>
              <span className="hidden xs:inline">Socket.IO Chat</span>
              <span className="xs:hidden">Chat</span>
              <span className="text-xl sm:text-2xl lg:text-3xl animate-pulse">💬</span>
            </CardTitle>
            {socket?.id && (
              <div className="text-center text-white/90 text-xs sm:text-sm relative z-10 font-medium mt-1">
                Connected as: {getUserName(socket.id, true)}
              </div>
            )}
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col min-h-0">
            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 p-2 sm:p-3 lg:p-4 min-h-0">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  <div className="text-center px-4">
                    <div className="text-3xl sm:text-4xl lg:text-6xl mb-2 sm:mb-4 animate-bounce">💬</div>
                    <div className="text-sm sm:text-base lg:text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      No messages yet. Start a conversation!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {messages.map((msg, index) => {
                    const isCurrentUser = msg.senderId === socket?.id
                    const userGradient = getUserColor(msg.senderId)
                    const avatarBg = getAvatarBg(msg.senderId)
                    const userInitials = getUserInitials(msg.senderId)
                    const userName = getUserName(msg.senderId, isCurrentUser)

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-2 sm:gap-3 ${isCurrentUser ? 'flex-row-reverse justify-start' : 'justify-start'}`}
                      >
                        {/* User Avatar */}
                        <div
                          className={`
                            flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center
                            text-white text-xs sm:text-sm font-bold shadow-lg ring-2 ring-white/50
                            ${isCurrentUser ? 'bg-gradient-to-br from-blue-500 to-purple-600' : avatarBg}
                          `}
                        >
                          {isCurrentUser ? '👤' : userInitials}
                        </div>

                        {/* Message Bubble */}
                        <div className={`flex flex-col max-w-[75%] sm:max-w-xs lg:max-w-sm xl:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                          {/* User Name */}
                          <div className={`text-xs font-bold mb-1 sm:mb-2 px-1 sm:px-2 ${isCurrentUser
                            ? 'text-blue-600'
                            : 'text-gray-700'
                            }`}>
                            {userName}
                          </div>

                          {/* Message Content */}
                          <div
                            className={`
                              rounded-2xl px-3 sm:px-4 lg:px-5 py-2 sm:py-3 shadow-lg max-w-full transform transition-all duration-200 hover:scale-105
                              ${isCurrentUser
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md shadow-blue-200'
                                : `bg-gradient-to-br ${userGradient} text-white rounded-bl-md shadow-gray-200`
                              }
                            `}
                          >
                            <div className="break-words font-medium text-sm sm:text-base">{msg.message}</div>
                          </div>

                          {/* Timestamp */}
                          <div className={`text-xs mt-1 sm:mt-2 px-1 sm:px-2 font-medium ${isCurrentUser
                            ? 'text-blue-500'
                            : 'text-gray-500'
                            }`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {/* Auto-scroll target */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex-shrink-0 p-2 sm:p-3 lg:p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
              <div className="flex gap-2 sm:gap-3 items-end">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-sm bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-200"
                  />
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 font-bold text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Send</span>
                  <span className="sm:hidden text-lg">📤</span>
                </Button>
              </div>
              {socket?.id && (
                <div className="text-xs text-gray-500 mt-2 sm:mt-3 text-center font-medium">
                  <span className="hidden sm:inline">{messages.length} messages • </span>
                  Connected as <span className="font-bold text-purple-600">{getUserName(socket.id, true)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App