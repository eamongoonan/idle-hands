import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Paddy — self-taught metalworker based in Dublin, creating bespoke sculptures and engravings.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
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
              Paddy is a self-taught metalworker based in Dublin, Ireland. What
              began as tinkering with scrap steel in a rented garage has grown
              into a full practice spanning 3D sculptural work, precision 2D
              engravings, and bespoke commissions for private clients.
            </p>
            <p className="font-crimson text-stone text-xl leading-relaxed mb-6">
              The work is intentionally spare. No decoration for decoration's
              sake. Every mark, every weld, every finish is considered. The
              materials speak — mild steel, copper, brass — without embellishment.
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
                Paddy at work · Dublin forge
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-28"
          style={{ backgroundColor: 'var(--border)' }}
        >
          {[
            { value: '2016', label: 'Started Making' },
            { value: '8+', label: 'Years Experience' },
            { value: '200+', label: 'Pieces Completed' },
            { value: '3', label: 'Disciplines' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="py-12 px-8 text-center"
              style={{ backgroundColor: 'var(--deep)' }}
            >
              <p className="font-cinzel text-4xl text-accent mb-2">{value}</p>
              <p className="font-crimson italic text-stone text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Disciplines */}
        <div className="mb-28">
          <h2 className="section-heading mb-10">Disciplines</h2>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border)' }}>
            {[
              {
                title: '3D Sculpture',
                desc: 'Freestanding and wall-mounted sculptural pieces. Welded, ground, and finished by hand. Abstract and figurative work undertaken.',
              },
              {
                title: '2D Engraving',
                desc: 'Precision line work etched or engraved into steel and copper sheet. Portraits, lettering, abstract patterns, and custom designs.',
              },
              {
                title: 'Custom Commission',
                desc: 'Functional and decorative pieces made to specification — gates, brackets, frames, signage, and objects for the home.',
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
                <h3 className="font-cinzel text-xs tracking-[0.2em] uppercase text-chalk mb-4">
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
                desc: 'The piece is fabricated by hand. Progress photos shared throughout. On completion, delivery or collection arranged.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="p-8"
                style={{ border: '1px solid var(--border)' }}
              >
                <p className="font-cinzel text-4xl text-accent mb-5">{step}</p>
                <h3 className="font-cinzel text-xs tracking-[0.18em] uppercase text-chalk mb-3">
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
