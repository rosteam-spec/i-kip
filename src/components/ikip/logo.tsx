interface LogoProps {
  size?: number
  withText?: boolean
}

/** Логотип i-kip: осциллограмма в квадрате + текст */
export function Logo({ size = 38, withText = true }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="44" height="44" rx="11" fill="#0d1729" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.6" />
        <rect x="8" y="10" width="32" height="28" rx="4" fill="#060b16" stroke="#1b2a47" />
        <line x1="12" y1="17" x2="36" y2="17" stroke="#1b2a47" strokeWidth="0.8" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="#1b2a47" strokeWidth="0.8" />
        <line x1="12" y1="31" x2="36" y2="31" stroke="#1b2a47" strokeWidth="0.8" />
        <path
          d="M10 28 L16 28 L19 15 L23 36 L26 22 L28 28 L31 28 L33 24 L38 24"
          stroke="#22d3ee"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="38" cy="24" r="2" fill="#22d3ee" />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            i<span className="text-primary">-</span>kip
          </span>
          <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:block">
            измерительные приборы
          </span>
        </span>
      )}
    </span>
  )
}
