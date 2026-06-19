// frontend/src/components/Investigaciones.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Globe, Calendar, Image as ImageIcon, Star } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getInvestigaciones } from '../lib/api.js';

/* ── Vista previa real de la página enlazada ──────────────────────────────
   Usa el servicio de captura de WordPress (mShots): no requiere API key y
   genera un screenshot de cualquier URL pública. La primera vez puede tardar
   unos segundos (mientras WordPress renderiza la captura), por eso mostramos
   un placeholder animado hasta que la imagen carga.                           */
function screenshotURL(url, w = 1200, h = 800) {
  if (!url) return '';
  const limpio = encodeURIComponent(url.trim());
  return `https://s.wordpress.com/mshots/v1/${limpio}?w=${w}&h=${h}`;
}

function hostDe(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return url; }
}

function Preview({ url }) {
  const src = useMemo(() => screenshotURL(url), [url]);
  const [estado, setEstado] = useState('cargando'); // cargando | listo | error
  const imgRef = useRef(null);

  // mShots a veces devuelve una imagen "en blanco" la primera vez; reintenta una vez.
  const [intentos, setIntentos] = useState(0);
  useEffect(() => { setEstado('cargando'); setIntentos(0); }, [src]);

  return (
    <div className="absolute inset-0">
      {/* Placeholder mientras genera/carga la captura */}
      {estado !== 'listo' && (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ImageIcon size={26} className={estado === 'error' ? '' : 'animate-pulse'} />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {estado === 'error' ? 'Vista previa no disponible' : 'Generando vista previa…'}
            </span>
          </div>
        </div>
      )}
      <img
        ref={imgRef}
        key={intentos}
        src={intentos === 0 ? src : `${src}&retry=${intentos}`}
        alt={`Vista previa de ${hostDe(url)}`}
        loading="lazy"
        onLoad={() => setEstado('listo')}
        onError={() => {
          if (intentos < 1) setIntentos((n) => n + 1);
          else setEstado('error');
        }}
        className={`h-full w-full object-cover object-top transition-all duration-[1200ms] ease-out
          ${estado === 'listo' ? 'scale-100 opacity-100 group-hover:scale-110' : 'scale-105 opacity-0'}`}
      />
    </div>
  );
}

function Tarjeta({ inv, i }) {
  return (
    <a
      href={inv.enlace}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${0.05 * i}s` }}
      className="group relative flex aspect-[3/4] animate-fade-up flex-col justify-end overflow-hidden rounded-3xl border border-line bg-slate-900 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift"
    >
      {/* Captura de la página como fondo */}
      <Preview url={inv.enlace} />

      {/* Degradado para legibilidad del texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 transition-opacity duration-500 group-hover:from-black/90" />

      {/* Aro rojo al hacer hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-2 group-hover:ring-primary-400/70" />

      {/* Etiqueta superior (tipo / año) */}
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur-md">
          <Globe size={12} /> {inv.tipo}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-red px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-md">
          <Calendar size={11} /> {inv.anio}
        </span>
      </div>

      {/* Contenido inferior */}
      <div className="relative z-10 p-5">
        <h3 className="font-display text-xl font-700 leading-snug text-white drop-shadow-sm">
          {inv.titulo}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">
          {inv.resumen}
        </p>

        {/* Fila inferior estilo tarjeta de referencia: chip + botón flotante */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex max-w-[60%] items-center gap-1.5 truncate rounded-full bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-md">
            <Star size={12} className="fill-primary-400 text-primary-400" />
            <span className="truncate">{inv.autores || hostDe(inv.enlace)}</span>
          </span>

          <span className="btn-shine inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-600 text-slate-900 shadow-lg transition-all duration-300 group-hover:bg-primary-400 group-hover:text-white">
            Visitar
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Investigaciones() {
  const [items, setItems] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    getInvestigaciones()
      .then((data) => { setItems(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  return (
    <section id="investigaciones" className="relative overflow-hidden border-t border-line bg-soft py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle
          index="02"
          eyebrow="Investigaciones"
          title="Investigaciones"
          subtitle="Explora nuestros estudios y proyectos. Cada tarjeta muestra una vista previa real de la página a la que enlaza."
        />

        <div className="mt-12">
          {estado === 'cargando' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl border border-line bg-white" />
              ))}
            </div>
          )}

          {estado === 'error' && (
            <p className="rounded-xl border border-primary-200 bg-primary-50 p-6 text-sm text-primary-700">
              No pudimos cargar las investigaciones. Verifica que el backend esté en ejecución.
            </p>
          )}

          {estado === 'listo' && (
            items.length === 0 ? (
              <p className="rounded-xl border border-line bg-white p-6 text-sm text-slate-500">
                Aún no hay investigaciones publicadas.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((inv, i) => <Tarjeta key={inv.id} inv={inv} i={i} />)}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
