'use client'

import { useMemo, useState } from 'react'
import { searchArticles, ALL_TAGS, ARTICLES } from '@/data'
import { ArticleCard } from './cards'
import { SearchX, SearchCode } from 'lucide-react'

interface SearchViewProps {
  initialQuery?: string
  onOpen: (id: string) => void
}

/** Полнотекстовый поиск по всем материалам сайта */
export function SearchView({ initialQuery = '', onOpen }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => searchArticles(query), [query])

  const popularTags = useMemo(() => {
    // Топ-10 тегов по частоте
    const freq = new Map<string, number>()
    ARTICLES.forEach((a) => a.tags.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1)))
    return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t)
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">03 / поиск</p>
      <h1 className="font-display mt-2 text-3xl font-bold sm:text-4xl">Поиск по сайту</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Ищем по заголовкам, текстам, тегам, брендам и направлениям:
        «осциллограф», «Fluke», «погрешность», «тепловизор»…
      </p>

      {/* Поле поиска */}
      <div className="relative mt-7">
        <SearchCode className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите запрос…"
          aria-label="Поисковый запрос по сайту"
          autoFocus
          className="w-full rounded-xl border border-border bg-secondary/40 py-4 pl-12 pr-5 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
          {query ? `${results.length} рез.` : `${ARTICLES.length} мат.`}
        </span>
      </div>

      {/* Популярные теги */}
      {query.trim() === '' && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">популярное:</span>
          {popularTags.map((t) => (
            <button
              key={t}
              onClick={() => setQuery(t)}
              className="rounded-full border border-border bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-primary"
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Результаты */}
      {query.trim() !== '' && results.length > 0 && (
        <>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            найдено: {results.length}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((a) => (
              <ArticleCard key={a.id} article={a} onOpen={onOpen} />
            ))}
          </div>
        </>
      )}

      {query.trim() !== '' && results.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center">
          <SearchX className="mx-auto h-10 w-10 text-muted-foreground/50" aria-hidden="true" />
          <p className="mt-4 text-sm text-muted-foreground">
            По запросу «{query}» ничего не найдено.
            <br />
            Попробуйте один из {ALL_TAGS.length} тегов или другой бренд.
          </p>
        </div>
      )}
    </section>
  )
}
