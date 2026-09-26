import { createFileRoute } from '@tanstack/react-router'
import { PortfolioSummary } from '../../components/dashboard/PortfolioSummary'
import { RecentActivity } from '../../components/dashboard/RecentActivity'
import { StatsCard } from '../../components/dashboard/StatsCard'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHomePage,
})

function DashboardHomePage() {
  return (
    <div className="dashboard-home">
      <div className="stats-row">
        <StatsCard
          label="Portfolio value"
          value="$2.4M"
          hint="Sample asking value across your holdings"
        />
        <StatsCard
          label="Open deals"
          value="6"
          hint="Live and under offer"
        />
        <StatsCard
          label="Sold"
          value="3"
          hint="Sold listings you can review"
        />
      </div>
      <PortfolioSummary />
      <RecentActivity />
    </div>
  )
}
