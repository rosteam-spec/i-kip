import type { Article, ArticleType, Category } from './types'
import { NEWS } from './news'
import { REVIEWS } from './reviews'

export * from './types'

/** Все материалы сайта, отсортированные по дате (сначала свежие) */
export const ARTICLES: Article[] = [...NEWS, ...REVIEWS].sort((a, b) =>
  b.isoDate.localeCompare(a.isoDate),
)

export const getNews = () => NEWS.sort((a, b) => b.isoDate.localeCompare(a.isoDate))

export const getReviews = () => REVIEWS.sort((a, b) => b.isoDate.localeCompare(a.isoDate))

export const getArticleById = (id: string): Article | undefined =>
  ARTICLES.find((a) => a.id === id)

export const getFeatured = (): Article[] => ARTICLES.filter((a) => a.featured)

/** Подсчёт материалов по направлению */
export const countByCategory = (cat: Category): number =>
  ARTICLES.filter((a) => a.category === cat).length

/** Подсчёт материалов по типу */
export const countByType = (type: ArticleType): number =>
  ARTICLES.filter((a) => a.type === type).length

/** Все уникальные теги */
export const ALL_TAGS: string[] = Array.from(
  new Set(ARTICLES.flatMap((a) => a.tags)),
).sort((a, b) => a.localeCompare(b, 'ru'))

/**
 * Полнотекстовый поиск по сайту: заголовки, анонсы, тексты,
 * теги, производители и направления.
 */
export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const words = q.split(/\s+/).filter(Boolean)

  const score = (a: Article): number => {
    const title = a.title.toLowerCase()
    const excerpt = a.excerpt.toLowerCase()
    const tags = a.tags.join(' ').toLowerCase()
    const body = a.blocks
      .map((b) => {
        switch (b.type) {
          case 'paragraph':
          case 'heading':
          case 'quote':
          case 'verdict':
            return b.text
          case 'list':
            return b.items.join(' ')
          case 'specs':
            return b.items.map((i) => `${i.label} ${i.value}`).join(' ')
          case 'table':
            return [b.caption, ...b.headers, ...b.rows.flat()].join(' ')
        }
      })
      .join(' ')
      .toLowerCase()
    const haystacks = [title, tags, a.manufacturer.toLowerCase(), a.category]

    let s = 0
    for (const w of words) {
      if (title.includes(w)) s += 5
      if (tags.includes(w)) s += 3
      if (a.manufacturer.toLowerCase().includes(w)) s += 3
      if (excerpt.includes(w)) s += 2
      if (body.includes(w)) s += 1
      if (haystacks.join(' ').includes(w)) s += 1
    }
    return s
  }

  return ARTICLES.map((a) => ({ a, s: score(a) }))
    .filter(({ s }) => s > 0)
    .sort((x, y) => y.s - x.s)
    .map(({ a }) => a)
}

/** Соседние статьи для навигации «предыдущая / следующая» */
export function getNeighbors(id: string): { prev?: Article; next?: Article } {
  const idx = ARTICLES.findIndex((a) => a.id === id)
  if (idx === -1) return {}
  return {
    prev: idx > 0 ? ARTICLES[idx - 1] : undefined,
    next: idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : undefined,
  }
}
