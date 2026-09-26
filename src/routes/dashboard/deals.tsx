import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/deals')({
  component: DealsPage,
})

function DealsPage() {
  return (
    <main>
      <h2 className="section-title">Deals</h2>
      <p>Placeholder for open and past investment deals.</p>
    </main>
  )
}
