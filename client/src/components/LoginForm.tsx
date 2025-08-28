import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginFormProps {
  username: string
  onUsernameChange: (username: string) => void
  onLogin: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export const LoginForm = ({ username, onUsernameChange, onLogin, onKeyPress }: LoginFormProps) => {
  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-2xl border-0 backdrop-blur-sm bg-white/90">
        <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-600 text-white">
          <CardTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <span className="text-2xl">🚀</span>
            Join Chat
            <span className="text-2xl">🚀</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                onKeyDown={onKeyPress}
                placeholder="Your username..."
                className="w-full"
              />
            </div>
            <Button
              onClick={onLogin}
              disabled={!username.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Join Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
