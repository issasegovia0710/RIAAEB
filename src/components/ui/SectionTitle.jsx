// frontend/src/components/ui/SectionTitle.jsx
export default function SectionTitle({ index, eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-500">
        <span className="h-px w-6 bg-primary-400" />
        {index && <span className="text-primary-400/60">{index} —</span>}{eyebrow}
      </p>
      <h2 className="font-display text-3xl font-700 leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
