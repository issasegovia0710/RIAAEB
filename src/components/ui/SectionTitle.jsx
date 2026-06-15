// frontend/src/components/ui/SectionTitle.jsx
export default function SectionTitle({ index, eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
        {index && <span className="text-primary-400/50">{index} — </span>}{eyebrow}
      </p>
      <h2 className="font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
