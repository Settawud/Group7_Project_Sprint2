import React from 'react'
import Input from '../atoms/Input'

const UserDataForm = () => {
  return (
    // นี่คือ Root Node หรือแท็กหลักเพียงอันเดียว
    <div>
      <div>UserDataForm</div>
      <div className="space-y-4">
        {/* ชื่อ-นามสกุล */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อจริง</label>
            <input />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">นามสกุล</label>
            <input type="text" className="w-full px-4 py-3 border rounded-lg" />
          </div>
        </div>

        {/* อีเมล */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">อีเมล</label>
          <input type="email" className="w-full px-4 py-3 border rounded-lg" />
        </div>

        {/* เบอร์โทร */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">เบอร์โทรศัพท์</label>
          <input type="tel" className="w-full px-4 py-3 border rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default UserDataForm