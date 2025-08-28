import type { Message } from "../types"
import { getUserColor, getAvatarBg, getUserInitials, formatTimestamp } from "../utils/userUtils"

interface MessageListProps {
  messages: Message[]
  currentUserId: string | undefined
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export const MessageList = ({ messages, currentUserId, messagesEndRef }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">💬</div>
          <div className="text-lg font-medium">Room is ready!</div>
          <div className="text-sm">Start the conversation...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => {
        const isCurrentUser = msg.senderId === currentUserId
        const userGradient = getUserColor(msg.senderId)
        const avatarBg = getAvatarBg(msg.senderId)
        const userInitials = getUserInitials(msg.senderName)

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                text-white text-sm font-bold shadow-lg ring-2 ring-white/50
                ${isCurrentUser ? 'bg-gradient-to-br from-blue-500 to-purple-600' : avatarBg}
              `}
            >
              {isCurrentUser ? '👤' : userInitials}
            </div>

            {/* Message */}
            <div className={`flex flex-col max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
              <div className={`text-xs font-bold mb-2 px-2 ${isCurrentUser ? 'text-blue-600' : 'text-gray-700'}`}>
                {isCurrentUser ? 'You' : msg.senderName}
              </div>
              <div
                className={`
                  rounded-2xl px-4 py-3 shadow-lg max-w-full
                  ${isCurrentUser
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md'
                    : `bg-gradient-to-br ${userGradient} text-white rounded-bl-md`
                  }
                `}
              >
                <div className="break-words font-medium">{msg.message}</div>
              </div>
              <div className={`text-xs mt-2 px-2 font-medium ${isCurrentUser ? 'text-blue-500' : 'text-gray-500'}`}>
                {formatTimestamp(msg.timestamp)}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
