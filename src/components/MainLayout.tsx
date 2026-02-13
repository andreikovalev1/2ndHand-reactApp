import { Outlet } from '@tanstack/react-router'
import { Header } from './Header'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}