import { Badge } from '../ui/badge'

const StatusBadge = ({ status }) => {
  const statusConfig = {
    saved: { label: 'Saved', variant: 'default' },
    applied: { label: 'Applied', variant: 'warning' },
    interview: { label: 'Interview', variant: 'info' },
    accepted: { label: 'Accepted', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'destructive' },
  }

  const config = statusConfig[status] || statusConfig.saved

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}

export default StatusBadge
