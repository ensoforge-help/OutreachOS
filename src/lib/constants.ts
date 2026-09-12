export type NavItem = {
  label: string
  href: string
  icon: string
  badge?: number
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Leads', href: '/dashboard/leads', icon: 'Users' },
  { label: 'Campaigns', href: '/dashboard/campaigns', icon: 'Megaphone' },
  { label: 'Approvals', href: '/dashboard/approvals', icon: 'CheckCircle', badge: 82 },
  { label: 'Scheduled', href: '/dashboard/scheduled', icon: 'Calendar' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
  { label: 'Automation Logs', href: '/dashboard/logs', icon: 'ScrollText' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
]

// Page titles
export const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/leads': 'Leads',
  '/dashboard/campaigns': 'Campaigns',
  '/dashboard/approvals': 'Approvals',
  '/dashboard/scheduled': 'Scheduled',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/logs': 'Automation Logs',
  '/dashboard/settings': 'Settings',
}

// Categories
export const BUSINESS_CATEGORIES = [
  'Restaurant',
  'Clinic',
  'Gym & Fitness',
  'Salon & Spa',
  'Educational Institute',
  'Real Estate',
  'Retail Store',
  'Auto Service',
  'Hotel & Hospitality',
  'Professional Services',
] as const

// Locations
export const LOCATIONS = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
] as const

// Chart colors
export const CHART_COLORS = {
  primary: '#8B5CF6',
  secondary: '#6366F1',
  tertiary: '#A78BFA',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  muted: '#71717A',
} as const

// Lead score ranges
export const SCORE_RANGES = [
  { label: '90-100', min: 90, max: 100 },
  { label: '80-89', min: 80, max: 89 },
  { label: '70-79', min: 70, max: 79 },
  { label: '60-69', min: 60, max: 69 },
  { label: '50-59', min: 50, max: 59 },
  { label: 'Below 50', min: 0, max: 49 },
] as const
