import Card from "../layout/Card";
import Button from "../atoms/Button";
import Stars from "../atoms/Stars";

export default function ProductCard({ img, name, price, rating = 0, onAdd }) {
  return (
    <Card className="p-0">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-stone-100" />
      <div className="p-4 space-y-1">
        <h4 className="font-medium">{name}</h4>
        <Stars value={rating} />
        <div className="flex items-center justify-between pt-2">
          <div className="font-semibold text-stone-800 mr-2">฿{price?.toLocaleString?.() ?? price}</div>
          <Button onClick={onAdd}>หยิบใส่ตะกร้า</Button>
        </div>
      </div>
    </Card>
  );
}
