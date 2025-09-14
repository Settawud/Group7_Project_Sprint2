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
//     isDefault: false,
//   });

//   const provinces = ["กรุงเทพมหานคร", "กำแพงเพชร", "เชียงใหม่"];
//   const districts = ["คลองสาน", "ขาณุวรลักษบุรี", "เมืองเชียงใหม่"];
//   const subDistricts = ["คลองต้นไทร", "ดอนแตง", "สุเทพ"];

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
//         isDefault: false,
//       });
//     }
//   }, [editData]);

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = () => {
//     if (!form.building || !form.province || !form.postalCode) {
//       alert("Please complete all required fields.");
//       return;
//     }

//     onSave(form, editIndex);
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
//       <h3 className="text-lg font-semibold text-gray-800 mb-5">
//         {editData ? "Edit Address" : "Add Address"}
//       </h3>

//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Building No."
//           value={form.building}
//           onChange={(e) => handleChange("building", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
//         />

//         <input
//           type="text"
//           placeholder="Detail"
//           value={form.detail}
//           onChange={(e) => handleChange("detail", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           <select
//             value={form.province}
//             onChange={(e) => handleChange("province", e.target.value)}
//             className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
//               form.province === "" ? "text-stone-500" : "text-gray-800"
//             }`}
//           >
//             <option value="">Province</option>
//             {provinces.map((p, i) => (
//               <option key={i} value={p}>
//                 {p}
//               </option>
//             ))}
//           </select>

//           <select
//             value={form.district}
//             onChange={(e) => handleChange("district", e.target.value)}
//             className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
//               form.district === "" ? "text-stone-500" : "text-gray-800"
//             }`}
//           >
//             <option value="">District</option>
//             {districts.map((d, i) => (
//               <option key={i} value={d}>
//                 {d}
//               </option>
//             ))}
//           </select>

//           <select
//             value={form.subDistrict}
//             onChange={(e) => handleChange("subDistrict", e.target.value)}
//             className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
//               form.subDistrict === "" ? "text-stone-500" : "text-gray-800"
//             }`}
//           >
//             <option value="">Subdistrict</option>
//             {subDistricts.map((s, i) => (
//               <option key={i} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Postal Code"
//           value={form.postalCode}
//           onChange={(e) => handleChange("postalCode", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
//         />

//         <div className="flex items-center pt-1">
//           <input
//             type="checkbox"
//             id="isDefault"
//             checked={form.isDefault}
//             onChange={(e) => handleChange("isDefault", e.target.checked)}
//             className="mr-2 accent-[#B29674]"
//           />
//           <label htmlFor="isDefault" className="text-sm text-gray-700">
//             Set as default address
//           </label>
//         </div>
//       </div>

//       <div className="flex justify-end mt-6">
//         <Button onClick={handleSubmit} className="px-4">
//           {editData ? "Update" : "Save"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Button from "../atoms/Button";
// import axios from "axios";

// export default function AddressForm({ onSave, editData, editIndex }) {
//   const [form, setForm] = useState({
//     building: "",
//     detail: "",
//     province: "",
//     district: "",
//     subDistrict: "",
//     postalCode: "",
//     isDefault: false,
//   });

//   // ✅ state สำหรับข้อมูลจาก API
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [subDistricts, setSubDistricts] = useState([]);

//   const API_BASE = import.meta.env.VITE_API_BASE || "/api/v1/mongo/users/me";

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
//         isDefault: false,
//       });
//     }
//   }, [editData]);

//   // ✅ โหลด provinces ตอน mount
//   useEffect(() => {
//     const fetchProvinces = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE}/provinces`);
//         setProvinces(data || []);
//       } catch (err) {
//         console.error("Failed to fetch provinces:", err);
//       }
//     };
//     fetchProvinces();
//   }, []);

//   // ✅ โหลด districts เมื่อ province เปลี่ยน
//   useEffect(() => {
//     if (!form.province) return;
//     const fetchDistricts = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE}/districts?provinceId=${form.province}`);
//         setDistricts(data || []);
//         setSubDistricts([]); // reset subdistrict
//       } catch (err) {
//         console.error("Failed to fetch districts:", err);
//       }
//     };
//     fetchDistricts();
//   }, [form.province]);

//   // ✅ โหลด subDistricts เมื่อ district เปลี่ยน
//   useEffect(() => {
//     if (!form.district) return;
//     const fetchSubDistricts = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE}/subdistricts?districtId=${form.district}`);
//         setSubDistricts(data || []);
//       } catch (err) {
//         console.error("Failed to fetch subdistricts:", err);
//       }
//     };
//     fetchSubDistricts();
//   }, [form.district]);

//   const handleChange = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!form.building || !form.province || !form.postalCode) {
//       alert("Please complete all required fields.");
//       return;
//     }

//     // map ให้ตรง schema backend
//     const addressPayload = {
//       buildingNo: form.building,
//       detail: form.detail,
//       postcode: form.postalCode,
//       province: form.province,   // เป็น ObjectId จาก select
//       district: form.district,
//       subdistrict: form.subDistrict,
//       isDefault: form.isDefault,
//     };

//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await axios.patch(
//         `${API_BASE}/users/me`,
//         { addresses: [addressPayload] },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("Saved to backend:", data);
//       alert("Address saved successfully!");
//       onSave(form, editIndex);
//     } catch (err) {
//       console.error("Save address failed:", err);
//       alert("Failed to save address");
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
//       <h3 className="text-lg font-semibold text-gray-800 mb-5">
//         {editData ? "Edit Address" : "Add Address"}
//       </h3>

//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Building No."
//           value={form.building}
//           onChange={(e) => handleChange("building", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
//         />

//         <input
//           type="text"
//           placeholder="Detail"
//           value={form.detail}
//           onChange={(e) => handleChange("detail", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           {/* Province */}
//           <select
//             value={form.province}
//             onChange={(e) => handleChange("province", e.target.value)}
//             className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
//               form.province === "" ? "text-stone-500" : "text-gray-800"
//             }`}
//           >
//             <option value="">Province</option>
//             {provinces.map((p) => (
//               <option key={p._id} value={p._id}>
//                 {p.name}
//               </option>
//             ))}
//           </select>

//           {/* District */}
//           <select
//             value={form.district}
//             onChange={(e) => handleChange("district", e.target.value)}
//             className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
//               form.district === "" ? "text-stone-500" : "text-gray-800"
//             }`}
//           >
//             <option value="">District</option>
//             {districts.map((d) => (
//               <option key={d._id} value={d._id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           {/* Subdistrict */}
//           <select
//             value={form.subDistrict}
//             onChange={(e) => handleChange("subDistrict", e.target.value)}
//             className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
//               form.subDistrict === "" ? "text-stone-500" : "text-gray-800"
//             }`}
//           >
//             <option value="">Subdistrict</option>
//             {subDistricts.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Postal Code"
//           value={form.postalCode}
//           onChange={(e) => handleChange("postalCode", e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
//         />

//         <div className="flex items-center pt-1">
//           <input
//             type="checkbox"
//             id="isDefault"
//             checked={form.isDefault}
//             onChange={(e) => handleChange("isDefault", e.target.checked)}
//             className="mr-2 accent-[#B29674]"
//           />
//           <label htmlFor="isDefault" className="text-sm text-gray-700">
//             Set as default address
//           </label>
//         </div>
//       </div>

//       <div className="flex justify-end mt-6">
//         <Button onClick={handleSubmit} className="px-4">
//           {editData ? "Update" : "Save"}
//         </Button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import axios from "axios";

export default function AddressForm({ onSave, editData, editIndex }) {
  const [form, setForm] = useState({
    building: "",
    detail: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState({}); // ✅ state สำหรับ error
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "/api/v1/mongo";

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
        isDefault: false,
      });
    }
  }, [editData]);

  // ✅ โหลด provinces ตอน mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/provinces`);
        setProvinces(data || []);
      } catch (err) {
        console.error("Failed to fetch provinces:", err);
      }
    };
    fetchProvinces();
  }, []);

  // ✅ โหลด districts เมื่อ province เปลี่ยน
  useEffect(() => {
    if (!form.province) return;
    const fetchDistricts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/districts?provinceId=${form.province}`
        );
        setDistricts(data || []);
        setSubDistricts([]);
        setForm((prev) => ({ ...prev, district: "", subDistrict: "", postalCode: "" }));
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      }
    };
    fetchDistricts();
  }, [form.province]);

  // ✅ โหลด subDistricts เมื่อ district เปลี่ยน
  useEffect(() => {
    if (!form.district) return;
    const fetchSubDistricts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/subdistricts?districtId=${form.district}`
        );
        setSubDistricts(data || []);
        setForm((prev) => ({ ...prev, subDistrict: "", postalCode: "" }));
      } catch (err) {
        console.error("Failed to fetch subdistricts:", err);
      }
    };
    fetchSubDistricts();
  }, [form.district]);

  // ✅ handle change + auto postalCode
  const handleChange = (key, value) => {
    if (key === "subDistrict") {
      const selected = subDistricts.find((s) => s._id === value);
      setForm((prev) => ({
        ...prev,
        subDistrict: value,
        postalCode: selected ? selected.postcode : prev.postalCode,
      }));
    } else {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
  };

  // ✅ validate form
  const validateForm = () => {
    let newErrors = {};
    if (!form.building) newErrors.building = "Building number is required.";
    if (!form.province) newErrors.province = "Please select a province.";
    if (!form.district) newErrors.district = "Please select a district.";
    if (!form.subDistrict) newErrors.subDistrict = "Please select a subdistrict.";
    if (!/^\d{5}$/.test(form.postalCode)) {
      newErrors.postalCode = "Postal code must be 5 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const addressPayload = {
      buildingNo: form.building,
      detail: form.detail,
      postcode: form.postalCode,
      province: form.province,
      district: form.district,
      subdistrict: form.subDistrict,
      isDefault: form.isDefault,
    };

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `${API_BASE}/users/me`,
        { addresses: [addressPayload] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Saved to backend:", data);
      alert("Address saved successfully!");
      onSave(form, editIndex);
    } catch (err) {
      console.error("Save address failed:", err);
      alert("Failed to save address: " + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">
        {editData ? "Edit Address" : "Add Address"}
      </h3>

      <div className="space-y-4">
        {/* Building */}
        <div>
          <input
            type="text"
            placeholder="Building No."
            value={form.building}
            onChange={(e) => handleChange("building", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
          />
          {errors.building && (
            <p className="text-red-500 text-sm">{errors.building}</p>
          )}
        </div>

        {/* Detail */}
        <input
          type="text"
          placeholder="Detail"
          value={form.detail}
          onChange={(e) => handleChange("detail", e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Province */}
          <div>
            <select
              value={form.province}
              onChange={(e) => handleChange("province", e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
                form.province === "" ? "text-stone-500" : "text-gray-800"
              }`}
            >
              <option value="">Province</option>
              {provinces.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="text-red-500 text-sm">{errors.province}</p>
            )}
          </div>

          {/* District */}
          <div>
            <select
              value={form.district}
              onChange={(e) => handleChange("district", e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
                form.district === "" ? "text-stone-500" : "text-gray-800"
              }`}
            >
              <option value="">District</option>
              {districts.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
            )}
          </div>

          {/* Subdistrict */}
          <div>
            <select
              value={form.subDistrict}
              onChange={(e) => handleChange("subDistrict", e.target.value)}
              className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
                form.subDistrict === "" ? "text-stone-500" : "text-gray-800"
              }`}
            >
              <option value="">Subdistrict</option>
              {subDistricts.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.subDistrict && (
              <p className="text-red-500 text-sm">{errors.subDistrict}</p>
            )}
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <input
            type="text"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm">{errors.postalCode}</p>
          )}
        </div>

        {/* Default address */}
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            id="isDefault"
            checked={form.isDefault}
            onChange={(e) => handleChange("isDefault", e.target.checked)}
            className="mr-2 accent-[#B29674]"
          />
          <label htmlFor="isDefault" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} className="px-4">
          {editData ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
}


