'use client'

import { ARTICLES, getNews, getReviews, getFeatured } from '@/data'
import { FeaturedCard, ArticleCard, CompactCard } from './cards'
import { ArrowRight } from 'lucide-react'
import type { ViewName } from './header'

interface HomeProps {
  onNavigate: (v: ViewName) => void
  onOpenArticle: (id: string) => void
}

/** Главная страница: дайджест новостей недели, избранная аналитика, последние материалы */
export function Home({ onNavigate, onOpenArticle }: HomeProps) {
  const news = getNews()
  const reviews = getReviews()
  const featured = getFeatured()
  const [lead, ...restNews] = news
  const topReviews = reviews.slice(0, 3)
  const latest = ARTICLES.slice(0, 6)
  const secondaryNews = restNews.slice(0, 3)

  return (
    <>
      {/* Дайджест новостей */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHead
          index="01"
          title="Новости недели"
          hint="переводы свежих релизов мировых производителей"
          action={{ label: 'все новости', onClick: () => onNavigate('news') }}
        />
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {lead && <FeaturedCard article={lead} onOpen={onOpenArticle} />}
          <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-secondary/25 p-3">
            <p className="px-2 pt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              другие новости
            </p>
            {secondaryNews.map((a) => (
              <CompactCard key={a.id} article={a} onOpen={onOpenArticle} />
            ))}
            <button
              onClick={() => onNavigate('news')}
              className="mt-auto flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-primary"
            >
              смотреть все новости <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {restNews.slice(3, 6).map((a) => (
            <ArticleCard key={a.id} article={a} onOpen={onOpenArticle} />
          ))}
        </div>
      </section>

      {/* Аналитика */}
      <section className="border-y border-border bg-[#081020]/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <SectionHead
            index="02"
            title="Аналитика и обзоры"
            hint="сравнения, тесты и разборы метрологии"
            action={{ label: 'все обзоры', onClick: () => onNavigate('reviews') }}
          />
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {topReviews.map((a) => (
              <ArticleCard key={a.id} article={a} onOpen={onOpenArticle} />
            ))}
          </div>
          {featured.length > 0 && (
            <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/5 p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                выбор редакции
              </p>
              <div className="mt-3 grid gap-2">
                {featured.slice(0, 2).map((a) => (
                  <CompactCard key={a.id} article={a} onOpen={onOpenArticle} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Последние материалы */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHead
          index="03"
          title="Последние материалы"
          hint="всё самое свежее — новости и обзоры вместе"
          action={{ label: 'поиск по сайту', onClick: () => onNavigate('search') }}
        />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} onOpen={onOpenArticle} />
          ))}
        </div>
      </section>
    </>
  )
}

function SectionHead({
  index,
  title,
  hint,
  action,
}: {
  index: string
  title: string
  hint: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {index} / раздел
        </p>
        <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">{hint}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="group flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-primary"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  )
}
