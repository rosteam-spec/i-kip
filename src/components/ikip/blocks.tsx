'use client'

import type { ContentBlock } from '@/data/types'
import { CheckCircle2, Quote, Table2 } from 'lucide-react'

/** Рендер одного содержательного блока статьи */
export function BlockRenderer({ block, blockIdx }: { block: ContentBlock; blockIdx: number }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={blockIdx} className="font-display mt-10 flex items-center gap-3 text-xl font-bold sm:text-2xl">
          <span className="h-5 w-1 rounded-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.7)]" aria-hidden="true" />
          {block.text}
        </h2>
      )

    case 'paragraph':
      return (
        <p key={blockIdx} className="mt-5 text-[15px] leading-[1.85] text-foreground/90 sm:text-base">
          {block.text}
        </p>
      )

    case 'list':
      return (
        <ul key={blockIdx} className="mt-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground/90">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'specs':
      return (
        <div key={blockIdx} className="mt-6 overflow-hidden rounded-xl border border-border bg-secondary/40">
          {block.title && (
            <div className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-widest text-primary">
              {block.title}
            </div>
          )}
          <dl className="grid gap-x-6 gap-y-0 sm:grid-cols-2">
            {block.items.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-4 border-b border-border/40 px-4 py-3 last:border-b-0"
              >
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="whitespace-nowrap text-right font-mono text-sm font-semibold text-primary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )

    case 'table':
      return (
        <figure key={blockIdx} className="mt-6">
          <div className="pretty-scroll overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-secondary/70">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="whitespace-nowrap border-b border-border px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-primary"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="transition-colors odd:bg-transparent even:bg-secondary/25 hover:bg-cyan-400/5">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={
                          ci === 0
                            ? 'border-b border-border/50 px-4 py-3 font-medium text-foreground'
                            : 'border-b border-border/50 px-4 py-3 font-mono text-[13px] text-muted-foreground'
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Table2 className="h-3.5 w-3.5" aria-hidden="true" />
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'quote':
      return (
        <blockquote
          key={blockIdx}
          className="mt-6 rounded-r-xl border-l-2 border-primary bg-secondary/40 py-4 pl-5 pr-4"
        >
          <Quote className="h-4 w-4 text-primary" aria-hidden="true" />
          <p className="mt-2 text-[15px] italic leading-relaxed text-foreground/90">{block.text}</p>
          {block.source && <cite className="mt-2 block font-mono text-xs not-italic text-muted-foreground">— {block.source}</cite>}
        </blockquote>
      )

    case 'verdict':
      return (
        <aside
          key={blockIdx}
          className="glow-neon mt-8 rounded-xl border border-primary/35 bg-primary/5 p-5"
        >
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-primary">Вывод i-kip</div>
          <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/95">{block.text}</p>
        </aside>
      )

    default:
      return null
  }
}
