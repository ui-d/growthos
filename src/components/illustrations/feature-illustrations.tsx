// Custom SVG illustrations for feature sections
// These replace generic lucide icons with more distinctive visuals

export function KpiTreeIllustration({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* North Star at top */}
      <circle cx="16" cy="6" r="3" className="fill-current" />
      {/* Main trunk */}
      <path d="M16 9v6" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
      {/* Branches */}
      <path d="M16 15L8 21M16 15L24 21M16 15v10" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
      {/* Metric nodes */}
      <circle cx="8" cy="23" r="2.5" className="fill-current opacity-70" />
      <circle cx="16" cy="27" r="2.5" className="fill-current opacity-70" />
      <circle cx="24" cy="23" r="2.5" className="fill-current opacity-70" />
    </svg>
  )
}

export function ActivationIllustration({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lightning bolt / spark */}
      <path
        d="M18 4L8 18h7l-3 10 10-14h-7l3-10z"
        className="fill-current"
      />
      {/* Radiating lines */}
      <path d="M4 16h3M25 16h3M7 8l2 2M23 8l-2 2M7 24l2-2M23 24l-2-2" className="stroke-current opacity-50" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function TrackingPlanIllustration({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document base */}
      <rect x="6" y="4" width="20" height="24" rx="2" className="stroke-current" strokeWidth="2" fill="none" />
      {/* Event rows */}
      <rect x="10" y="9" width="4" height="2" rx="0.5" className="fill-current" />
      <rect x="16" y="9" width="6" height="2" rx="0.5" className="fill-current opacity-50" />
      <rect x="10" y="14" width="4" height="2" rx="0.5" className="fill-current" />
      <rect x="16" y="14" width="6" height="2" rx="0.5" className="fill-current opacity-50" />
      <rect x="10" y="19" width="4" height="2" rx="0.5" className="fill-current" />
      <rect x="16" y="19" width="6" height="2" rx="0.5" className="fill-current opacity-50" />
      {/* Checkmark */}
      <path d="M10 24l2 2 4-4" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DashboardIllustration({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chart bars */}
      <rect x="5" y="18" width="5" height="10" rx="1" className="fill-current opacity-50" />
      <rect x="13" y="12" width="5" height="16" rx="1" className="fill-current opacity-70" />
      <rect x="21" y="6" width="5" height="22" rx="1" className="fill-current" />
      {/* Trend line */}
      <path d="M7.5 14L15.5 8L23.5 4" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points */}
      <circle cx="7.5" cy="14" r="2" className="fill-current" />
      <circle cx="15.5" cy="8" r="2" className="fill-current" />
      <circle cx="23.5" cy="4" r="2" className="fill-current" />
    </svg>
  )
}

export function DevtoolIllustration({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Terminal window */}
      <rect x="4" y="6" width="24" height="20" rx="2" className="stroke-current" strokeWidth="2" fill="none" />
      {/* Terminal header dots */}
      <circle cx="8" cy="10" r="1.5" className="fill-current opacity-50" />
      <circle cx="12" cy="10" r="1.5" className="fill-current opacity-50" />
      {/* Command prompt */}
      <path d="M8 16l3 2-3 2" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 20h8" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function B2bSaasIllustration({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Building/workspace */}
      <rect x="6" y="10" width="20" height="18" rx="2" className="stroke-current" strokeWidth="2" fill="none" />
      {/* Roof/header */}
      <path d="M4 10l12-6 12 6" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Windows/users */}
      <rect x="10" y="15" width="4" height="4" rx="1" className="fill-current" />
      <rect x="18" y="15" width="4" height="4" rx="1" className="fill-current" />
      {/* Door/entry */}
      <rect x="13" y="22" width="6" height="6" rx="1" className="fill-current opacity-70" />
    </svg>
  )
}

export function SelfServeIllustration({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central user */}
      <circle cx="16" cy="10" r="4" className="fill-current" />
      <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6" className="stroke-current" strokeWidth="2" strokeLinecap="round" />
      {/* Value indicators radiating */}
      <path d="M16 4v-2M24 10h2M8 10H6M22 5l1.5-1.5M10 5L8.5 3.5" className="stroke-current opacity-60" strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark badge */}
      <circle cx="24" cy="22" r="4" className="fill-current" />
      <path d="M22 22l1.5 1.5 3-3" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
