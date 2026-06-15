// frontend/src/components/ui/SectionTitle.jsx
export default function SectionTitle({ index, eyebrow, title, subtitle, light = false, center = false }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl`}>
      <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-4 ${light ? 'text-primary-300' : 'text-primary-500'}`}>
        {index && <span className="opacity-60">{index} — </span>}{eyebrow}
      </p>
      <h2 className={`font-display text-3xl sm:text-4xl font-700 leading-tight ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-primary-100/80' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
