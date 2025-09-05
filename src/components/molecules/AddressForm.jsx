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
    isDefault: false,
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
        isDefault: false,
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

    onSave(form, editIndex);
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
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
        />

        <input
          type="text"
          placeholder="Detail"
          value={form.detail}
          onChange={(e) => handleChange("detail", e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={form.province}
            onChange={(e) => handleChange("province", e.target.value)}
            className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
              form.province === "" ? "text-stone-500" : "text-gray-800"
            }`}
          >
            <option value="">Province</option>
            {provinces.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={form.district}
            onChange={(e) => handleChange("district", e.target.value)}
            className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
              form.district === "" ? "text-stone-500" : "text-gray-800"
            }`}
          >
            <option value="">District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={form.subDistrict}
            onChange={(e) => handleChange("subDistrict", e.target.value)}
            className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674] ${
              form.subDistrict === "" ? "text-stone-500" : "text-gray-800"
            }`}
          >
            <option value="">Subdistrict</option>
            {subDistricts.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#B29674]"
        />

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

      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} className="px-4">
          {editData ? "Update" : "Save"}
        </Button>
      </div>
    </div>
  );
}
