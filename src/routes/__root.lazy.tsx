import { createRootRouteWithContext } from '@tanstack/react-router'
import { MainLayout } from '../components/layout/MainLayout'
import type { AuthContextType } from '../features/auth/types'

interface MyRouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: MainLayout,
})