// import React, { useState } from "react";
// import Button from "../atoms/Button";
// import { Edit } from "lucide-react";

// export default function ProfileData() {
//   const defaultImage =
//     "https://via.placeholder.com/300x300.png?text=Profile+Image";
//   const [profileImage, setProfileImage] = useState(defaultImage);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfileImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => setProfileImage(defaultImage);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("บันทึกข้อมูล:", formData, profileImage);
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-6">
//         <h2 className="text-xl font-bold text-sand">User Data</h2>
//         {!isEditing && (
//           <button onClick={() => setIsEditing(true)}>
//             <Edit className="w-5 h-5 text-stone-800" />
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 items-start">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
//             <img
//               src={profileImage}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           {isEditing && (
//             <div className="flex flex-col items-center mt-3 text-sm">
//               <label className="text-amber-600 font-medium cursor-pointer hover:underline mt-1">
//                 Upload Picture
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//               {profileImage !== defaultImage && (
//                 <button
//                   onClick={handleRemoveImage}
//                   className="text-red-500 mt-1 hover:underline"
//                 >
//                   Delete Picture
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Profile Info */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674] `}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Lastname
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               E-mail
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder="your@email.com"
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder="08xxxxxxxx"
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       {isEditing && (
//         <div className="flex justify-end gap-4 mt-8">
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </div>
//       )}
//     </div>
//   );
// }

//เตรียมเชื่อม backed
// import React, { useState } from "react";
// import Button from "../atoms/Button";
// import { Edit } from "lucide-react";

// export default function ProfileData() {
//   const defaultImage =
//     "https://via.placeholder.com/300x300.png?text=Profile+Image";
//   const [profileImage, setProfileImage] = useState(defaultImage);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     imageFile: null, // เพิ่ม field สำหรับไฟล์รูปภาพ
//   });

//   // Handle การเปลี่ยนแปลงรูปภาพ
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfileImage(reader.result);
//       reader.readAsDataURL(file);
//       setFormData((prev) => ({ ...prev, imageFile: file })); // เก็บไฟล์ใน formData
//     }
//   };

//   // ลบรูปภาพ
//   const handleRemoveImage = () => {
//     setProfileImage(defaultImage);
//     setFormData((prev) => ({ ...prev, imageFile: null })); // ลบไฟล์จาก formData
//   };

//   // Handle การเปลี่ยนแปลงข้อมูลในฟอร์ม
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ฟังก์ชันอัปโหลดรูปภาพ
//   const uploadImage = async () => {
//     const formDataImage = new FormData();
//     formDataImage.append("file", formData.imageFile); // ส่งไฟล์ภาพไปยัง API

//     try {
//       const response = await fetch("/api/upload-image", {
//         method: "POST",
//         body: formDataImage,
//       });
//       if (!response.ok) {
//         throw new Error("Error uploading image");
//       }

//       const data = await response.json();
//       return data.imageUrl; // สมมติว่า API ส่ง URL ของรูปภาพ
//     } catch (error) {
//       alert("การอัปโหลดภาพล้มเหลว");
//       throw error;
//     }
//   };

//   // ฟังก์ชันบันทึกข้อมูลผู้ใช้
//   const saveUserData = async (imageUrl) => {
//     try {
//       const response = await fetch("/api/save-user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           profileImage: imageUrl, // ส่ง URL ของภาพที่อัปโหลดไปด้วย
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Error saving user data");
//       }

//       alert("บันทึกข้อมูลสำเร็จ");
//     } catch (error) {
//       alert("การบันทึกข้อมูลผู้ใช้ล้มเหลว");
//       throw error;
//     }
//   };

//   // Handle การบันทึกข้อมูล (ทั้งรูปภาพและข้อมูลผู้ใช้)
//   const handleSave = async () => {
//     // ตรวจสอบข้อมูลก่อน
//     if (formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.phone === "") {
//       alert("กรุณากรอกข้อมูลให้ครบถ้วน");
//       return;
//     }

//     if (!formData.email.includes("@")) {
//       alert("กรุณากรอกอีเมลให้ถูกต้อง");
//       return;
//     }

//     if (formData.phone.length !== 10) {
//       alert("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
//       return;
//     }

//     try {
//       let imageUrl = defaultImage; // ใช้ defaultImage ถ้าไม่มีการอัปโหลดภาพ

//       // ถ้ามีการอัปโหลดภาพใหม่, ให้เรียกฟังก์ชันอัปโหลดรูปภาพ
//       if (formData.imageFile) {
//         imageUrl = await uploadImage();
//       }

//       // บันทึกข้อมูลผู้ใช้
//       await saveUserData(imageUrl);

//       // เสร็จแล้วปิดโหมดการแก้ไข
//       setIsEditing(false);
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาด:", error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-6">
//         <h2 className="text-xl font-bold text-sand">User Data</h2>
//         {!isEditing && (
//           <button onClick={() => setIsEditing(true)}>
//             <Edit className="w-5 h-5 text-stone-800" />
//           </button>
//         )}
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 items-start">
//         {/* Profile Image */}
//         <div className="flex flex-col items-center">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
//             <img
//               src={profileImage}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           {isEditing && (
//             <div className="flex flex-col items-center mt-3 text-sm">
//               <label className="text-amber-600 font-medium cursor-pointer hover:underline mt-1">
//                 Upload Picture
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//               {profileImage !== defaultImage && (
//                 <button
//                   onClick={handleRemoveImage}
//                   className="text-red-500 mt-1 hover:underline"
//                 >
//                   Delete Picture
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Profile Info */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674] `}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Lastname
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               E-mail
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder="your@email.com"
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={!isEditing}
//               placeholder="08xxxxxxxx"
//               className={`w-full px-4 py-2 mt-1 rounded-xl border ${
//                 isEditing ? "bg-white" : "bg-gray-50"
//               } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       {isEditing && (
//         <div className="flex justify-end gap-4 mt-8">
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { Edit } from "lucide-react";
import axios from "axios";

export default function ProfileData() {
  const API = "http://localhost:4000/api/v1/mongo/users/me";
  const API_IMAGE = "http://localhost:4000/api/v1/mongo/users/me/image";

  const defaultImage =
    "https://via.placeholder.com/300x300.png?text=Profile+Image";

  const [profileImage, setProfileImage] = useState(defaultImage);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // ดึงข้อมูลโปรไฟล์จาก backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile data:", res.data);

        const user = res.data;
        setFormData({
          firstName: user.firstname || "",
          lastName: user.lastname || "",
          email: user.email || "",
          phone: user.phone || "",
        });
        if (user.image) setProfileImage(user.image);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // อัปโหลดรูปภาพไป backend
  const handleImageUpload = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.patch(API_IMAGE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfileImage(res.data.user.image);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // ลบรูปภาพ (เรียก API เคลียร์รูปภาพใน backend)
  const handleRemoveImage = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(API_IMAGE, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileImage(defaultImage);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // บันทึกข้อมูลโปรไฟล์ (PATCH)
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      name: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      // ไม่ส่ง profileImage เพราะแยกอัปโหลดรูป
    };

    try {
      await axios.patch(API, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-sand">User Data</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>
            <Edit className="w-5 h-5 text-stone-800" />
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
                Upload Picture
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
                  Delete Picture
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
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
              } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="08xxxxxxxx"
              className={`w-full px-4 py-2 mt-1 rounded-xl border ${
                isEditing ? "bg-white" : "bg-gray-50"
              } border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#B29674]`}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      )}
    </div>
  );
}


