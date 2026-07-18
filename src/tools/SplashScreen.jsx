import { useEffect, useState } from 'react'

// Arcade attract-screen title, shown once on load. "1 PLAYER"/"2 PLAYER" are
// pure theming (this app has no multiplayer concept) but each maps to a real
// action via its subtitle, so the joke doesn't cost the user anything real —
// arrow keys move the selector like a real cabinet, Enter/click/tap confirms.
const PIXEL_FONT = "'Press Start 2P', monospace"

const OPTIONS = [
  { id: 'new',  label: '1 PLAYER', sub: 'New Project' },
  { id: 'open', label: '2 PLAYER', sub: 'Open Project' },
]

export default function SplashScreen({ onChoose }) {
  const [sel, setSel] = useState(0)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        setSel(s => (s + 1) % OPTIONS.length)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChoose(OPTIONS[sel].id)
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [sel, onChoose])

  return (
    <div
      onClick={() => onChoose(OPTIONS[sel].id)}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000, background: '#0d0d1a',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 48, cursor: 'pointer', userSelect: 'none',
      }}>

      <div style={{ fontFamily: PIXEL_FONT, fontSize: 32, lineHeight: 1.6, textAlign: 'center' }}>
        <div style={{ color: '#FF9800', textShadow: '0 0 10px #FF9800' }}>Retro</div>
        <div>
          <span style={{ color: '#eee' }}>CAD </span>
          <span style={{ color: '#00E5FF', textShadow: '0 0 12px #00E5FF, 0 0 24px #00E5FF88' }}>2D</span>
        </div>
      </div>

      <div className="retro-blink" style={{ fontFamily: PIXEL_FONT, fontSize: 16, color: '#fff', marginTop: -24 }}>
        PRESS START
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {OPTIONS.map((opt, i) => (
          <div key={opt.id}
            onClick={e => { e.stopPropagation(); onChoose(opt.id) }}
            onMouseEnter={() => setSel(i)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              fontFamily: PIXEL_FONT, fontSize: 18,
              color: sel === i ? '#FFEB3B' : '#666',
              textShadow: sel === i ? '0 0 8px #FFEB3B' : 'none',
              display: 'flex', alignItems: 'center', gap: 12,
              transition: 'color 0.15s',
            }}>
              <span className={sel === i ? 'retro-blink' : ''} style={{ opacity: sel === i ? 1 : 0 }}>▶</span>
              {opt.label}
            </div>
            <div style={{
              fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.05em',
              color: sel === i ? '#00E5FF' : '#3a3a4a',
            }}>
              {opt.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="retro-blink" style={{ fontFamily: 'monospace', fontSize: 9, color: '#555', letterSpacing: '0.05em' }}>
        click, tap, or press enter
      </div>
    </div>
  )
}
