import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Paddy — self-taught metalworker based in Dublin, making bespoke jewellery and metal engravings.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-28 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-crimson italic text-ash mb-2">The maker</p>
          <h1 className="section-heading mb-3">About Paddy</h1>
          <div className="w-16 h-px" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        {/* Bio + portrait placeholder */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-28">
          <div>
            <p className="font-crimson text-stone text-xl leading-relaxed mb-6">
              Paddy is a metalworker based in Dublin, Ireland. His practice spans
              handmade jewellery in silver and gold, and precision engravings
              worked into copper.
            </p>
            <p className="font-crimson text-stone text-xl leading-relaxed mb-6">
              The work is intentionally spare. No decoration for decoration&apos;s
              sake. Every mark and every finish is considered. The materials
              speak without embellishment.
            </p>
            <p className="font-crimson text-stone text-xl leading-relaxed mb-10">
              Commissions are accepted on a rolling basis. The enquiry process
              is straightforward: describe what you want, discuss materials and
              timeline, and the piece gets made.
            </p>
            <Button href="/enquire" variant="primary">
              Start an Enquiry
            </Button>
          </div>

          {/* Portrait placeholder */}
          <div
            className="relative aspect-[3/4] overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, var(--iron) 0%, var(--soot) 100%)',
              }}
            />
            <div className="absolute inset-0 flex items-end p-8">
              <p className="font-crimson italic text-ash text-sm">
                Paddy at work · Dublin
              </p>
            </div>
          </div>
        </div>

        {/* Disciplines */}
        <div className="mb-28">
          <h2 className="section-heading mb-10">The Work</h2>
          <div
            className="grid md:grid-cols-2 gap-px"
            style={{ backgroundColor: 'var(--border)' }}
          >
            {[
              {
                title: '3D Jewelry',
                desc: 'Rings, bands, and wearable pieces made by hand in silver and gold. Stones — diamonds, precious, and semi-precious gems — set to order. Each piece is formed without casting or moulding; the marks of the process remain in the metal.',
              },
              {
                title: '2D Engraving',
                desc: 'Precision line work engraved directly into copper and metal sheet. Portraits, lettering, abstract patterns, and custom designs. The depth and texture of the line work is built up over many passes with hand tools.',
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="p-10"
                style={{ backgroundColor: 'var(--deep)' }}
              >
                <div
                  className="w-8 h-px mb-6"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
                <h3 className="font-cinzel text-sm tracking-[0.2em] uppercase text-chalk mb-4">
                  {title}
                </h3>
                <p className="font-crimson text-stone leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <h2 className="section-heading mb-10">The Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enquiry',
                desc: 'Send a message with your idea, any reference images, dimensions, and budget. The more detail the better.',
              },
              {
                step: '02',
                title: 'Design',
                desc: 'A rough design is worked up and shared. Revisions discussed. Materials and timeline agreed before any work begins.',
              },
              {
                step: '03',
                title: 'Make',
                desc: 'The piece is made by hand. Progress photos shared throughout. On completion, delivery or collection arranged.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="p-8"
                style={{ border: '1px solid var(--border)' }}
              >
                <p className="font-cinzel text-4xl text-accent mb-5">{step}</p>
                <h3 className="font-cinzel text-sm tracking-[0.18em] uppercase text-chalk mb-3">
                  {title}
                </h3>
                <p className="font-crimson text-stone leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
