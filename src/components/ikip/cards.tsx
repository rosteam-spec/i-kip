'use client'

import type { Article } from '@/data/types'
import { CategoryBadge, TypeBadge } from './badges'
import { Cover } from './cover'
import { cn } from '@/lib/utils'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

interface CardProps {
  article: Article
  onOpen: (id: string) => void
  className?: string
}

/** Крупная «featured» карточка — ведёт дайджест на главной */
export function FeaturedCard({ article, onOpen, className }: CardProps) {
  return (
    <button
      onClick={() => onOpen(article.id)}
      className={cn(
        'panel-card group relative flex flex-col overflow-hidden rounded-2xl text-left',
        className,
      )}
      aria-label={`Читать: ${article.title}`}
    >
      <Cover style={article.coverStyle} uid={article.id} className="h-56 w-full sm:h-64" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={article.type} />
          <CategoryBadge category={article.category} />
          {article.featured && (
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
              выбор редакции
            </span>
          )}
        </div>
        <h3 className="font-display mt-4 text-xl font-bold leading-snug transition-colors group-hover:text-primary sm:text-2xl">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" /> {article.readingTime}
            </span>
          </span>
          <span className="flex items-center gap-1 text-primary">
            читать <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </button>
  )
}

/** Обычная карточка в сетке каталога */
export function ArticleCard({ article, onOpen, className }: CardProps) {
  return (
    <button
      onClick={() => onOpen(article.id)}
      className={cn(
        'panel-card group flex flex-col overflow-hidden rounded-2xl text-left',
        className,
      )}
      aria-label={`Читать: ${article.title}`}
    >
      <Cover style={article.coverStyle} uid={article.id} className="h-40 w-full" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={article.type} />
          <CategoryBadge category={article.category} />
        </div>
        <h3 className="mt-3.5 text-base font-bold leading-snug transition-colors group-hover:text-primary sm:text-lg">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5 font-mono text-[11px] text-muted-foreground">
          <span>{article.date}</span>
          <span>{article.readingTime}</span>
        </div>
      </div>
    </button>
  )
}

/** Компактная строка-карточка для списков на главной */
export function CompactCard({ article, onOpen, className }: CardProps) {
  return (
    <button
      onClick={() => onOpen(article.id)}
      className={cn(
        'group flex items-start gap-4 rounded-xl border border-transparent p-3 text-left transition-colors hover:border-border hover:bg-secondary/50',
        className,
      )}
      aria-label={`Читать: ${article.title}`}
    >
      <Cover style={article.coverStyle} uid={article.id} className="scanline h-20 w-28 shrink-0 rounded-lg border border-border" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <TypeBadge type={article.type} />
          <span className="font-mono text-[10px] text-muted-foreground">{article.date}</span>
        </div>
        <h4 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
          {article.title}
        </h4>
      </div>
    </button>
  )
}
