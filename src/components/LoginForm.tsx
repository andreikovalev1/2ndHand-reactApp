import { useState } from 'react'
import { useAuth } from '../features/auth/auth-logic'
import { useNavigate } from '@tanstack/react-router'

export function LoginForm() {
  const { login,isLoading } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Сбрасываем старую ошибку
    
    try {
      await login({ username, password })
      // Если login прошел успешно, переходим:
      navigate({ to: '/' })
    } catch (err) {
      // Если случилась ошибка (неверные данные), navigate не выполнится
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  return (
    <div className="max-w-md m-auto mt-20 p-10 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">Login</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input 
          type="text" 
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded focus:outline-brand transition-all"
          required
          disabled={isLoading}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded focus:outline-brand transition-all"
          required
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bg-brand text-white py-2 rounded font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}