import React, { useState } from "react";
import Button from "../atoms/Button";
import { Edit } from 'lucide-react';

export default function ProfileData() {
  const defaultImage =
    "https://via.placeholder.com/300x300.png?text=Profile+Image";
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "ขนมปัง",
    lastName: "ปั้นประสาท",
    email: "",
    phone: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setProfileImage(defaultImage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("บันทึกข้อมูล:", formData, profileImage);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Data</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-5 h-5 text-charcoal" />
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div className="flex flex-col items-center mt-3 text-sm">
              <label className="text-amber-600 font-medium cursor-pointer hover:underline mt-1">
                เลือกรูปภาพ
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {profileImage !== defaultImage && (
                <button
                  onClick={handleRemoveImage}
                  className="text-red-500 mt-1 hover:underline"
                >
                  ลบรูปภาพ
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ชื่อจริง
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-100 transition`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              นามสกุล
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-100 transition`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              อีเมล
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="your@email.com"
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-100 transition`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="08x-xxx-xxxx"
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-100 transition`}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-4 mt-8">
          <Button
            onClick={() => setIsEditing(false)}
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
          >
            บันทึก
          </Button>
        </div>
      )}
    </div>
  );
}