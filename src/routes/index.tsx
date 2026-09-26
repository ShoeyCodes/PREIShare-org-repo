import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="home-page">
      <h1 className="home-title">PREIshare</h1>
      <p className="home-lead">Investor dashboard shell — starter home route.</p>
      <p className="home-action">
        <Link to="/dashboard">Open investor dashboard</Link>
      </p>
    </main>
  )
}
