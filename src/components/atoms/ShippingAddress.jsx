export default function ShippingAddress({ name, address, phone, email }) {
  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ที่อยู่จัดส่ง
      </h2>
      <div className="space-y-4 text-gray-700">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <p className="font-semibold text-lg">ชื่อผู้รับ</p>
          <p className="text-gray-800">{name}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <p className="font-semibold text-lg">ที่อยู่</p>
          <p className="text-gray-800">{address}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <p className="font-semibold text-lg">เบอร์โทรศัพท์</p>
          <p className="text-gray-800">{phone}</p>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <p className="font-semibold text-lg">อีเมล</p>
          <p className="text-gray-800">{email}</p>
        </div>
      </div>
    </div>
  );
}
