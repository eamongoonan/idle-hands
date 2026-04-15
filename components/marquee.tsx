const ITEMS = [
  'FORGE',
  'WELD',
  'GRIND',
  'ETCH',
  'CAST',
  'SHAPE',
  'TEMPER',
  'FINISH',
  'BESPOKE',
  'DUBLIN',
  'METALWORK',
  'HANDCRAFTED',
  'STEEL',
  'COPPER',
  'BRASS',
]

export default function Marquee() {
  // Duplicate for seamless infinite loop
  const track = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{
        backgroundColor: 'var(--soot)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="marquee-track">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-cinzel text-[0.6rem] tracking-[0.35em] uppercase whitespace-nowrap"
            style={{ color: 'var(--ash)', padding: '0 2rem' }}
          >
            {item}
            <span style={{ color: 'var(--accent)', marginLeft: '2rem' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
