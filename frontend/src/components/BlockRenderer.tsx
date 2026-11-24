import React from 'react'
import Link from 'next/link'
import { ChevronRight, Download, HelpCircle, Play, User, CheckCircle, FileText } from 'lucide-react'

interface BlockRendererProps {
  blocks?: any[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-16">
      {blocks.map((block, idx) => {
        switch (block.blockType) {
          case 'richText':
            return (
              <div key={idx} className="prose prose-lg max-w-none text-slate-700">
                {typeof block.content === 'string' ? (
                  <p>{block.content}</p>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: JSON.stringify(block.content) }} />
                )}
              </div>
            )

          case 'cardGrid':
            return (
              <section key={idx} className="my-10">
                {block.heading && (
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{block.heading}</h3>
                )}
                <div className={`grid grid-cols-1 md:grid-cols-${block.columns || '3'} gap-6`}>
                  {block.cards?.map((card: any, cIdx: number) => (
                    <div
                      key={cIdx}
                      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h4>
                      <p className="text-sm text-slate-600 mb-4">{card.description}</p>
                      {card.linkUrl && (
                        <Link
                          href={card.linkUrl}
                          className="text-xs font-bold text-blue-900 hover:text-amber-600 inline-flex items-center gap-1"
                        >
                          {card.linkLabel || 'Learn more'}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )

          case 'faqBlock':
            return (
              <section key={idx} className="my-10">
                {block.heading && (
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{block.heading}</h3>
                )}
                <div className="space-y-4">
                  {block.items?.map((item: any, qIdx: number) => (
                    <details
                      key={qIdx}
                      className="group p-5 rounded-xl bg-slate-50 border border-slate-200 open:bg-white open:shadow-xs transition-colors"
                    >
                      <summary className="flex items-center justify-between font-semibold text-slate-900 cursor-pointer list-none">
                        <span className="flex items-center gap-3">
                          <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <span>{item.question}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-4 text-sm text-slate-600 pl-8 leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )

          case 'downloadsBlock':
            return (
              <section key={idx} className="my-10">
                {block.heading && (
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{block.heading}</h3>
                )}
                <div className="space-y-3">
                  {block.files?.map((f: any, fIdx: number) => (
                    <div
                      key={fIdx}
                      className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-blue-100 text-blue-900">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{f.title}</h4>
                          {f.description && (
                            <p className="text-xs text-slate-500">{f.description}</p>
                          )}
                        </div>
                      </div>
                      <a
                        href={f.file?.url || '#'}
                        download
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )

          case 'videoBlock':
            return (
              <section key={idx} className="my-10">
                {block.title && (
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{block.title}</h3>
                )}
                <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                  <video
                    src={block.videoFile?.url || '/media/hero-1080.mp4'}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                {block.caption && (
                  <p className="mt-2 text-xs text-slate-500 text-center">{block.caption}</p>
                )}
              </section>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
