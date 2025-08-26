import { io } from "socket.io-client"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    const socket = io(backendUrl)

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    // cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>Hello How are you?</div>
  )
}

export default App