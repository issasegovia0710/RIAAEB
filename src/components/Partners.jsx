// frontend/src/components/Partners.jsx
const ALIADOS = [
  'Universidad Nacional', 'Centro de Datos Abiertos', 'Instituto de Cómputo',
  'Red de Investigación', 'Consejo de Ciencia', 'Laboratorio Regional',
];

export default function Partners() {
  return (
    <section className="border-y border-slate-100 bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          Colaboramos con instituciones y aliados
        </p>
        <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {ALIADOS.map((nombre) => (
            <div
              key={nombre}
              className="text-center font-display text-sm font-600 text-slate-300 grayscale transition-all duration-300 hover:text-primary-600 hover:grayscale-0"
            >
              {nombre}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
