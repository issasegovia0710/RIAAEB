// frontend/src/components/ui/AICore.jsx
// Núcleo tecnológico animado: anillos en rotación, órbitas con partículas y pulso central.
export default function AICore() {
  const orbit = (r, count, dur, rev = false) =>
    Array.from({ length: count }).map((_, i) => {
      const a = (i / count) * Math.PI * 2;
      return { cx: 130 + r * Math.cos(a), cy: 130 + r * Math.sin(a), dur, rev };
    });

  const particles = [...orbit(58, 3, '7s'), ...orbit(86, 4, '11s', true), ...orbit(110, 5, '16s')];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px] animate-floaty">
      {/* halo difuso */}
      <div className="absolute inset-8 rounded-full bg-primary-500/20 blur-3xl" />
      <svg viewBox="0 0 260 260" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb3bd" />
            <stop offset="45%" stopColor="#ff5a6e" />
            <stop offset="100%" stopColor="#c30f2b" />
          </radialGradient>
        </defs>

        {/* anillos */}
        {[58, 86, 110].map((r, i) => (
          <g key={r} style={{ transformOrigin: '130px 130px' }}
             className={i % 2 ? 'animate-spin-rev' : 'animate-spin-slow'}>
            <circle cx="130" cy="130" r={r} fill="none"
              stroke={i === 1 ? '#ff5a6e' : '#e11d3a'}
              strokeOpacity={0.5 - i * 0.08} strokeWidth="1"
              strokeDasharray={i === 1 ? '4 8' : '2 10'} />
          </g>
        ))}

        {/* arcos decorativos */}
        <g style={{ transformOrigin: '130px 130px' }} className="animate-spin-slow">
          <path d="M130 8 A122 122 0 0 1 252 130" fill="none" stroke="#ff5a6e" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M130 252 A122 122 0 0 1 8 130" fill="none" stroke="#e11d3a" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* partículas en órbita */}
        {particles.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="2.6" fill="#ff8a98"
            style={{ transformOrigin: '130px 130px' }}
            className={p.rev ? 'animate-spin-rev' : 'animate-spin-slow'}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* núcleo: el LOGO del sitio (escudo de red neuronal) animado */}
        <g style={{ transformOrigin: '130px 130px' }}>
          {/* halo pulsante detrás del logo */}
          <circle cx="130" cy="130" r="34" fill="none" stroke="#ff5a6e" strokeOpacity="0.4">
            <animate attributeName="r" values="30;54;30" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
          </circle>

          {/* escudo con leve balanceo */}
          <g style={{ transformOrigin: '130px 130px' }}>
            <animateTransform attributeName="transform" type="rotate"
              values="-4 130 130; 4 130 130; -4 130 130" dur="6s" repeatCount="indefinite" />
            {/* fondo del escudo */}
            <path d="M130 96 L154 109 L154 131 Q154 152 130 162 Q106 152 106 131 L106 109 Z"
              fill="url(#core)" stroke="#ff8a98" strokeWidth="1.2" />
            {/* conexiones internas */}
            <g stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none">
              <path d="M130 96 L130 128 M106 109 L130 128 L154 109 M106 131 L130 128 L154 131 M130 128 L130 162" />
            </g>
            {/* nodos */}
            <g fill="#ffffff">
              <circle cx="130" cy="96" r="3" />
              <circle cx="154" cy="109" r="2.6" />
              <circle cx="154" cy="131" r="2.6" />
              <circle cx="106" cy="109" r="2.6" />
              <circle cx="106" cy="131" r="2.6" />
              <circle cx="130" cy="162" r="3" />
            </g>
          </g>

          {/* núcleo-corazón pulsante */}
          <circle cx="130" cy="128" r="7" fill="#ffffff">
            <animate attributeName="r" values="6;8.5;6" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="130" cy="128" r="3.4" fill="#e11d3a">
            <animate attributeName="r" values="3;4.4;3" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
