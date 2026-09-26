import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/portfolio')({
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <main>
      <h2 className="section-title">Portfolio</h2>
      <p>Placeholder for holdings and performance.</p>
    </main>
  )
}
