import Button from "../atoms/Button";

export default function CouponInput({ value, onChange, onApply }) {
  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="กรอกโค้ดส่วนลด"
        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
      />
      <Button onClick={onApply} className="px-4">
        ใช้โค้ด
      </Button>
    </div>
  );
}
