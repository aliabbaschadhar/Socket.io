# Socket.IO Chat Client

A modern real-time group chat client built with React, TypeScript, Vite, and Tailwind CSS.

## Refactored Architecture

The client has been refactored for better maintainability and organization:

### Project Structure

```
src/
├── types/                    # TypeScript type definitions
│   └── index.ts             # Shared interfaces and types
├── hooks/                   # Custom React hooks
│   └── useSocket.ts         # Socket.IO connection and state management
├── components/              # Reusable UI components
│   ├── LoginForm.tsx        # User authentication form
│   ├── Sidebar.tsx          # Room management sidebar
│   ├── ChatArea.tsx         # Main chat interface
│   ├── MessageList.tsx      # Message display component
│   ├── MessageInput.tsx     # Message input component
│   └── ui/                  # Base UI components (shadcn/ui)
├── utils/                   # Utility functions
│   └── userUtils.ts         # User-related helper functions
└── App.tsx                  # Main application component
```

### Key Improvements

1. **Component Separation**: UI broken down into focused, reusable components
2. **Custom Hooks**: Socket logic extracted into a custom hook for better reusability
3. **Type Safety**: Full TypeScript support with defined interfaces
4. **Performance**: Optimized with React.memo and useCallback for better rendering
5. **Utilities**: Helper functions for consistent user colors and formatting
6. **Modern UI**: Beautiful gradient design with Tailwind CSS

### Features

- Real-time messaging with instant updates
- Room creation and management
- User presence indicators
- Message history with timestamps
- Responsive design with modern UI
- User avatars with consistent colors
- Typing indicators and user feedback

### Components

#### Core Components

- `LoginForm` - User authentication and username input
- `Sidebar` - Room list, creation, and navigation
- `ChatArea` - Main chat interface wrapper
- `MessageList` - Display messages with user avatars
- `MessageInput` - Message composition and sending

#### Custom Hooks

- `useSocket` - Manages Socket.IO connection and real-time events

#### Utilities

- `getUserColor` - Generate consistent gradient colors for users
- `getAvatarBg` - Generate solid background colors for avatars
- `getUserInitials` - Extract user initials for avatars
- `formatTimestamp` - Format message timestamps

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Environment Variables

Create a `.env` file in the client directory:

```env
VITE_BACKEND_URL=http://localhost:8000
```

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **shadcn/ui** - Beautiful and accessible UI components

## ESLint Configuration

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
