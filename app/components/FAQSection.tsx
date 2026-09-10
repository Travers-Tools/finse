'use client'

import { useState } from 'react'
import { useLang } from '@/lib/useLang'
import { faq } from '@/content/faq'

export default function FAQSection() {
  const lang = useLang()
  const t = faq[lang]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="content-section section-faq">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-header">
            <h2 className="faq-title">{t.title[0]}<br />{t.title[1]}</h2>
          </div>
          <div className="faq-list">
            {t.items.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
              >
                <button className="faq-question" onClick={() => toggle(index)}>
                  <span>{item.question}</span>
                  <span className="faq-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {openIndex === index
                        ? <path d="M4 8h8" />
                        : <><path d="M4 8h8" /><path d="M8 4v8" /></>
                      }
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                    <div className="faq-avatar">
                      <img src="/assets/logo/logo-mork.png" alt={t.avatarAlt} className="faq-avatar-img faq-avatar-img--logo" />
                      <div className="faq-avatar-info">
                        <span className="faq-avatar-name">{t.avatarName}</span>
                        <span className="faq-avatar-email">{t.avatarEmail}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
