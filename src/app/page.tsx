'use client'

import { useCallback, useState } from 'react'
import { Header, type ViewName } from '@/components/ikip/header'
import { Hero } from '@/components/ikip/hero'
import { Home as HomeView } from '@/components/ikip/home'
import { Catalog } from '@/components/ikip/catalog'
import { SearchView } from '@/components/ikip/search-view'
import { ArticleView } from '@/components/ikip/article-view'
import { Footer } from '@/components/ikip/footer'
import { getArticleById, getNews, getReviews } from '@/data'

type View = { name: ViewName } | { name: 'article'; id: string }

const news = getNews()
const reviews = getReviews()

/**
 * i-kip — информационный сайт о современных измерительных приборах.
 * Одностраничное приложение с клиентской навигацией:
 * главная с дайджестом / новости / обзоры / поиск / карточка статьи.
 */
export default function IKipSite() {
  const [view, setView] = useState<View>({ name: 'home' })

  const scrollTop = useCallback(() => {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }))
  }, [])

  const navigate = useCallback(
    (v: ViewName) => {
      setView({ name: v })
      scrollTop()
    },
    [scrollTop],
  )

  const openArticle = useCallback(
    (id: string) => {
      setView({ name: 'article', id })
      scrollTop()
    },
    [scrollTop],
  )

  const goBack = useCallback(() => {
    setView((prev) =>
      prev.name === 'article'
        ? { name: prev.id && news.some((n) => n.id === prev.id) ? 'news' : 'reviews' }
        : { name: 'home' },
    )
    scrollTop()
  }, [scrollTop])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header view={view.name === 'article' ? getArticleById(view.id)?.type === 'news' ? 'news' : 'reviews' : view.name} onNavigate={navigate} />

      <main className="flex-1">
        {view.name === 'home' && <Hero onNavigate={navigate} onOpenArticle={openArticle} />}
        {view.name === 'home' && <HomeView onNavigate={navigate} onOpenArticle={openArticle} />}

        {view.name === 'news' && (
          <Catalog type="news" articles={news} onOpen={openArticle} onSearch={() => navigate('search')} />
        )}

        {view.name === 'reviews' && (
          <Catalog type="review" articles={reviews} onOpen={openArticle} onSearch={() => navigate('search')} />
        )}

        {view.name === 'search' && <SearchView onOpen={openArticle} />}

        {view.name === 'article' &&
          (() => {
            const article = getArticleById(view.id)
            if (!article) {
              return (
                <div className="mx-auto max-w-3xl px-4 py-24 text-center">
                  <p className="font-display text-2xl font-bold">Материал не найден</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Возможно, статья была перемещена. Вернитесь на главную.
                  </p>
                  <button
                    onClick={() => navigate('home')}
                    className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    На главную
                  </button>
                </div>
              )
            }
            return (
              <ArticleView
                article={article}
                onBack={goBack}
                onOpen={openArticle}
                onNavigate={navigate}
              />
            )
          })()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  )
}
