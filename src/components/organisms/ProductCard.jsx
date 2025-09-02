import Card from "../layout/Card";
import Button from "../atoms/Button";
import Stars from "../atoms/Stars";
import { Link } from "react-router-dom";

export default function ProductCard({ img, name, price, rating = 0, onAdd, href }) {
  const imgSrc = img?.startsWith("/") ? img : img ? `/images/${img}` : null;
  return (
    <Card className="p-0">
      {href ? (
        <Link to={href} className="block">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-stone-100">
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
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-stone-100">
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
