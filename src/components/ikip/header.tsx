'use client'

import { useState } from 'react'
import { Logo } from './logo'
import { cn } from '@/lib/utils'
import { Menu, Search, X } from 'lucide-react'

export type ViewName = 'home' | 'news' | 'reviews' | 'search'

interface HeaderProps {
  view: ViewName
  onNavigate: (v: ViewName) => void
}

const NAV: { id: ViewName; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'news', label: 'Новости' },
  { id: 'reviews', label: 'Обзоры' },
  { id: 'search', label: 'Поиск' },
]

export function Header({ view, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const go = (v: ViewName) => {
    setOpen(false)
    onNavigate(v)
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          onClick={() => go('home')}
          className="rounded-md focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="i-kip — на главную"
        >
          <Logo />
        </button>

        {/* Десктопная навигация */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-current={view === item.id ? 'page' : undefined}
              className={cn(
                'relative rounded-md px-4 py-2 text-sm font-medium transition-colors',
                view === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.id === 'search' && <Search className="mr-1.5 inline h-3.5 w-3.5" />}
              {item.label}
              {view === item.id && (
                <span className="absolute inset-x-4 -bottom-[13px] h-0.5 rounded-full bg-primary shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              )}
            </button>
          ))}
          <span className="ml-3 hidden items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 font-mono text-[11px] text-muted-foreground lg:inline-flex">
            <span className="led" />
            on air
          </span>
        </nav>

        {/* Мобильный бургер */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Мобильное меню */}
      {open && (
        <nav className="border-t border-border bg-surface md:hidden" aria-label="Мобильная навигация">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                'flex w-full items-center gap-3 border-b border-border/50 px-6 py-4 text-left text-base font-medium',
                view === item.id ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {item.id === 'search' && <Search className="h-4 w-4" />}
              {item.label}
              {view === item.id && <span className="led ml-auto" />}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
