// import React, { useState } from "react";
// import { CirclePlus } from "lucide-react";
// import AddressList from "../molecules/AddressList";
// import AddressForm from "../molecules/AddressForm";
// import Modal from "../layout/Modal";
// import Button from "../atoms/Button";

// export default function UserAddress() {
//   const [addresses, setAddresses] = useState([
//     {
//       building: "54",
//       detail: "ห้องสมุด 15 ชั้น 1 อาคาร 24 หมู่ 24",
//       subDistrict: "คลองต้นไทร",
//       district: "คลองสาน",
//       province: "กรุงเทพมหานคร",
//       postalCode: "10600",
//       isDefault: false, // 👈 เพิ่ม field
//     },
//     {
//       building: "545",
//       detail: "",
//       subDistrict: "ดอนแตง",
//       district: "ขาณุวรลักษบุรี",
//       province: "กำแพงเพชร",
//       postalCode: "62140",
//       isDefault: false, // 👈 เพิ่ม field
//     },
//   ]);

//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleSave = (formData, index = null) => {
//     let updated = [...addresses];

//     // ✅ ถ้ามีการตั้ง default address
//     if (formData.isDefault) {
//       updated = updated.map((a) => ({ ...a, isDefault: false }));
//     }

//     if (index !== null) {
//       updated[index] = formData;
//     } else {
//       updated.push(formData);
//     }

//     setAddresses(updated);
//     setShowPopup(false);
//     setEditIndex(null);

//     // ✅ ตั้ง selected address เป็น default address
//     const defaultIndex = updated.findIndex((a) => a.isDefault);
//     if (defaultIndex !== -1) {
//       setSelectedAddress(defaultIndex);
//     }
//   };

//   const handleDelete = (index) => {
//     setAddresses(addresses.filter((_, i) => i !== index));
//     if (selectedAddress === index) setSelectedAddress(null);
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setShowPopup(true);
//   };

//   const formatAddress = (addr) => {
//     const full = `${addr.building} ${addr.detail} ${addr.subDistrict} ${addr.district} ${addr.province} ${addr.postalCode}`;
//     return addr.isDefault ? `[Default] ${full}` : full; // ✅ แสดงผลว่าที่อยู่นี้เป็น default
//   };

 

//   return (
//     <div>
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
//         {/* Header */}
//         <h2 className="text-xl font-bold text-gray-800 border-gray-200 pb-4">
//           Shipping Address
//         </h2>

//         {/* Address List */}
//         <div className="space-y-3">
//           <AddressList
//             addresses={addresses.map((a) => formatAddress(a))}
//             selectedAddress={selectedAddress}
//             onSelect={setSelectedAddress}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         </div>

//         {/* Add new address button */}
//         <div className="mt-2">
//           <button
//             onClick={() => {
//               setShowPopup(true);
//               setEditIndex(null);
//             }}
//             className="flex items-center justify-center gap-1 px-4 py-3 text-charcoal hover:underline"
//           >
//             <CirclePlus />
//             <span className="font-medium">Add new address</span>
//           </button>
//         </div>
//       </div>

//       {/* Modal for Address Form */}
//       {showPopup && (
//         <Modal onClose={() => setShowPopup(false)}>
//           <AddressForm
//             onSave={handleSave}
//             editData={editIndex !== null ? addresses[editIndex] : null}
//             editIndex={editIndex}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import AddressList from "../molecules/AddressList";
import AddressForm from "../molecules/AddressForm";
import Modal from "../layout/Modal";
import Button from "../atoms/Button";
import { api } from "../../lib/api";

export default function UserAddress() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // ✅ โหลด addresses จาก backend
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await api.get("/users/me/addresses");
        setAddresses(data.items || []);
        // ถ้ามี default address → setSelectedAddress เป็น index ของมัน
        const defaultIndex = (data.items || []).findIndex((a) => a.isDefault);
        if (defaultIndex !== -1) {
          setSelectedAddress(defaultIndex);
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
      }
    };
    fetchAddresses();
  }, []);

  // ✅ save (เพิ่มหรือแก้ไข)
  const handleSave = async (formData, index = null) => {
    try {
      if (index !== null) {
        // update
        await api.patch(`/users/me/addresses/${formData.addressId}`, {
          buildingNo: formData.building,
          detail: formData.detail,
          postcode: formData.postalCode,
          province: formData.province,
          district: formData.district,
          subdistrict: formData.subDistrict,
          isDefault: formData.isDefault,
        });
      } else {
        // create
        await api.post("/users/me/addresses", {
          buildingNo: formData.building,
          detail: formData.detail,
          postcode: formData.postalCode,
          province: formData.province,
          district: formData.district,
          subdistrict: formData.subDistrict,
          isDefault: formData.isDefault,
        });
      }

      // reload addresses after save
      const { data } = await api.get("/users/me/addresses");
      setAddresses(data.items || []);
      setShowPopup(false);
      setEditIndex(null);
    } catch (err) {
      console.error("Save address failed:", err);
      alert("Failed to save address: " + (err.response?.data?.message || "Unknown"));
    }
  };

  // ✅ delete
  const handleDelete = async (index) => {
    try {
      const addr = addresses[index];
      await api.delete(`/users/me/addresses/${addr.addressId}`);

      const { data } = await api.get("/users/me/addresses");
      setAddresses(data.items || []);
      setSelectedAddress(null);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete address: " + (err.response?.data?.message || "Unknown"));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowPopup(true);
  };

  // ✅ แปลง address ให้เป็น string แสดงผล
  const formatAddress = (addr) => {
    const full = `${addr.buildingNo || ""} ${addr.detail || ""} ${addr.subdistrict || ""} ${addr.district || ""} ${addr.province || ""} ${addr.postcode || ""}`;
    return addr.isDefault ? `[Default] ${full}` : full;
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 border-gray-200 pb-4">
          Shipping Address
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
            <span className="font-medium">Add new address</span>
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
