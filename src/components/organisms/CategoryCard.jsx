import { Link } from "react-router-dom";

export default function CategoryCard({ title, subtitle, href = "#", imageSrc }) {
  return (
    <Link
      to={href}
      className="group block overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
    >
      {imageSrc ? (
        <div className="relative h-64">
          <img
            src={imageSrc.startsWith("/") ? imageSrc : `/images/${imageSrc}`}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-end">
            <h3 className="text-3xl font-semibold text-white drop-shadow">{title}</h3>
            {subtitle && (
              <p className="text-white/90 text-sm drop-shadow">{subtitle}</p>
            )}
            <span className="mt-2 text-sm text-white/90 group-hover:underline">
              View Products →
            </span>
          </div>
        </div>
      ) : (
        <div className="h-64 bg-gradient-to-b from-amber-300 to-stone-500/80 p-6 flex flex-col justify-end">
          <h3 className="text-3xl font-semibold text-stone-900/90">{title}</h3>
          {subtitle && <p className="text-stone-800/80 text-sm">{subtitle}</p>}
          <span className="mt-2 text-sm text-stone-900/80 group-hover:underline">View Products →</span>
        </div>
      )}
    </Link>
  );
}
