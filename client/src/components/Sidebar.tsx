import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Room, CurrentRoom } from "../types"

interface SidebarProps {
  username: string
  currentRoom: CurrentRoom | null
  availableRooms: Room[]
  showCreateRoom: boolean
  newRoomName: string
  onToggleCreateRoom: () => void
  onRoomNameChange: (name: string) => void
  onCreateRoom: () => void
  onCancelCreateRoom: () => void
  onJoinRoom: (roomId: string) => void
  onLeaveRoom: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export const Sidebar = ({
  username,
  currentRoom,
  availableRooms,
  showCreateRoom,
  newRoomName,
  onToggleCreateRoom,
  onRoomNameChange,
  onCreateRoom,
  onCancelCreateRoom,
  onJoinRoom,
  onLeaveRoom,
  onKeyPress
}: SidebarProps) => {
  return (
    <div className="w-80 bg-white/90 backdrop-blur-sm border-r flex flex-col">
      {/* Sidebar Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-600 text-white p-4">
        <div className="text-lg font-bold mb-2">👋 Welcome, {username}!</div>
        <Button
          onClick={onToggleCreateRoom}
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
          variant="outline"
        >
          ➕ Create Room
        </Button>
      </div>

      {/* Create Room Form */}
      {showCreateRoom && (
        <div className="p-4 bg-blue-50 border-b">
          <div className="space-y-2">
            <Input
              type="text"
              value={newRoomName}
              onChange={(e) => onRoomNameChange(e.target.value)}
              onKeyDown={onKeyPress}
              placeholder="Room name..."
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                onClick={onCreateRoom}
                disabled={!newRoomName.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="sm"
              >
                Create
              </Button>
              <Button
                onClick={onCancelCreateRoom}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Current Room */}
      {currentRoom && (
        <div className="p-4 bg-green-50 border-b">
          <div className="text-sm font-medium text-green-800 mb-2">Current Room</div>
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <div className="font-semibold text-green-900">{currentRoom.name}</div>
            <div className="text-sm text-green-600 mt-1">
              {currentRoom.participants.length} participant(s)
            </div>
            <div className="text-xs text-green-500 mt-2">
              Participants: {currentRoom.participants.map(p => p.username).join(", ")}
            </div>
            <Button
              onClick={onLeaveRoom}
              className="w-full mt-3 bg-red-600 hover:bg-red-700"
              size="sm"
            >
              🚪 Leave Room
            </Button>
          </div>
        </div>
      )}

      {/* Available Rooms */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="text-sm font-medium text-gray-700 mb-3">
            Available Rooms ({availableRooms.length})
          </div>
          <div className="space-y-2">
            {availableRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
                onClick={() => onJoinRoom(room.id)}
              >
                <div className="font-medium text-gray-900">{room.name}</div>
                <div className="text-sm text-gray-500">{room.participantCount} participant(s)</div>
                {currentRoom?.id === room.id && (
                  <div className="text-xs text-green-600 font-medium mt-1">✓ Current Room</div>
                )}
              </div>
            ))}
            {availableRooms.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🏠</div>
                <div>No rooms available</div>
                <div className="text-sm">Create one to get started!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
