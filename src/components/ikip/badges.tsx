import type { Article, ArticleType } from '@/data/types'
import { CATEGORY_COLORS } from '@/data/types'
import { cn } from '@/lib/utils'
import { Newspaper, ChartLine } from 'lucide-react'

/** Бейдж типа материала: новость или обзор */
export function TypeBadge({ type, className }: { type: ArticleType; className?: string }) {
  const isNews = type === 'news'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider',
        isNews
          ? 'border-cyan-400/35 bg-cyan-400/10 text-cyan-300'
          : 'border-amber-400/35 bg-amber-400/10 text-amber-300',
        className,
      )}
    >
      {isNews ? <Newspaper className="h-3 w-3" /> : <ChartLine className="h-3 w-3" />}
      {isNews ? 'Новость' : 'Обзор'}
    </span>
  )
}

/** Бейдж направления измерений с LED-точкой фирменного цвета */
export function CategoryBadge({ category, className }: { category: Article['category']; className?: string }) {
  const c = CATEGORY_COLORS[category]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        c.bg, c.border, c.text, className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
      {category}
    </span>
  )
}
