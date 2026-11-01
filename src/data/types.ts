/**
 * Типы данных контента i-kip.
 * Направления измерений: радиоизмерения, электроизмерения,
 * измерения параметров окружающей среды, метрология.
 */

export type Category =
  | 'радиоизмерения'
  | 'электроизмерения'
  | 'окружающая среда'
  | 'метрология'

export type ArticleType = 'news' | 'review'

export type CoverStyle =
  | 'wave'      // осциллограмма
  | 'spectrum'  // спектральные полосы
  | 'dmm'       // цифровой дисплей мультиметра
  | 'thermal'   // тепловая карта
  | 'cal'       // метрологические отметки / шкала
  | 'kit'       // набор приборов

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'specs'; title?: string; items: { label: string; value: string }[] }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'verdict'; text: string }

export interface Article {
  id: string
  type: ArticleType
  title: string
  excerpt: string
  date: string
  isoDate: string
  category: Category
  manufacturer: string
  source?: string
  readingTime: string
  tags: string[]
  featured?: boolean
  coverStyle: CoverStyle
  blocks: ContentBlock[]
}

export const CATEGORIES: Category[] = [
  'радиоизмерения',
  'электроизмерения',
  'окружающая среда',
  'метрология',
]

/** Цветовая кодировка направлений (в стиле LED-индикаторов) */
export const CATEGORY_COLORS: Record<Category, { text: string; bg: string; border: string; dot: string }> = {
  'радиоизмерения': {
    text: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    dot: 'bg-cyan-400',
  },
  'электроизмерения': {
    text: 'text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    dot: 'bg-amber-400',
  },
  'окружающая среда': {
    text: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    dot: 'bg-emerald-400',
  },
  'метрология': {
    text: 'text-violet-300',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/30',
    dot: 'bg-violet-400',
  },
}
