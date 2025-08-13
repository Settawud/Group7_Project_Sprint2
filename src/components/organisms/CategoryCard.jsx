export default function CategoryCard({ title, subtitle, href }) {
  return (
    <a href={href} className="group block overflow-hidden rounded-2xl shadow hover:shadow-lg transition">
      <div className="h-64 bg-gradient-to-b from-amber-300 to-stone-500/80 p-6 flex flex-col justify-end">
        <h3 className="text-3xl font-semibold text-stone-900/90">{title}</h3>
        {subtitle && <p className="text-stone-800/80 text-sm">{subtitle}</p>}
        <span className="mt-2 text-sm text-stone-900/80 group-hover:underline">ดูสินค้า →</span>
      </div>
    </a>
  );
}
