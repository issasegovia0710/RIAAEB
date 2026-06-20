// frontend/src/components/ui/NewsModal.jsx
import { useEffect } from 'react';
import { X, Calendar, Tag } from 'lucide-react';

function formatoFecha(fecha) {
  try {
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return fecha; }
}

/* Modal con la información completa de una noticia (sin imágenes). */
export default function NewsModal({ noticia, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!noticia) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="animate-overlay-in absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-modal-in relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
        {/* franja superior roja */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-primary-400" />
        <div className="max-h-[78vh] overflow-y-auto p-7">
          <button onClick={onClose} aria-label="Cerrar"
            className="absolute right-4 top-5 grid h-9 w-9 place-items-center rounded-lg border border-line bg-soft text-slate-500 transition-colors hover:border-primary-400 hover:text-primary-600">
            <X size={18} />
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
              <Tag size={11} /> {noticia.categoria}
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <Calendar size={12} /> {formatoFecha(noticia.fecha)}
            </span>
          </div>

          <h2 className="mt-4 font-display text-2xl font-700 leading-tight text-ink">{noticia.titulo}</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-500">{noticia.extracto}</p>

          {noticia.contenido && (
            <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm leading-relaxed text-slate-600">
              {String(noticia.contenido).split('\n').filter(Boolean).map((parr, i) => (
                <p key={i}>{parr}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
