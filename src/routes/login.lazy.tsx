import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginForm } from '../features/auth/components/LoginForm'

export const Route = createLazyFileRoute('/login')({
  component: LoginForm,
})