export default function Section({ id, title, subtitle, actions, children, className = "" }) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          {title && <h2 className="text-2xl font-semibold text-stone-800">{title}</h2>}
          {subtitle && <p className="mt-1 text-stone-500">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
