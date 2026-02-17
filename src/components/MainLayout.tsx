import { Outlet } from '@tanstack/react-router'
import { Header } from './Header'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}