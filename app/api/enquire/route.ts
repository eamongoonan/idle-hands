import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 5
const WINDOW_MS = 15 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= LIMIT) return true
  entry.count++
  return false
}

interface EnquiryBody {
  name?: string
  email?: string
  type?: '3d' | '2d' | 'general'
  message?: string
  budget?: string
}

function typeLabel(type: string | undefined) {
  switch (type) {
    case '3d':
      return '3D Piece'
    case '2d':
      return '2D Piece'
    default:
      return 'General'
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const contactEmail = process.env.CONTACT_EMAIL

  if (!apiKey || !contactEmail) {
    return NextResponse.json(
      { error: 'Email service is not configured.' },
      { status: 503 }
    )
  }

  let body: EnquiryBody
  try {
    body = (await req.json()) as EnquiryBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, type, message, budget } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const resend = new Resend(apiKey)
  const subject = `[Idle Hands] ${typeLabel(type)} enquiry from ${name}`

  try {
    await resend.emails.send({
      from: 'Idle Hands <noreply@idlehands.ie>',
      to: contactEmail,
      replyTo: email,
      subject,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="border-bottom: 2px solid #b5651d; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h2 style="margin: 0; font-size: 1.1rem; color: #111; letter-spacing: 0.05em;">
              New Enquiry via Idle Hands
            </h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.9rem;">
            <tr>
              <td style="padding: 0.5rem 0; color: #666; width: 130px; vertical-align: top;">Type</td>
              <td style="padding: 0.5rem 0; color: #111; font-weight: bold;">${typeLabel(type)}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; color: #666; vertical-align: top;">Name</td>
              <td style="padding: 0.5rem 0; color: #111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 0.5rem 0;">
                <a href="mailto:${email}" style="color: #b5651d;">${email}</a>
              </td>
            </tr>
            ${
              budget
                ? `<tr>
              <td style="padding: 0.5rem 0; color: #666; vertical-align: top;">Budget</td>
              <td style="padding: 0.5rem 0; color: #111;">${budget}</td>
            </tr>`
                : ''
            }
          </table>
          <div style="border-top: 1px solid #eee; padding-top: 1.5rem;">
            <h3 style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: #666; margin: 0 0 0.75rem;">
              Message
            </h3>
            <p style="white-space: pre-wrap; color: #222; margin: 0;">${message}</p>
          </div>
        </div>
      `,
    })

    // Confirmation email to the customer — fire and forget, don't fail the request if it errors
    resend.emails.send({
      from: 'Idle Hands <noreply@idlehands.ie>',
      to: email,
      subject: 'Your enquiry has been received — Idle Hands',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="border-bottom: 2px solid #b5651d; padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <h2 style="margin: 0; font-size: 1.1rem; color: #111; letter-spacing: 0.05em;">
              Idle Hands
            </h2>
          </div>
          <p style="margin: 0 0 1rem;">Hi ${name},</p>
          <p style="margin: 0 0 1rem;">
            Thank you for getting in touch. Your enquiry has been received and Patrick will be in touch within 48 hours.
          </p>
          <p style="margin: 0 0 1.5rem;">
            In the meantime, you can browse the full portfolio at
            <a href="https://idlehands.ie/portfolio" style="color: #b5651d;">idlehands.ie/portfolio</a>.
          </p>
          <div style="border-top: 1px solid #eee; padding-top: 1.5rem; font-size: 0.85rem; color: #999;">
            <p style="margin: 0;">Idle Hands · Dublin · handmade metalwork &amp; jewellery</p>
          </div>
        </div>
      `,
    }).catch(() => {/* non-critical */})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[enquire] Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
