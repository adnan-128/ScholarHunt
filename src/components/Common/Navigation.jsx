import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { Home, Search, Heart, LayoutDashboard, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Navigation = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/scholarships', label: 'Search', icon: Search },
    ...(isAuthenticated ? [
      { to: '/saved', label: 'Saved', icon: Heart },
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ] : []),
  ]

  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map((link) => {
        const Icon = link.icon
        const isActive = location.pathname === link.to
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-primary-50 text-primary-600"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export default Navigation
