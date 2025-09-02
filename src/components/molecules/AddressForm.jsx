// import React, { useState, useEffect } from "react";
// import Button from "../atoms/Button";

// export default function AddressForm({ onSave, editData, editIndex }) {
//   const [form, setForm] = useState({
//     building: "",
//     detail: "",
//     province: "",
//     district: "",
//     subDistrict: "",
//     postalCode: "",
//   });

//   const provinces = ["กรุงเทพมหานคร", "กำแพงเพชร", "เชียงใหม่"];
//   const districts = ["คลองสาน", "ขาณุวรลักษบุรี", "เมืองเชียงใหม่"];
//   const subDistricts = ["คลองต้นไทร", "ดอนแตง", "สุเทพ"];

//   // โหลดค่า editData ถ้ามี
//   useEffect(() => {
//     if (editData) {
//       setForm(editData);
//     } else {
//       setForm({
//         building: "",
//         detail: "",
//         province: "",
//         district: "",
//         subDistrict: "",
//         postalCode: "",
//       });
//     }
//   }, [editData]);

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = () => {
//     // validate minimal fields
//     if (!form.building || !form.province || !form.postalCode) {
//       alert("กรุณากรอกข้อมูลให้ครบถ้วน");
//       return;
//     }

//     const fullAddress = `${form.building} ${form.detail} ${form.subDistrict} ${form.district} ${form.province} ${form.postalCode}`;
//     onSave(form, editIndex); // ส่ง object form กลับไปด้วย
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
//       {/* Header */}
//       <h3 className="text-lg font-semibold text-gray-800 mb-5">
//         {editData ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
//       </h3>

//       {/* Form Fields */}
//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="เลขที่อาคาร"
//           value={form.building}
//           onChange={(e) => handleChange("building", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
//         />

//         <input
//           type="text"
//           placeholder="อาคาร ซอย ถนน และรายละเอียดอื่นๆ"
//           value={form.detail}
//           onChange={(e) => handleChange("detail", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
//         />

//         {/* Select fields in grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           <select
//             value={form.province}
//             onChange={(e) => handleChange("province", e.target.value)}
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
//           >
//             <option value="">จังหวัด</option>
//             {provinces.map((p, i) => (
//               <option key={i} value={p}>{p}</option>
//             ))}
//           </select>

//           <select
//             value={form.district}
//             onChange={(e) => handleChange("district", e.target.value)}
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
//           >
//             <option value="">อำเภอ</option>
//             {districts.map((d, i) => (
//               <option key={i} value={d}>{d}</option>
//             ))}
//           </select>

//           <select
//             value={form.subDistrict}
//             onChange={(e) => handleChange("subDistrict", e.target.value)}
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
//           >
//             <option value="">ตำบล</option>
//             {subDistricts.map((s, i) => (
//               <option key={i} value={s}>{s}</option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="รหัสไปรษณีย์"
//           value={form.postalCode}
//           onChange={(e) => handleChange("postalCode", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
//         />
//       </div>

//       {/* Action */}
//       <div className="flex justify-end mt-6">
//         <Button 
//         onClick={handleSubmit} 
//         className="px-4">{editData ? "อัปเดต" : "บันทึก"}
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Button from "../atoms/Button";

export default function AddressForm({ onSave, editData, editIndex }) {
  const [form, setForm] = useState({
    building: "",
    detail: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    isDefault: false, // ✅ เพิ่ม field นี้
  });

  const provinces = ["กรุงเทพมหานคร", "กำแพงเพชร", "เชียงใหม่"];
  const districts = ["คลองสาน", "ขาณุวรลักษบุรี", "เมืองเชียงใหม่"];
  const subDistricts = ["คลองต้นไทร", "ดอนแตง", "สุเทพ"];

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({
        building: "",
        detail: "",
        province: "",
        district: "",
        subDistrict: "",
        postalCode: "",
        isDefault: false, // ✅ ตั้งค่าเริ่มต้น
      });
    }
  }, [editData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.building || !form.province || !form.postalCode) {
      alert("Please complete all required fields.");
      return;
    }

    onSave(form, editIndex); // ✅ ส่ง form และ index กลับไป
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">
        {editData ? "Edit Address" : "Add Address"}
      </h3>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Building No."
          value={form.building}
          onChange={(e) => handleChange("building", e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
        />

        <input
          type="text"
          placeholder="Detail"
          value={form.detail}
          onChange={(e) => handleChange("detail", e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={form.province}
            onChange={(e) => handleChange("province", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
          >
            <option value="">province</option>
            {provinces.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={form.district}
            onChange={(e) => handleChange("district", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
          >
            <option value="">District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={form.subDistrict}
            onChange={(e) => handleChange("subDistrict", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
          >
            <option value="">Subdistrict</option>
            {subDistricts.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-amber-500 focus:ring focus:ring-amber-100 transition"
        />

        {/* ✅ Checkbox: ตั้งเป็น default */}
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            id="isDefault"
            checked={form.isDefault}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isDefault" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} className="px-4">
          {editData ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
}

