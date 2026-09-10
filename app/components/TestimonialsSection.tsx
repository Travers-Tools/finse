import type { Lang } from '@/lib/i18n'
import { testimonials } from '@/content/forside'

export default function TestimonialsSection({ lang }: { lang: Lang }) {
  const list = testimonials[lang]
  const doubled = [...list, ...list]

  return (
    <section className="content-section section-testimonials">
      <div className="testimonial-track">
        {doubled.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <blockquote>{testimonial.quote}</blockquote>
            <div className="card-footer">
              <div className="card-author">
                <span className="author-name">{testimonial.company}</span>
                <span className="author-role">{testimonial.details}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
