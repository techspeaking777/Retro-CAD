import { useEffect, useState } from 'react'

// Arcade-style attract screen shown once on load. 1 PLAYER / 2 PLAYER are pure
// flavor — both just start the same app, like a coin-op cabinet's title screen.
export default function SplashScreen({ onStart }){
  const [selected, setSelected] = useState(0) // 0 = 1 PLAYER, 1 = 2 PLAYER

  useEffect(()=>{
    const onKey = e => {
      if (e.key==='ArrowUp'||e.key==='ArrowDown') setSelected(p=>p===0?1:0)
      else if (e.key==='Enter'||e.key===' ') onStart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onStart])

  const font = "'Press Start 2P', monospace"
  const options = ['1 PLAYER', '2 PLAYER']

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:2000,
      background:'#0d0d1a',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      gap:48, userSelect:'none', cursor:'pointer', fontFamily:font,
    }} onClick={onStart}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10}}>
        <span style={{fontSize:34, color:'#FF9800', textShadow:'0 0 14px #FF9800aa'}}>Retro</span>
        <div style={{display:'flex', gap:14}}>
          <span style={{fontSize:34, color:'#eee'}}>CAD</span>
          <span style={{fontSize:34, color:'#00E5FF', textShadow:'0 0 14px #00E5FFaa'}}>2D</span>
        </div>
      </div>

      <div className="retro-blink" style={{fontSize:16, color:'#fff'}}>PRESS START</div>

      <div style={{display:'flex', flexDirection:'column', gap:20, fontSize:14}}>
        {options.map((label,i)=>(
          <div key={label} style={{display:'flex', alignItems:'center', gap:12,
            color: selected===i ? '#FFEB3B' : '#666'}}
            onMouseEnter={()=>setSelected(i)}
            onClick={e=>{e.stopPropagation(); onStart()}}>
            <span style={{opacity: selected===i?1:0, width:14}}>▶</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div style={{fontSize:9, color:'#555', marginTop:8}}>click, tap, or press enter</div>
    </div>
  )
}
