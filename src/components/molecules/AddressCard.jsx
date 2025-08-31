// import React from "react";

// export default function AddressCard({ address, isSelected, onClick, onEdit, onDelete }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer ${
//         isSelected ? "border-yellow-500 bg-yellow-50" : "bg-white"
//       }`}
//     >
//       <span className="text-sm leading-snug w-4/5">{address}</span>
//       <div className="flex gap-2">
//         <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-blue-500 text-sm">
//           แก้ไข
//         </button>
//         <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-500 text-sm">
//           ลบ
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function AddressCard({ address, isSelected, onClick, onEdit, onDelete }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-4 shadow-sm transition cursor-pointer flex justify-between items-start gap-4
        ${isSelected ? "border-amber-500 bg-amber-50" : "border-gray-200 bg-white hover:shadow-md"}`}
    >
      {/* Address Text */}
      <span className="text-gray-700 text-sm leading-relaxed flex-1">
        {address}
      </span>

      {/* Action Buttons */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex items-center gap-1 text-charcoal text-sm font-medium hover:underline"
        >
          <Pencil className="w-4 h-4" /> แก้ไข
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex items-center gap-1 text-red-500 text-sm font-medium hover:underline"
        >
          <Trash2 className="w-4 h-4" /> ลบ
        </button>
      </div>
    </div>
  );
}

