'use client'

import type { Category } from '@/data/types'
import { CATEGORIES, countByCategory } from '@/data'
import { Logo } from './logo'
import type { ViewName } from './header'
import { Mail, Rss, ShieldCheck } from 'lucide-react'

interface FooterProps {
  onNavigate: (v: ViewName) => void
  onFilterCategory?: (c: Category) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const year = 2026
  return (
    <footer className="mt-auto border-t border-border bg-[#070d1a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* О проекте */}
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              i-kip — независимый информационный проект о современных
              измерительных приборах. Переводим новости мировых
              производителей на русский язык и делаем собственные
              аналитические обзоры и сравнения.
            </p>
            <p className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-secondary/30 px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Материалы носят информационный характер и не являются
              рекламой. Характеристики уточняйте в официальных
              паспортах приборов.
            </p>
          </div>

          {/* Разделы */}
          <nav aria-label="Разделы сайта">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Разделы
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(
                [
                  ['home', 'Главная с дайджестом'],
                  ['news', 'Новости отрасли'],
                  ['reviews', 'Аналитика и обзоры'],
                  ['search', 'Поиск по сайту'],
                ] as [ViewName, string][]
              ).map(([v, label]) => (
                <li key={v}>
                  <button
                    onClick={() => onNavigate(v)}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Направления */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Направления
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c} className="flex items-center justify-between gap-3 text-muted-foreground">
                  <span>{c}</span>
                  <span className="font-mono text-xs text-primary/80">{countByCategory(c)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p className="font-mono">© {year} i-kip · измерительные приборы — новости и аналитика</p>
          <p className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> info@i-kip.ru
            </span>
            <span className="flex items-center gap-1.5">
              <Rss className="h-3.5 w-3.5" /> RSS-лента
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
