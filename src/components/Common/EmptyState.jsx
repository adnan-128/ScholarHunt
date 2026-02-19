import { FileQuestion } from 'lucide-react'
import { Button } from '../ui/button'

const EmptyState = ({ 
  title = 'No results found', 
  description = 'Try adjusting your filters or search criteria',
  icon = FileQuestion,
  actionLabel,
  onAction 
}) => {
  const Icon = icon
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

export default EmptyState
