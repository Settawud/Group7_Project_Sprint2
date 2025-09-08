import React, { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import Button from "../atoms/Button";

// Mock service (ในอนาคตจะเปลี่ยนให้ไป fetch จาก backend)
const fetchCoupons = async () => {
  // simulate fetch
  return [
    {
      id: 1,
      code: "SAVE100",
      description: "ลดทันที 100 บาท เมื่อสั่งครบ 1,000 บาท",
      expiry: "2025-12-31",
    },
    {
      id: 2,
      code: "FREESHIP",
      description: "ส่งฟรีทั่วประเทศ ไม่มีขั้นต่ำ",
      expiry: "2025-11-30",
    },
  ];
};

export default function UserCoupon() {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const loadCoupons = async () => {
      const data = await fetchCoupons();
      setCoupons(data);
    };
    loadCoupons();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code); // จำว่ารหัสไหนถูก copy ล่าสุด
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 pb-4 ">
        My Coupons
      </h2>

      {coupons.length === 0 ? (
        <p className="text-sm text-gray-500">คุณยังไม่มีคูปอง</p>
      ) : (
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="rounded-2xl shadow-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <p className="text-lg font-semibold text-[#B29674]">{coupon.code}</p>
                <p className="text-sm text-gray-700">{coupon.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ใช้ได้ถึง: {coupon.expiry}
                </p>
              </div>
              <div>
                <Button
                  onClick={() => handleCopy(coupon.code)}
                  className="flex items-center gap-1"
                >
                  <Copy size={16} />
                  {copiedCode === coupon.code ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
