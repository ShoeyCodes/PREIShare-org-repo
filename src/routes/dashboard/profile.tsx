import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <main>
      <h2 className="section-title">Profile</h2>
      <p>Placeholder for investor profile details.</p>
    </main>
  )
}
