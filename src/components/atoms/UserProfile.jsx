import React, { useState } from "react";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //   return (
  //     <form
  //     onSubmit={(e) => {
  //         e.preventDefault();
  //         setIsEditing(!isEditing);
  //     }}
  //     >
  //         <label>
  //             First name: {""}
  //             {isEditing ? (
  //                 <input
  //                     value={firstName}
  //                     onChange={(e)=> {
  //                         setFirstName(e.target.value);
  //                     }}
  //                     className="w-100 px-4 py-3 border rounded-lg"
  //                 />
  //             ) : (
  //                 <label>{firstName}</label>
  //             )}
  //         </label>
  //         <label>
  //             Last name: {""}
  //             {isEditing ? (
  //                 <input
  //                     value={lastName}
  //                     onChange={(e)=> {
  //                         setLastName(e.target.value);
  //                     }}
  //                 />
  //             ) : (
  //                 <b>{lastName}</b>
  //             )}
  //         </label>
  //         <button type="summit" className='bg-wood-brown'>{isEditing ? "Save" : "Edit"} Profile</button>
  //         <p>
  //             <i>
  //                 Hello, {firstName} {lastName}!
  //             </i>
  //         </p>
  //         </form>
  //   );
  // };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
      }}
    >
      <div className="space-y-4">
        {/* ชื่อ-นามสกุล */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              ชื่อจริง : {""}
              {isEditing ? (
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              ) : (
                <label>{firstName}</label>
              )}
            </label>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              นามสกุล : {""}
              {isEditing ? (
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              ) : (
                <label>{lastName}</label>
              )}
            </label>
          </div>
        </div>
      </div>
      <button type="summit" className="bg-wood-brown">
        {isEditing ? "Save" : "Edit"} Profile
      </button>
      <p>
        <i>
          Hello, {firstName} {lastName}!
        </i>
      </p>
    </form>
  );
}
