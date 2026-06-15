// frontend/src/components/Gallery.jsx
import { ZoomIn } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';

const IMAGENES = [
  { url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80', alt: 'Trabajo en laboratorio', span: 'lg:row-span-2' },
  { url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80', alt: 'Microscopía y muestras', span: '' },
  { url: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?auto=format&fit=crop&w=800&q=80', alt: 'Análisis de datos en pantalla', span: '' },
  { url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80', alt: 'Discusión frente a pizarra', span: 'lg:col-span-2' },
  { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80', alt: 'Presentación de resultados', span: '' },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="06"
          eyebrow="Galería"
          title="El equipo en acción"
          subtitle="Una mirada al día a día de nuestra investigación: laboratorio, campo, análisis y difusión."
        />

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3">
          {IMAGENES.map((img) => (
            <figure
              key={img.url}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 ${img.span}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm font-500 text-white">
                  <ZoomIn size={15} /> {img.alt}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
