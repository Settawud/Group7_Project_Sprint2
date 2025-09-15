import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { api } from "../lib/api";

export default function OrderconfirmPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data.item);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        alert("ไม่พบคำสั่งซื้อนี้ หรือคุณไม่ได้เข้าสู่ระบบ");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4 md:p-8">
        {/* Confirmation Message */}
        <section className="bg-yellow-50 text-yellow-800 p-4 rounded-md mx-auto mt-6 max-w-4xl shadow-sm text-center">
          <p className="text-xl font-semibold">ขอบคุณที่คุณช้อปปิ้งกับเรา!</p>
          <p className="font-bold text-yellow-900 text-xl">
            คำสั่งซื้อหมายเลข {order.orderNumber}
          </p>
        </section>

        {/* Main Content */}
        <main className="container mx-auto p-4 mt-8 flex flex-col md:flex-row gap-8 items-start flex-1">
          {/* Order Summary */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Order Summary
            </h2>

            {/* Products */}
            <div className="mb-6">
              <div className="grid grid-cols-[100px_1fr_auto] gap-6 items-center font-semibold text-gray-600 border-b-2 border-gray-300 pb-2">
                <div>สินค้า</div>
                <div>ชื่อสินค้า</div>
                <div className="text-right">ราคา</div>
              </div>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[100px_1fr_auto] gap-6 items-center my-3"
                >
                  {/* Image */}
                  <div className="bg-gray-100 rounded-lg p-2 shadow-sm">
                    <img
                      src={item.variant.image}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.productName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.variant.trial && (
                        <span className="text-amber-600 font-medium mr-2">
                          สินค้าทดลองใช้ (7 วัน)
                        </span>
                      )}
                      Color: {item.variant.variantOption}
                    </p>
                    <p className="text-sm text-gray-500">
                      จำนวน {item.variant.quantity} รายการ
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right font-semibold text-gray-700">
                    ฿{(item.variant.price * item.variant.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-gray-700 mb-6">
              <div className="flex justify-between">
                <span>ยอดรวมสินค้า</span>
                <span className="font-medium">
                  ฿{order.subtotalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ส่วนลด</span>
                <span className="font-medium text-red-600">
                  -฿{order.discountAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ค่าบริการประกอบสินค้า</span>
                <span className="font-medium">
                  ฿{order.installationFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span className="font-medium">฿0</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t-2 border-gray-300 pt-4">
              <span className="text-xl font-bold text-gray-800">
                รวมยอดชำระ
              </span>
              <span className="text-2xl font-extrabold text-black">
                ฿
                {(
                  order.subtotalAmount -
                  order.discountAmount +
                  order.installationFee
                ).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              ที่อยู่จัดส่ง
            </h2>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold text-lg mb-1">ชื่อผู้รับ</p>
                <p className="text-gray-800">{order.name}</p>
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">ที่อยู่</p>
                <p className="text-gray-800">
                  {order.shipping?.address || "ไม่พบที่อยู่"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">เบอร์โทรศัพท์</p>
                <p className="text-gray-800">{order.phone}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

