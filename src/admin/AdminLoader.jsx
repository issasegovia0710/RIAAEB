// frontend/src/admin/AdminLoader.jsx
import { Loader2 } from 'lucide-react';

/* Pantalla de carga consistente para todas las secciones del admin. */
export default function AdminLoader({ texto = 'Cargando…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface">
      <span className="relative grid h-14 w-14 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary-400/30" />
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary-500/10">
          <Loader2 size={26} className="animate-spin text-primary-500" />
        </span>
      </span>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">{texto}</p>
    </div>
  );
}
