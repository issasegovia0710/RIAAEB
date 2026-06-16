// frontend/src/components/ui/Spotlight.jsx
// Envoltura que crea un foco de luz siguiendo al cursor sobre la tarjeta.
export default function Spotlight({ children, className = '', as: Tag = 'div', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <Tag onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
