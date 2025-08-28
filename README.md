# Socket.IO Real-Time Group Chat Application

A modern, full-stack real-time group chat application built with Socket.IO, featuring a React TypeScript frontend and a Node.js TypeScript backend.

## 🚀 Features

- **Real-time messaging** with instant delivery
- **Room creation and management** for organized conversations
- **User presence tracking** to see who's online
- **Message history** with timestamps
- **User avatars** with consistent color themes
- **Responsive design** that works on all devices
- **Type-safe** development with full TypeScript support
- **Modern UI** with Tailwind CSS and gradient designs

## 🏗️ Project Structure

```
Socket.io/
├── client/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main application component
│   ├── package.json
│   └── README.md
├── server/                   # Node.js TypeScript backend
│   ├── src/
│   │   ├── handlers/        # Socket event handlers
│   │   ├── services/        # Business logic services
│   │   ├── types/           # TypeScript type definitions
│   │   └── index.ts         # Main server entry point
│   ├── package.json
│   └── README.md
└── README.md                # This file
```

## 🛠️ Tech Stack

### Frontend (Client)

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **shadcn/ui** - Beautiful and accessible UI components

### Backend (Server)

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **TypeScript** - Type safety and better development experience
- **Bun** - Fast JavaScript runtime and package manager

## 🚦 Getting Started

### Prerequisites

- [Bun](https://bun.com) (recommended) or Node.js 18+
- Git

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/aliabbaschadhar/Socket.io.git
   cd Socket.io
   ```

2. **Install dependencies for both client and server**

   ```bash
   # Install server dependencies
   cd server
   bun install
   
   # Install client dependencies
   cd ../client
   bun install
   ```

3. **Set up environment variables**

   Create `.env` files in both directories:

   **Server** (`server/.env`):

   ```env
   PORT=8000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **Client** (`client/.env`):

   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Start the development servers**

   **Terminal 1 - Start the backend server:**

   ```bash
   cd server
   bun run dev
   ```

   **Terminal 2 - Start the frontend client:**

   ```bash
   cd client
   bun run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to use the chat application.

## 📡 API Documentation

### HTTP Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Server status and information |
| GET    | `/health`| Health check endpoint |

### Socket.IO Events

#### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `joinWithUsername` | `{ username: string }` | Join the chat with a username |
| `createRoom` | `{ roomName: string }` | Create a new chat room |
| `joinRoom` | `{ roomId: string }` | Join an existing room |
| `leaveRoom` | `{}` | Leave the current room |
| `sendMessage` | `{ content: string }` | Send a message to current room |

#### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `userJoined` | `{ user: User }` | User successfully joined |
| `roomCreated` | `{ room: Room }` | Room successfully created |
| `joinedRoom` | `{ room: Room, messages: Message[] }` | Successfully joined a room |
| `leftRoom` | `{}` | Successfully left a room |
| `receiveMessage` | `{ message: Message }` | New message received |
| `userJoinedRoom` | `{ user: User }` | Another user joined the room |
| `userLeftRoom` | `{ userId: string }` | User left the room |
| `roomListUpdated` | `{ rooms: Room[] }` | Available rooms list updated |
| `error` | `{ message: string }` | Error message |

## 🔧 Development

### Available Scripts

**Server:**

```bash
bun run dev     # Start development server with auto-reload
```

**Client:**

```bash
bun run dev     # Start development server
bun run build   # Build for production
bun run preview # Preview production build
bun run lint    # Run ESLint
```

### Project Architecture

This project follows a modular architecture with clear separation of concerns:

#### Server Architecture

- **`index.ts`** - Main server setup and configuration
- **`handlers/`** - Socket.IO event handlers
- **`services/`** - Business logic and data management
- **`types/`** - TypeScript interfaces and types

#### Client Architecture

- **`components/`** - Reusable React components
- **`hooks/`** - Custom React hooks for state management
- **`types/`** - TypeScript interfaces and types
- **`utils/`** - Helper functions and utilities

## 🚀 Deployment

### Server Deployment

1. Build the server (if needed):

   ```bash
   cd server
   bun install --production
   ```

2. Set environment variables:

   ```env
   PORT=8000
   CLIENT_URL=https://your-client-domain.com
   NODE_ENV=production
   ```

3. Start the server:

   ```bash
   bun src/index.ts
   ```

### Client Deployment

1. Build the client:

   ```bash
   cd client
   bun run build
   ```

2. Deploy the `dist/` folder to your hosting platform (Vercel, Netlify, etc.)

3. Update environment variables:

   ```env
   VITE_BACKEND_URL=https://your-server-domain.com
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Bun](https://bun.com/) for the fast JavaScript runtime

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/aliabbaschadhar/Socket.io/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Built with ❤️ by [Ali Abbas Chadhar](https://github.com/aliabbaschadhar)**
