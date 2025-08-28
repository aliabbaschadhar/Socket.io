# Socket.IO Chat Server

A real-time group chat server built with Socket.IO, Express, and TypeScript.

## Refactored Architecture

The server has been refactored for better maintainability and organization:

### Project Structure

```
src/
├── types/                    # TypeScript type definitions
│   └── index.ts             # Shared interfaces and types
├── services/                # Business logic services
│   └── DataManager.ts       # Data management and storage
├── handlers/                # Socket event handlers
│   └── SocketHandlers.ts    # Socket connection and event handling
└── index.ts                 # Main server entry point
```

### Key Improvements

1. **Type Safety**: Full TypeScript support with defined interfaces
2. **Separation of Concerns**: Logic separated into distinct modules
3. **Data Management**: Centralized data handling with the DataManager service
4. **Event Handling**: Clean socket event handlers with proper error handling
5. **Environment Configuration**: Flexible configuration with environment variables
6. **Graceful Shutdown**: Proper cleanup on server termination

### Features

- Real-time messaging with Socket.IO
- Room creation and management
- User presence tracking
- Message history
- Participant management
- Health check endpoint

### API Endpoints

- `GET /` - Server status and information
- `GET /health` - Health check endpoint

### Socket Events

#### Client to Server

- `joinWithUsername` - Join with a username
- `createRoom` - Create a new chat room
- `joinRoom` - Join an existing room
- `leaveRoom` - Leave current room
- `sendMessage` - Send a message to current room

#### Server to Client

- `userJoined` - User successfully joined
- `roomCreated` - Room successfully created
- `joinedRoom` - Successfully joined a room
- `leftRoom` - Successfully left a room
- `receiveMessage` - New message received
- `userJoinedRoom` - Another user joined the room
- `userLeftRoom` - User left the room
- `roomListUpdated` - Available rooms list updated
- `error` - Error message

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## Environment Variables

- `PORT` - Server port (default: 8000)
- `CLIENT_URL` - Allowed client origin (default: <http://localhost:5173>)
- `NODE_ENV` - Environment mode

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
