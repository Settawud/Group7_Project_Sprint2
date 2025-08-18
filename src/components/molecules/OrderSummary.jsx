import CouponInput from "./CouponInput";

export default function OrderSummary({ items, coupon, setCoupon, onApplyCoupon }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = 200;
  const total = subtotal + shippingFee;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-gray-700 font-semibold">
            <th className="pb-2 text-left w-[80px]">สินค้า</th>
            <th className="pb-2 text-left">ชื่อสินค้า</th>
            <th className="pb-2 text-right w-[100px]">ราคา</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-2">
                <img src={item.image} alt={item.name} className="w-14 rounded-lg" />
              </td>
              <td className="py-2 align-top">
                {item.name}
                <div className="text-gray-500 text-xs">จำนวน {item.qty} รายการ</div>
              </td>
              <td className="py-2 text-right align-top">
                ฿{(item.price * item.qty).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <div className="flex justify-between">
          <span>ยอดรวมสินค้า</span>
          <span>฿{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>ค่าบริการประกอบสินค้า</span>
          <span>฿{shippingFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>ค่าจัดส่ง</span>
          <span>฿0.00</span>
        </div>
        <div className="flex justify-between">
          <span>ส่วนลด</span>
          <span>฿0.00</span>
        </div>
      </div>

      <CouponInput value={coupon} onChange={setCoupon} onApply={onApplyCoupon} />

      <div className="mt-4 flex justify-between font-bold text-lg text-gray-800">
        <span>รวมยอดชำระ:</span>
        <span className="text-amber-600">฿{total.toLocaleString()}</span>
      </div>

      <button className="mt-4 w-full py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition">
        ชำระเงิน
      </button>
    </div>
  );
}
