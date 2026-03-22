// CourseBanner — shown at the top of each product parent page.
// Placeholder until courses are live; then replace content with real course data.

interface CourseBannerProps {
  productName: string
}

export default function CourseBanner({ productName }: CourseBannerProps) {
  return (
    <div style={{
      margin: '48px 0 0',
      padding: '1px',
      borderRadius: 20,
      background: 'linear-gradient(135deg, rgba(155,142,212,0.35) 0%, rgba(255,255,255,0.06) 50%, rgba(155,142,212,0.18) 100%)',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #181b1e 0%, #0f1012 60%, #0c0d0e 100%)',
        borderRadius: 19,
        padding: '36px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 32, flexWrap: 'wrap',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(155,142,212,0.6), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#9B8ED4', margin: '0 0 10px',
          }}>
            Course — Being Built
          </p>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            color: '#E8E4DC', margin: '0 0 10px', lineHeight: 1.2,
          }}>
            {productName} — Start to Finish
          </h3>
          <p style={{
            fontSize: 13, color: 'rgba(232,228,220,0.45)',
            margin: 0, lineHeight: 1.8, maxWidth: 460,
          }}>
            A guided course that walks you through setting up your {productName} system, shows you what else connects to it, and helps you build the habit of using it.
          </p>
        </div>

        <span style={{
          padding: '10px 22px', borderRadius: 100,
          background: 'rgba(155,142,212,0.1)', border: '1px solid rgba(155,142,212,0.3)',
          color: '#9B8ED4', fontSize: 12, fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Coming Soon
        </span>
      </div>
    </div>
  )
}
