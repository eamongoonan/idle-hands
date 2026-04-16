'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type EnquiryType = '3d' | '2d' | 'general'

interface FormState {
  name: string
  email: string
  type: EnquiryType
  message: string
  budget: string
}

const ENQUIRY_TYPES: { value: EnquiryType; label: string; hint: string }[] = [
  { value: '3d', label: '3D Piece', hint: 'Sculpture or 3D fabrication' },
  { value: '2d', label: '2D Engraving', hint: 'Flat engraved or etched work' },
  { value: 'general', label: 'General', hint: 'Question or other enquiry' },
]

export default function EnquirePage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    type: 'general',
    message: '',
    budget: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="text-center max-w-md">
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <p className="font-cinzel text-[0.65rem] tracking-[0.3em] uppercase text-accent mb-4">
            Thank you
          </p>
          <h1 className="section-heading mb-6">Enquiry Received</h1>
          <p className="font-crimson text-stone text-lg">
            I&apos;ll be in touch within 48 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-28 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p className="font-crimson italic text-ash mb-2">Get in touch</p>
        <h1 className="section-heading mb-3">Make an Enquiry</h1>
        <div
          className="w-16 h-px mb-8"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <p className="font-crimson text-stone text-lg mb-14 leading-relaxed">
          All commissions and purchase enquiries go through this form. Fill in
          as much detail as you can — I&apos;ll respond within 48 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Enquiry type */}
          <fieldset>
            <legend className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-chalk mb-5 block">
              Enquiry Type
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ENQUIRY_TYPES.map(({ value, label, hint }) => {
                const checked = form.type === value
                return (
                  <label
                    key={value}
                    className="flex flex-col gap-1 p-4 cursor-pointer transition-all duration-200"
                    style={{
                      border: '1px solid',
                      borderColor: checked
                        ? 'var(--accent)'
                        : 'var(--border-hover)',
                      backgroundColor: checked
                        ? 'rgba(181, 101, 29, 0.06)'
                        : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value={value}
                        checked={checked}
                        onChange={() => set('type', value)}
                        className="accent-accent"
                      />
                      <span className="font-cinzel text-[0.65rem] tracking-[0.15em] uppercase text-chalk">
                        {label}
                      </span>
                    </div>
                    <p className="font-crimson italic text-ash text-xs pl-4">
                      {hint}
                    </p>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-chalk block mb-2">
                Name <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent font-crimson text-bone text-base px-4 py-3 focus:outline-none transition-colors duration-200"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border-hover)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border)')
                }
              />
            </div>
            <div>
              <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-chalk block mb-2">
                Email <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent font-crimson text-bone text-base px-4 py-3 focus:outline-none transition-colors duration-200"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 0,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border-hover)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border)')
                }
              />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-chalk block mb-2">
              Budget{' '}
              <span className="font-crimson italic normal-case tracking-normal text-ash text-xs">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={form.budget}
              onChange={(e) => set('budget', e.target.value)}
              placeholder="e.g. €200–€500"
              className="w-full bg-transparent font-crimson text-bone text-base px-4 py-3 focus:outline-none transition-colors duration-200"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 0,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border-hover)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border)')
              }
            />
          </div>

          {/* Message */}
          <div>
            <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-chalk block mb-2">
              Message <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <textarea
              required
              rows={7}
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder="Describe what you're looking for — dimensions, materials, references, timeline…"
              className="w-full bg-transparent font-crimson text-bone text-base px-4 py-3 focus:outline-none resize-none transition-colors duration-200"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 0,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border-hover)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border)')
              }
            />
          </div>

          <div className="flex items-center gap-6">
            <Button type="submit" variant="primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
            </Button>
            {status === 'error' && (
              <p className="font-crimson italic text-sm" style={{ color: '#c0392b' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
