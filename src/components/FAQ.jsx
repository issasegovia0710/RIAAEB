// frontend/src/components/FAQ.jsx
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';

const PREGUNTAS = [
  {
    q: '¿Puedo acceder a los datos y al código de sus investigaciones?',
    a: 'Sí. Trabajamos bajo principios de ciencia abierta: publicamos nuestros conjuntos de datos anonimizados y el código en repositorios públicos siempre que las consideraciones éticas y legales lo permiten.',
  },
  {
    q: '¿Cómo puedo colaborar o proponer un proyecto?',
    a: 'Puedes escribirnos a través del formulario de contacto describiendo tu idea o área de interés. Revisamos las propuestas y agendamos una reunión para explorar posibles colaboraciones.',
  },
  {
    q: '¿Ofrecen estancias o programas de mentoría para estudiantes?',
    a: 'Contamos con un programa de mentoría para estudiantes de licenciatura y posgrado. Las convocatorias se anuncian en la sección de noticias a lo largo del año.',
  },
  {
    q: '¿Realizan investigación por encargo para empresas o gobierno?',
    a: 'Sí. Ofrecemos servicios de investigación aplicada, análisis de datos y transferencia de conocimiento mediante convenios. Contáctanos para conocer los detalles.',
  },
  {
    q: '¿Cómo cito una de sus publicaciones?',
    a: 'Cada publicación incluye su referencia completa y, cuando aplica, un identificador DOI. Puedes solicitarnos la cita en el formato que necesites a través del formulario.',
  },
];

export default function FAQ() {
  const [abierto, setAbierto] = useState(0);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle index="07" eyebrow="Preguntas frecuentes" title="Lo que suelen preguntarnos" center />

        <div className="mt-12 space-y-3">
          {PREGUNTAS.map((item, i) => {
            const activo = abierto === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300"
              >
                <button
                  onClick={() => setAbierto(activo ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={activo}
                >
                  <span className="font-600 text-ink">{item.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600">
                    {activo ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    activo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
