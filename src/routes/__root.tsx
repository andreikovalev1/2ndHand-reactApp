import { createRootRouteWithContext } from '@tanstack/react-router'
import { MainLayout } from '../components/MainLayout'
import type { AuthContextType } from '../features/auth/auth-logic'

interface MyContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyContext>()({
  component: MainLayout,
})