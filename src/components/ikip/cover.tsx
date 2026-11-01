import type { CoverStyle } from '@/data/types'

interface CoverProps {
  style: CoverStyle
  /** Уникальный идентификатор для генерации id градиентов */
  uid: string
  className?: string
}

/**
 * Фирменная SVG-обложка статьи в стиле «экран прибора».
 * Вариант рисунка зависит от темы материала.
 */
export function Cover({ style, uid, className }: CoverProps) {
  const g = `cv-${uid}`
  return (
    <div className={`scanline relative overflow-hidden ${className ?? ''}`}>
      <svg
        viewBox="0 0 400 180"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b1424" />
            <stop offset="100%" stopColor="#0a1220" />
          </linearGradient>
          <linearGradient id={`${g}-acc`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
          <radialGradient id={`${g}-glow`} cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="180" fill={`url(#${g}-bg)`} />
        <ellipse cx="200" cy="90" rx="230" ry="110" fill={`url(#${g}-glow)`} />

        {/* Канва-сетка */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="180" stroke="#1b2a47" strokeWidth="0.7" opacity="0.75" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 45} x2="400" y2={i * 45} stroke="#1b2a47" strokeWidth="0.7" opacity="0.75" />
        ))}

        {style === 'wave' && (
          <>
            <path
              d="M-10 90 L60 90 L75 40 L95 140 L112 60 L126 110 L140 90 L180 90 L195 30 L215 150 L235 70 L250 90 L300 90 L312 55 L330 125 L344 90 L410 90"
              stroke={`url(#${g}-acc)`}
              strokeWidth="2.4"
              fill="none"
              strokeLinejoin="round"
            />
            <circle cx="195" cy="30" r="3.2" fill="#22d3ee" />
          </>
        )}

        {style === 'spectrum' && (
          <>
            {[
              [30, 60], [55, 34], [80, 78], [105, 46], [130, 100], [155, 26],
              [180, 66], [205, 40], [230, 88], [255, 52], [280, 74], [305, 30],
              [330, 58], [355, 42],
            ].map(([x, h], i) => (
              <rect key={i} x={x} y={150 - h} width="14" height={h} rx="2" fill="#22d3ee" opacity={0.28 + (i % 4) * 0.18} />
            ))}
            <line x1="0" y1="150" x2="400" y2="150" stroke="#22d3ee" strokeWidth="1.2" opacity="0.6" />
          </>
        )}

        {style === 'dmm' && (
          <>
            <rect x="90" y="55" width="220" height="70" rx="10" fill="#060b16" stroke="#1b2a47" />
            <text
              x="200" y="107"
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="44"
              fontWeight="700"
              fill="#22d3ee"
            >
              10.000
            </text>
            <text x="118" y="48" fontFamily="'JetBrains Mono', monospace" fontSize="15" fill="#8ba3c7">DC V</text>
            <circle cx="292" cy="46" r="4" fill="#fbbf24" />
          </>
        )}

        {style === 'thermal' && (
          <>
            <circle cx="130" cy="95" r="52" fill="#f97316" opacity="0.55" />
            <circle cx="130" cy="95" r="34" fill="#ef4444" opacity="0.6" />
            <circle cx="130" cy="95" r="16" fill="#fbbf24" />
            <circle cx="255" cy="70" r="34" fill="#22d3ee" opacity="0.4" />
            <circle cx="255" cy="70" r="18" fill="#34d399" opacity="0.55" />
            <circle cx="312" cy="118" r="24" fill="#22d3ee" opacity="0.35" />
            <rect x="160" y="22" width="70" height="18" rx="4" fill="#060b16" stroke="#22d3ee" strokeOpacity="0.4" />
            <text x="195" y="35" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="#22d3ee">+78.4°C</text>
          </>
        )}

        {style === 'cal' && (
          <>
            <line x1="30" y1="90" x2="370" y2="90" stroke="#22d3ee" strokeWidth="1.4" opacity="0.75" />
            {Array.from({ length: 18 }).map((_, i) => {
              const x = 30 + i * 20
              const h = i % 3 === 0 ? 16 : i % 3 === 1 ? 10 : 6
              return <line key={i} x1={x} y1={90 - h} x2={x} y2={90 + h} stroke="#22d3ee" strokeWidth="1.4" opacity="0.8" />
            })}
            <path d="M210 20 L250 60 L235 75 L195 35 Z" fill="#8ba3c7" opacity="0.85" />
            <circle cx="243" cy="58" r="7" fill="#22d3ee" />
            <text x="352" y="130" fontFamily="'JetBrains Mono', monospace" fontSize="14" fill="#8ba3c7">±0,5 %</text>
          </>
        )}

        {style === 'kit' && (
          <>
            <rect x="52" y="50" width="90" height="80" rx="8" fill="none" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.6" />
            <path d="M64 105 L80 105 L86 72 L94 122 L100 88 L106 105 L130 105" stroke="#22d3ee" strokeWidth="2" fill="none" strokeLinejoin="round" />
            <rect x="160" y="60" width="70" height="60" rx="8" fill="none" stroke="#fbbf24" strokeOpacity="0.7" strokeWidth="1.6" />
            <text x="195" y="97" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="20" fill="#fbbf24">12V</text>
            <rect x="248" y="50" width="100" height="80" rx="8" fill="none" stroke="#34d399" strokeOpacity="0.7" strokeWidth="1.6" />
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <circle key={`${r}${c}`} cx={272 + c * 26} cy={72 + r * 18} r="3.4" fill="#34d399" opacity="0.8" />
              )),
            )}
          </>
        )}

        {/* Уголок-рамка */}
        <path d="M12 12 L44 12 M12 12 L12 36" stroke="#22d3ee" strokeWidth="1.6" opacity="0.8" fill="none" />
        <path d="M388 168 L356 168 M388 168 L388 144" stroke="#22d3ee" strokeWidth="1.6" opacity="0.8" fill="none" />
      </svg>
    </div>
  )
}
