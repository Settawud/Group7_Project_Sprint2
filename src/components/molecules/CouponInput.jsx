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
      <button
        onClick={onApply}
        className="px-5 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition"
      >
        ใช้โค้ด
      </button>
    </div>
  );
}
