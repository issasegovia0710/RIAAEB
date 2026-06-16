// frontend/src/components/About.jsx
import { useEffect, useState } from 'react';
import { Target, Eye, Heart, Cpu, Stethoscope, Bot, Database } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import Spotlight from './ui/Spotlight.jsx';
import { getAbout } from '../lib/api.js';

const POR_DEFECTO = {
  titulo: 'Una red que investiga tecnología con propósito',
  subtitulo: 'Reunimos perfiles de distintas disciplinas para llevar el avance tecnológico a problemas reales de equidad y bienestar.',
  mision: 'Desarrollar y difundir avances tecnológicos que reduzcan desigualdades y mejoren el bienestar de las personas.',
  vision: 'Ser una red de referencia en tecnología responsable, donde la investigación se hace en abierto y en colaboración.',
  valores: 'Equidad, transparencia, rigor científico y compromiso con el impacto social positivo.',
  imagen_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
};

const CAMPOS = [
  { icon: Cpu, label: 'Inteligencia artificial' },
  { icon: Stethoscope, label: 'Salud y bienestar' },
  { icon: Bot, label: 'Robótica' },
  { icon: Database, label: 'Ciencia de datos' },
];

export default function About() {
  const [a, setA] = useState(POR_DEFECTO);

  useEffect(() => {
    getAbout().then((d) => { if (d) setA({ ...POR_DEFECTO, ...d }); }).catch(() => {});
  }, []);

  const PILARES = [
    { icon: Target, titulo: 'Misión', texto: a.mision },
    { icon: Eye, titulo: 'Visión', texto: a.vision },
    { icon: Heart, titulo: 'Valores', texto: a.valores },
  ];

  return (
    <section id="nosotros" className="relative overflow-hidden py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <Spotlight className="group relative overflow-hidden rounded-2xl border border-line shadow-card">
          <img
            src={a.imagen_url}
            alt="Equipo de investigación de la Red"
            className="h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary-400/20" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {CAMPOS.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-base/70 px-3 py-1 text-xs text-slate-200 backdrop-blur">
                <c.icon size={12} className="text-primary-300" /> {c.label}
              </span>
            ))}
          </div>
        </Spotlight>

        <div>
          <SectionTitle index="01" eyebrow="Quiénes somos" title={a.titulo} subtitle={a.subtitulo} />
          <div className="mt-8 space-y-4">
            {PILARES.map((p) => (
              <Spotlight
                key={p.titulo}
                className="group flex gap-4 rounded-xl border border-line bg-surface/60 p-5 transition-all duration-300 hover:border-primary-400/50 hover:shadow-[0_10px_40px_rgba(77,141,255,.15)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-400/10 text-primary-300 transition-all duration-300 group-hover:bg-primary-400 group-hover:text-base group-hover:shadow-[0_0_18px_rgba(56,225,255,.5)]">
                  <p.icon size={20} />
                </span>
                <div>
                  <p className="font-display font-700 text-white">{p.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.texto}</p>
                </div>
              </Spotlight>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
