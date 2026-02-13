import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="text-center py-20">
      <h1 className="text-5xl font-extrabold text-slate-800 mb-4">Welcome to our Market</h1>
      <p className="text-slate-500">Discover unique second-hand items.</p>
    </div>
  ),
})