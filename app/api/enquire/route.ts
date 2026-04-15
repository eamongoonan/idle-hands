import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
      return '2D Engraving'
    default:
      return 'General'
  }
}

export async function POST(req: NextRequest) {
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

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[enquire] Resend error:', err)
    return NextResponse.json(
      { error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
