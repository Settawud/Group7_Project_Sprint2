import React from "react";
import chair from "../assets/chair.jpg";
import table from "../assets/table.jpg";
import Navbar from "../components/organisms/Navbar";
import Container from "../components/layout/Container";
import Footer from "../components/organisms/Footer";
const Orderconfirm = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-4 md:p-8">
        {/* Confirmation Message Section */}
        <section className="bg-yellow-50 text-yellow-800 p-4 rounded-md mx-auto mt-6 max-w-4xl shadow-sm text-center">
          <p className="text-xl font-semibold">ขอบคุณที่คุณช้อปปิ้งกับเรา!</p>
          <p className="font-bold text-yellow-900 text-xl">คำสั่งซื้อหมายเลข</p>
        </section>

        {/* Main content area with Order Summary and Shipping Address */}
        <main className="container mx-auto p-4 mt-8 flex flex-col md:flex-row gap-8 items-start flex-1">
          {/* Order Summary Card */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Order Summary
            </h2>

            {/* Product Items List */}
            <div className="mb-6">
              {/* Header for the product list using a responsive grid */}
              <div className="grid grid-cols-[100px_1fr_auto] gap-6 items-center font-semibold text-gray-600 border-b-2 border-gray-300 pb-2">
                <div>สินค้า</div>
                <div>ชื่อสินค้า</div>
                <div className="text-right">ราคา</div>
              </div>

              {/* First Product Item */}
              <div className="grid grid-cols-[100px_1fr_auto] gap-6 items-center my-3">
                {/* Image wrapper */}
                <div className="bg-gray-100 rounded-lg p-2 shadow-sm">
                  <img
                    src={chair}
                    alt="เก้าอี้พักผ่อน รุ่น 'เอนกาย'"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                {/* Details column */}
                <div>
                  <p className="font-medium text-gray-800">
                    เก้าอี้พักผ่อน รุ่น 'เอนกาย'
                  </p>
                  <p className="text-sm text-gray-500">จำนวน 1 รายการ</p>
                </div>
                {/* Price column */}
                <div className="text-right font-semibold text-gray-700">
                  ฿800.00
                </div>
              </div>

              {/* Second Product Item */}
              <div className="grid grid-cols-[100px_1fr_auto] gap-6 items-center my-3">
                {/* Image wrapper */}
                <div className="bg-gray-100 rounded-lg p-2 shadow-sm">
                  <img
                    src={table}
                    alt="โต๊ะทำงานไม้สไตล์มินิมอล"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                {/* Details column */}
                <div>
                  <p className="font-medium text-gray-800">
                    โต๊ะทำงานไม้สไตล์มินิมอล
                  </p>
                  <p className="text-sm text-gray-500">จำนวน 2 รายการ</p>
                </div>
                {/* Price column */}
                <div className="text-right font-semibold text-gray-700">
                  ฿5,198.00
                </div>
              </div>
            </div>

            {/* Price breakdown section */}
            <div className="space-y-2 text-gray-700 mb-6">
              <div className="flex justify-between">
                <span>ยอดรวมสินค้า</span>
                <span className="font-medium">฿5998.00</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าบริการประกอบสินค้า</span>
                <span className="font-medium">฿200.00</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span className="font-medium">฿00.00</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-center border-t-2 border-gray-300 pt-4">
              <span className="text-xl font-bold text-gray-800">
                รวมยอดชำระ
              </span>
              <span className="text-2xl font-extrabold text-black">
                ฿6198.00
              </span>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              ที่อยู่จัดส่ง
            </h2>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold text-lg mb-1">ชื่อผู้รับ</p>
                <p className="text-gray-800">jane smith</p>
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">ที่อยู่</p>
                <p className="text-gray-800">
                  456 Oak St #3B, San Francisco, CA 94102, United States
                </p>
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">เบอร์โทรศัพท์</p>
                <p className="text-gray-800">+66-1234-1234</p>
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">อีเมล</p>
                <p className="text-gray-800">jane.smith@email.com</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Orderconfirm;
