'use client'

import { useMemo, useState } from 'react'
import type { Article, ArticleType, Category } from '@/data/types'
import { CATEGORIES, CATEGORY_COLORS } from '@/data/types'
import { countByCategory } from '@/data'
import { ArticleCard } from './cards'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface CatalogProps {
  type: ArticleType
  articles: Article[]
  onOpen: (id: string) => void
  onSearch: () => void
}

/** Каталог раздела (новости или обзоры) с фильтром по направлениям */
export function Catalog({ type, articles, onOpen, onSearch }: CatalogProps) {
  const [filter, setFilter] = useState<Category | 'все'>('все')
  const [query, setQuery] = useState('')

  const isNews = type === 'news'
  const title = isNews ? 'Новости отрасли' : 'Аналитика и обзоры'
  const subtitle = isNews
    ? 'Новинки мировых производителей измерительных приборов — в переводе на русский язык'
    : 'Сравнительные тесты, разборы характеристик и практические рекомендации редакции'

  const list = useMemo(() => {
    let res = articles
    if (filter !== 'все') res = res.filter((a) => a.category === filter)
    const q = query.trim().toLowerCase()
    if (q) {
      res = res.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.manufacturer.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    return res
  }, [articles, filter, query])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Заголовок раздела */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {isNews ? '01 / лента' : '02 / аналитика'}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-xl border border-border bg-secondary/50 px-5 py-4 text-center font-mono md:block">
          <span className="block text-3xl font-bold text-primary">{list.length}</span>
          <span className="mt-1 block text-[11px] uppercase tracking-widest text-muted-foreground">
            {pluralMaterials(list.length)}
          </span>
        </span>
      </div>

      {/* Фильтры по направлениям */}
      <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Фильтр по направлению">
        <FilterChip active={filter === 'все'} onClick={() => setFilter('все')} label={`все · ${articles.length}`} tone="text-foreground" />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c}
            active={filter === c}
            onClick={() => setFilter(filter === c ? 'все' : c)}
            label={`${c} · ${countByCategory(c)}`}
            tone={CATEGORY_COLORS[c].text}
          />
        ))}
      </div>

      {/* Строка поиска по разделу */}
      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isNews ? 'Найти новость: бренд, прибор…' : 'Найти обзор: прибор, тип сравнения…'}
            aria-label="Поиск внутри раздела"
            className="w-full rounded-lg border border-border bg-secondary/40 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-cyan-400/50 focus:outline-none"
          />
        </div>
        <button
          onClick={onSearch}
          className="hidden rounded-lg border border-border bg-secondary/40 px-4 py-3 font-mono text-xs text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-primary sm:block"
        >
          поиск по всему сайту →
        </button>
      </div>

      {/* Сетка материалов */}
      {list.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="mt-14 rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            Ничего не найдено — попробуйте изменить фильтр или запрос
          </p>
        </div>
      )}
    </section>
  )
}

/** Русское склонение: 1 материал / 2 материала / 5 материалов */
function pluralMaterials(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'материал'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'материала'
  return 'материалов'
}

function FilterChip({
  active,
  onClick,
  label,
  tone,
}: {
  active: boolean
  onClick: () => void
  label: string
  tone: string
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
        active
          ? cn('border-cyan-400/60 bg-cyan-400/10 text-primary glow-neon', tone)
          : 'border-border bg-secondary/30 text-muted-foreground hover:border-cyan-400/30 hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}
