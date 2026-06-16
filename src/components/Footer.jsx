// frontend/src/components/Footer.jsx
import { useState } from 'react';
import { Twitter, Linkedin, Github, Send, FileText, Users, Handshake, Database } from 'lucide-react';
import LogoMark from './ui/LogoMark.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';

const NAV = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Investigaciones', href: '#investigaciones' },
  { label: 'Investigadores', href: '#investigadores' },
];
const RECURSOS = [
  { label: 'Publicaciones', href: '#investigaciones' },
  { label: 'Datos abiertos', href: '#investigaciones' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Convocatorias', href: '#noticias' },
];
const CIFRAS = [
  { icon: FileText, valor: '30+', label: 'Investigaciones' },
  { icon: Users, valor: '15', label: 'Investigadores' },
  { icon: Handshake, valor: '12', label: 'Alianzas' },
  { icon: Database, valor: '8', label: 'Datos abiertos' },
];

export default function Footer() {
  const [correo, setCorreo] = useState('');
  const [suscrito, setSuscrito] = useState(false);
  const { open } = useContactModal();

  const onSubscribe = (e) => {
    e.preventDefault();
    if (correo.includes('@')) { setSuscrito(true); setCorreo(''); }
  };

  return (
    <footer className="border-t border-line bg-base">
      {/* Cifras (movidas aquí) */}
      <div className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 lg:grid-cols-4">
          {CIFRAS.map((c) => (
            <div key={c.label} className="group flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-400/10 text-primary-300 transition-all duration-300 group-hover:bg-primary-400 group-hover:text-base group-hover:shadow-[0_0_18px_rgba(56,225,255,.5)]">
                <c.icon size={18} />
              </span>
              <div>
                <p className="font-display text-2xl font-700 text-white">{c.valor}</p>
                <p className="text-xs text-slate-400">{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <LogoMark size={34} />
              <span className="font-display text-lg font-700 tracking-[0.04em] text-white">RIA<span className="text-primary-400">AEB</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Red de Inteligencia Artificial Aplicada para la Equidad y el Bienestar.
              Avance tecnológico con impacto social, datos abiertos y métodos reproducibles.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" aria-label="Red social"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface/60 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV.map((l) => <li key={l.label}><a href={l.href} className="text-slate-400 transition-colors hover:text-white">{l.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Recursos</h4>
            <ul className="space-y-2.5 text-sm">
              {RECURSOS.map((l) => <li key={l.label}><a href={l.href} className="text-slate-400 transition-colors hover:text-white">{l.label}</a></li>)}
            </ul>
            <button onClick={open} className="mt-4 text-sm font-600 text-primary-400 hover:text-primary-300">Contáctanos →</button>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Boletín</h4>
            <p className="mb-3 text-sm text-slate-400">Recibe nuestras publicaciones más recientes.</p>
            {suscrito ? (
              <p className="rounded-lg bg-primary-400/15 px-4 py-3 text-sm text-primary-200">¡Gracias por suscribirte!</p>
            ) : (
              <form onSubmit={onSubscribe} className="flex gap-2">
                <input
                  type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="tu@correo.com"
                  className="w-full rounded-lg border border-line bg-surface/60 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-primary-400"
                />
                <button type="submit" aria-label="Suscribirse"
                  className="grid h-[42px] w-11 shrink-0 place-items-center rounded-lg bg-primary-400 text-base transition-colors hover:bg-primary-300">
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} RIAAEB — Red de IA Aplicada para la Equidad y el Bienestar.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Aviso de privacidad</a>
            <a href="#" className="hover:text-white">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
