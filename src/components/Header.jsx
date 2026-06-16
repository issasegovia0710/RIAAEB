// frontend/src/components/Header.jsx
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import LogoMark from './ui/LogoMark.jsx';
import { useContactModal } from '../context/ContactModalContext.jsx';

const NAV = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Investigaciones', href: '#investigaciones' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Investigadores', href: '#investigadores' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#inicio');
  const { open: abrirContacto } = useContactModal();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const secciones = NAV.map((n) => document.querySelector(n.href)).filter(Boolean);
      const pos = window.scrollY + 120;
      let current = '#inicio';
      for (const sec of secciones) if (sec.offsetTop <= pos) current = `#${sec.id}`;
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-line bg-base/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="group flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-lg font-700 leading-none tracking-[0.04em] text-white">
            RIA<span className="text-primary-400">AEB</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}
              className={`text-sm font-500 transition-colors ${active === item.href ? 'text-primary-400' : 'text-slate-400 hover:text-white'}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          onClick={abrirContacto}
          className="btn-shine hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-5 py-2.5 text-sm font-600 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(56,225,255,.4)] lg:inline-block"
        >
          Súmate a la Red
        </button>

        <button className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Abrir menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`overflow-hidden border-t border-line bg-base/95 backdrop-blur-md transition-all duration-300 lg:hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-500 text-slate-300 hover:bg-primary-900/60 hover:text-white">
              {item.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); abrirContacto(); }}
            className="mt-2 rounded-lg bg-primary-400 px-3 py-2.5 text-left text-sm font-600 text-base">
            Súmate a la Red
          </button>
        </nav>
      </div>
    </header>
  );
}
