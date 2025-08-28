// Generate consistent colors for users based on their ID
export const getUserColor = (userId: string): string => {
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
export const getAvatarBg = (userId: string): string => {
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

// Get user initials from username
export const getUserInitials = (username: string): string => {
  return username.slice(0, 2).toUpperCase()
}

// Format timestamp for display
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}
