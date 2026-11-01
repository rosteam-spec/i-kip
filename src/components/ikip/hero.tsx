'use client'

import { ARTICLES } from '@/data'
import { useEffect, useState } from 'react'

interface HeroProps {
  onNavigate: (v: 'news' | 'reviews' | 'search') => void
  onOpenArticle: (id: string) => void
}

const STATS = [
  { value: String(ARTICLES.length), label: 'материалов в базе' },
  { value: '8', label: 'мировых брендов' },
  { value: '4', label: 'направления измерений' },
  { value: '24/7', label: 'мониторинг новинок' },
]

/** Hero-блок главной: слоган, осциллограмма, статистика и сигнальный тикер */
export function Hero({ onNavigate, onOpenArticle }: HeroProps) {
  const [typed, setTyped] = useState(0)
  const phrase = 'измеряй мир точно'
  useEffect(() => {
    if (typed >= phrase.length) return
    const t = setTimeout(() => setTyped((v) => v + 1), 70)
    return () => clearTimeout(t)
  }, [typed])

  const tickerItems = ARTICLES.slice(0, 6).map(
    (a) => `${a.manufacturer}: ${a.title}`,
  )
  const tickerLine = tickerItems.join('   •   ')

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Фоновая графика */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 320px at 70% -10%, rgba(34,211,238,0.14), transparent 65%), radial-gradient(600px 260px at 10% 110%, rgba(34,211,238,0.07), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Левая колонка */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5 font-mono text-xs text-cyan-300">
              <span className="led" />
              радиоизмерения · электроизмерения · экология · метрология
            </p>
            <h1 className="font-display mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Всё о современных
              <br />
              измерительных приборах
            </h1>
            <p className="font-mono mt-4 text-lg text-primary">
              {phrase.slice(0, typed)}
              <span className="caret-blink">_</span>
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Новости о новинках мировых производителей на русском языке
              и глубокая аналитика: сравнения, тесты и разбор метрологии —
              для инженеров, сервисных мастерских и радиолюбителей.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('news')}
                className="glow-neon rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
              >
                Свежие новости
              </button>
              <button
                onClick={() => onNavigate('reviews')}
                className="rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:border-cyan-400/50 hover:text-primary"
              >
                Аналитика и обзоры
              </button>
            </div>
          </div>

          {/* Правая колонка — «экран прибора» */}
          <div className="scanline relative overflow-hidden rounded-2xl border border-border bg-[#081020] p-5 shadow-2xl">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>CH1 · 2 V/div · 50 µs/div</span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="led" /> run
              </span>
            </div>
            <svg viewBox="0 0 420 190" className="mt-3 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="hero-wave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0e7490" />
                  <stop offset="55%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#67e8f9" />
                </linearGradient>
              </defs>
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`gv${i}`} x1={i * 42} y1="0" x2={i * 42} y2="190" stroke="#14213a" strokeWidth="0.8" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`gh${i}`} x1="0" y1={i * 38} x2="420" y2={i * 38} stroke="#14213a" strokeWidth="0.8" />
              ))}
              <line x1="0" y1="95" x2="420" y2="95" stroke="#1e3a5f" strokeDasharray="4 4" />
              <path
                className="scope-draw"
                d="M0 95 L55 95 L68 55 L84 135 L98 70 L110 95 L150 95 L163 35 L181 155 L199 62 L212 95 L268 95 L280 66 L298 124 L312 95 L360 95 L371 78 L384 112 L394 95 L420 95"
                stroke="url(#hero-wave)"
                strokeWidth="2.6"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px]">
              {[
                ['V RMS', '7.064 V'],
                ['Freq', '99.9 kHz'],
                ['Vpp', '19.98 V'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-md border border-border bg-secondary/60 px-2.5 py-2">
                  <div className="text-muted-foreground">{k}</div>
                  <div className="mt-0.5 text-primary">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Статистика */}
        <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="panel-card rounded-xl px-4 py-4 text-center"
            >
              <dd className="font-display text-2xl font-bold text-primary sm:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Сигнальный тикер свежих заголовков */}
      <div className="relative border-t border-border bg-[#081020]/80">
        <button
          onClick={() => onOpenArticle(ARTICLES[0].id)}
          className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 border-r border-cyan-400/25 bg-primary/10 px-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-primary"
          aria-label="Открыть самую свежую статью"
        >
          <span className="led" />
          <span className="hidden sm:inline">свежее</span>
        </button>
        <div className="overflow-hidden py-2.5 pl-36 sm:pl-40" aria-hidden="true">
          <div className="ticker-track font-mono text-xs text-muted-foreground">
            <span className="pr-8">{tickerLine}</span>
            <span className="pr-8">{tickerLine}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
