import { useState } from 'react'
import { useAuth } from '../hooks/use-auth'
import { useNavigate } from '@tanstack/react-router'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      const user = await login({ username, password })
      
      if(user.role === 'admin') {
        navigate({to: '/admin'})
      } else {
        navigate({to: '/'})
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[80vh] px-4", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to access the market
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/50 text-destructive rounded-md text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FieldGroup className="flex flex-col gap-4">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input 
                  id="password" 
                  type="password"
                  placeholder='Enter your password'
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </Field>
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}