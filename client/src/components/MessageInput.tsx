import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  message: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  disabled?: boolean
}

export const MessageInput = ({
  message,
  onMessageChange,
  onSendMessage,
  onKeyPress,
  disabled = false
}: MessageInputProps) => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Input
            type="text"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="w-full border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-full px-4 py-3 bg-white/80 backdrop-blur-sm shadow-lg"
          />
        </div>
        <Button
          onClick={onSendMessage}
          disabled={!message.trim() || disabled}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full shadow-lg"
        >
          📤 Send
        </Button>
      </div>
    </div>
  )
}
