import type { CurrentRoom } from "../types"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"
import type { Message } from "../types"

interface ChatAreaProps {
  currentRoom: CurrentRoom | null
  messages: Message[]
  newMessage: string
  currentUserId: string | undefined
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  onMessageChange: (message: string) => void
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export const ChatArea = ({
  currentRoom,
  messages,
  newMessage,
  currentUserId,
  messagesEndRef,
  onMessageChange,
  onSendMessage,
  onKeyPress
}: ChatAreaProps) => {
  if (!currentRoom) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <div className="text-xl font-medium mb-2">Welcome to Group Chat!</div>
          <div className="text-sm">Create a new room or join an existing one to start chatting</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-600 text-white p-4 flex items-center justify-between">
        <div>
          <div className="text-lg font-bold">💬 {currentRoom.name}</div>
          <div className="text-sm opacity-90">{currentRoom.participants.length} participant(s) online</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 p-4">
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Message Input */}
      <MessageInput
        message={newMessage}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
