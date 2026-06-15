// frontend/src/components/Header.jsx
import { useEffect, useState } from 'react';
import { Menu, X, FlaskConical } from 'lucide-react';

const NAV = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#inicio');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const secciones = NAV.map((n) => document.querySelector(n.href)).filter(Boolean);
      const pos = window.scrollY + 120;
      let current = '#inicio';
      for (const sec of secciones) {
        if (sec.offsetTop <= pos) current = `#${sec.id}`;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-500 text-white">
            <FlaskConical size={18} />
          </span>
          <span className="font-display text-lg font-700 tracking-tight text-ink">INVESTIGADORES</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-500 transition-colors ${
                active === item.href ? 'text-primary-600' : 'text-slate-600 hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-600 text-white transition-all duration-300 hover:bg-primary-600 lg:inline-block"
        >
          Trabaja con nosotros
        </a>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-500 text-slate-700 hover:bg-primary-50 hover:text-primary-600"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
