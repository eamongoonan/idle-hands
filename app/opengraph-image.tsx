import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Idle Hands — Handcrafted Metalwork · Dublin'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0e0e0e',
          padding: '72px 80px',
          fontFamily: 'serif',
        }}
      >
        {/* Top accent line */}
        <div style={{ width: 48, height: 2, backgroundColor: '#b5651d' }} />

        {/* Centre content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#f0ece4',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Idle Hands
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#8a8276',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Handcrafted Metalwork · Dublin
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: '#5a554f',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Bespoke jewellery &amp; engravings
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#b5651d',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            idlehands.ie
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
