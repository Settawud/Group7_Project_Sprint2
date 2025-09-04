import React, { useState } from "react";
import ContactForm from "../components/molecules/ContactForm";
// import PaymentMethod from "../components/molecules/PaymentMethod";
import OrderSummary from "../components/molecules/OrderSummary";
import UserAddress from "../components/organisms/UserAddress";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";

export default function CheckoutPage() {
  const [contact, setContact] = useState("");
  // const [payment, setPayment] = useState("VISA");
  const [coupon, setCoupon] = useState("");

  const items = [
    { name: "เก้าอี้พักผ่อน รุ่น 'เอสกาย'", qty: 1, price: 800, image: "https://via.placeholder.com/80" },
    { name: "โต๊ะทำงานไม้สไตล์มินิมอล", qty: 2, price: 2599, image: "https://via.placeholder.com/80" },
  ];

  const handleApplyCoupon = () => {
    alert(`ใช้โค้ด: ${coupon}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
        <Navbar/>
    <main className="flex-1">
        <h1 className="p-4 text-center">รายละเอียดการจัดส่งสินค้าและสรุปคำสั่งซื้อ</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left side */}
        <div className="space-y-4">
          <ContactForm value={contact} onChange={setContact} />
          <UserAddress/>
          {/* <ShippingAddress
            address="54 หมู่บ้าน A แขวงคลองต้นไทร เขตคลองสาน กทม. 10600"
            onEdit={() => alert("แก้ไขที่อยู่")}
          /> */}
          {/* <PaymentMethod selected={payment} onChange={setPayment} /> */}
        </div>

        {/* Right side */}
        <OrderSummary
          items={items}
          coupon={coupon}
          setCoupon={setCoupon}
          onApplyCoupon={handleApplyCoupon}
        />
      </div>
    </main>
    <Footer />
    </div>
  );
}
