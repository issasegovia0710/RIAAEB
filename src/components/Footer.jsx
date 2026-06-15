// frontend/src/components/Footer.jsx
import { useState } from 'react';
import { FlaskConical, Twitter, Linkedin, Github, Send } from 'lucide-react';

const RAPIDOS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Noticias', href: '#noticias' },
];
const RECURSOS = [
  { label: 'Publicaciones', href: '#noticias' },
  { label: 'Datos abiertos', href: '#noticias' },
  { label: 'Repositorio', href: '#noticias' },
  { label: 'Mentoría', href: '#noticias' },
];

export default function Footer() {
  const [correo, setCorreo] = useState('');
  const [suscrito, setSuscrito] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (correo.includes('@')) {
      setSuscrito(true);
      setCorreo('');
    }
  };

  return (
    <footer className="bg-primary-950 text-primary-100/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-500 text-white">
                <FlaskConical size={18} />
              </span>
              <span className="font-display text-lg font-700 text-white">INVESTIGADORES</span>
            </div>
            <p className="text-sm leading-relaxed">
              Equipo de investigación dedicado a producir y difundir conocimiento con datos abiertos y métodos reproducibles.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" aria-label="Red social" className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-primary-200 transition-colors hover:bg-primary-500 hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              {RAPIDOS.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Recursos</h4>
            <ul className="space-y-2.5 text-sm">
              {RECURSOS.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-white">Boletín</h4>
            <p className="mb-3 text-sm">Recibe nuestras publicaciones más recientes.</p>
            {suscrito ? (
              <p className="rounded-lg bg-primary-500/20 px-4 py-3 text-sm text-primary-100">¡Gracias por suscribirte!</p>
            ) : (
              <form onSubmit={onSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-primary-200/40 outline-none focus:border-primary-400"
                />
                <button type="submit" aria-label="Suscribirse" className="grid h-[42px] w-11 shrink-0 place-items-center rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-400">
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} INVESTIGADORES. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Aviso de privacidad</a>
            <a href="#" className="hover:text-white">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
