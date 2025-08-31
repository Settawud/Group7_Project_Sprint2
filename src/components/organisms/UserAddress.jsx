import React, { useState } from "react";
import { CirclePlus } from 'lucide-react';
import AddressList from "../molecules/AddressList";
import AddressForm from "../molecules/AddressForm";
import Modal from "../layout/Modal";
import Button from "../atoms/Button";

export default function UserAddress() {
  const [addresses, setAddresses] = useState([
    {
      building: "54",
      detail: "ห้องสมุด 15 ชั้น 1 อาคาร 24 หมู่ 24",
      subDistrict: "คลองต้นไทร",
      district: "คลองสาน",
      province: "กรุงเทพมหานคร",
      postalCode: "10600",
      isDefault: false, // 👈 เพิ่ม field
    },
    {
      building: "545",
      detail: "",
      subDistrict: "ดอนแตง",
      district: "ขาณุวรลักษบุรี",
      province: "กำแพงเพชร",
      postalCode: "62140",
      isDefault: false, // 👈 เพิ่ม field
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = (formData, index = null) => {
    let updated = [...addresses];

    // ✅ ถ้ามีการตั้ง default address
    if (formData.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    if (index !== null) {
      updated[index] = formData;
    } else {
      updated.push(formData);
    }

    setAddresses(updated);
    setShowPopup(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    if (selectedAddress === index) setSelectedAddress(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowPopup(true);
  };

  const formatAddress = (addr) => {
    const full = `${addr.building} ${addr.detail} ${addr.subDistrict} ${addr.district} ${addr.province} ${addr.postalCode}`;
    return addr.isDefault ? `[ค่าเริ่มต้น] ${full}` : full; // ✅ แสดงผลว่าที่อยู่นี้เป็น default
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 border-gray-200 pb-4">
          ที่อยู่จัดส่งสินค้า
        </h2>

        {/* Address List */}
        <div className="space-y-3">
          <AddressList
            addresses={addresses.map((a) => formatAddress(a))}
            selectedAddress={selectedAddress}
            onSelect={setSelectedAddress}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Add new address button */}
        <div className="mt-2">
          <button
            onClick={() => {
              setShowPopup(true);
              setEditIndex(null);
            }}
            className="flex items-center justify-center gap-1 px-4 py-3 text-charcoal hover:underline"
          >
            <CirclePlus />
            <span className="font-medium">เพิ่มที่อยู่ใหม่</span>
          </button>
          
        </div>
      </div>

      {/* Modal for Address Form */}
      {showPopup && (
        <Modal onClose={() => setShowPopup(false)}>
          <AddressForm
            onSave={handleSave}
            editData={editIndex !== null ? addresses[editIndex] : null}
            editIndex={editIndex}
          />
        </Modal>
      )}
    </div>
  );
}
