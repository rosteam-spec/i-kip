'use client'

import type { Article } from '@/data/types'
import { getNeighbors } from '@/data'
import { BlockRenderer } from './blocks'
import { CategoryBadge, TypeBadge } from './badges'
import { Cover } from './cover'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Factory, Hash } from 'lucide-react'

interface ArticleViewProps {
  article: Article
  onBack: () => void
  onOpen: (id: string) => void
  onNavigate: (v: 'news' | 'reviews') => void
}

/** Страница статьи: обложка, метаданные, контент, теги и соседние материалы */
export function ArticleView({ article, onBack, onOpen, onNavigate }: ArticleViewProps) {
  const { prev, next } = getNeighbors(article.id)
  const isNews = article.type === 'news'

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Навигация назад */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к {isNews ? 'новостям' : 'обзорам'}
      </button>

      {/* Шапка статьи */}
      <header className="mt-7">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={article.type} />
          <CategoryBadge category={article.category} />
        </div>
        <h1 className="font-display mt-5 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3.5 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" /> {article.readingTime} чтения
          </span>
          <span className="flex items-center gap-1.5">
            <Factory className="h-3.5 w-3.5" /> {article.manufacturer}
          </span>
          <span className="flex items-center gap-1.5 text-primary">
            <span className="led" /> i-kip
          </span>
        </div>
      </header>

      {/* Обложка: фото прибора (если задано) или генеративная графика */}
      {article.image ? (
        <figure className="mt-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={`Фото: ${article.title}`}
            className="w-full rounded-2xl border border-border bg-secondary/30"
          />
          <figcaption className="mt-2 text-right font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {article.manufacturer} · фото производителя
          </figcaption>
        </figure>
      ) : (
        <Cover
          style={article.coverStyle}
          uid={`full-${article.id}`}
          className="mt-7 h-60 rounded-2xl border border-border sm:h-72"
        />
      )}

      {/* Контент */}
      <div className="pb-2">
        {article.blocks.map((b, i) => (
          <BlockRenderer key={i} block={b} blockIdx={i} />
        ))}
      </div>

      {/* Источник */}
      {article.source && (
        <p className="mt-6 rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
          {article.source}
        </p>
      )}

      {/* Теги */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <Hash className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        {article.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Переход в раздел */}
      <button
        onClick={() => onNavigate(isNews ? 'news' : 'reviews')}
        className="mt-8 w-full rounded-xl border border-border bg-secondary/40 px-5 py-4 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-primary"
      >
        Смотреть все {isNews ? 'новости' : 'обзоры и сравнения'} →
      </button>

      {/* Предыдущая / следующая */}
      <nav className="mt-4 grid gap-3 sm:grid-cols-2" aria-label="Соседние статьи">
        {prev ? (
          <button
            onClick={() => onOpen(prev.id)}
            className="panel-card group rounded-xl p-4 text-left"
          >
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <ArrowLeft className="h-3 w-3" /> предыдущая
            </span>
            <span className="mt-2 line-clamp-2 block text-sm font-semibold leading-snug group-hover:text-primary">
              {prev.title}
            </span>
          </button>
        ) : <span />}
        {next && (
          <button
            onClick={() => onOpen(next.id)}
            className="panel-card group rounded-xl p-4 text-right sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              следующая <ArrowRight className="h-3 w-3" />
            </span>
            <span className="mt-2 line-clamp-2 block text-sm font-semibold leading-snug group-hover:text-primary">
              {next.title}
            </span>
          </button>
        )}
      </nav>
    </article>
  )
}
