import Card from "../layout/Card";
import Button from "../atoms/Button";
import Stars from "../atoms/Stars";
import { Link } from "react-router-dom";

function normalizePublicImage(img) {
  if (!img) return null;
  const s = String(img);
  if (/^https?:\/\//i.test(s)) return s;
  let cleaned = s.replace(/^\.\/+/, ""); // drop leading ./
  if (cleaned.startsWith("/images/")) return cleaned;
  if (cleaned.startsWith("images/")) return "/" + cleaned;
  // if path includes images/ somewhere, take from images/ onward
  const idx = cleaned.indexOf("images/");
  if (idx >= 0) return "/" + cleaned.slice(idx);
  // otherwise assume it's a filename
  const base = cleaned.split("/").pop();
  return `/images/${base}`;
}

export default function ProductCard({ img, name, price, rating = 0, onAdd, href }) {
  const imgSrc = normalizePublicImage(img);
  return (
    <Card className="p-0 ring-1 ring-black/5 hover:shadow-md transition">
      {href ? (
        <Link to={href} className="block">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-stone-100 shadow-sm">
            {imgSrc && (
              <img
                src={imgSrc}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            )}
          </div>
        </Link>
      ) : (
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-stone-100 shadow-sm">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      )}
      <div className="p-4 space-y-1">
        {href ? (
          <Link to={href} className="block">
            <h4
              className="font-medium leading-tight line-clamp-2 min-h-[2.75rem] hover:underline"
              title={name}
            >
              {name}
            </h4>
          </Link>
        ) : (
          <h4
            className="font-medium leading-tight line-clamp-2 min-h-[2.75rem]"
            title={name}
          >
            {name}
          </h4>
        )}
        <Stars value={rating} />
        <div className="flex items-center justify-between pt-2">
          <div className="font-semibold text-stone-800 mr-2">฿{price?.toLocaleString?.() ?? price}</div>
          <Button onClick={onAdd}>add to cart</Button>
        </div>
      </div>
    </Card>
  );
}
