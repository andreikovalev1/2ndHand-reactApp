import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  return <div>Admin Page</div>
}