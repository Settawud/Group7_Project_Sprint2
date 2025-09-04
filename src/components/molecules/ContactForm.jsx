import React from "react";

export default function ContactForm() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact</h2>
      <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 rounded-xl border border-gray-300 
                   focus:outline-none focus:ring-1 focus:ring-[#B29674] bg-white"
      />
      <input
        type="text"
        placeholder="Phone"
        className="w-full px-4 py-2 rounded-xl border border-gray-300 
                   focus:outline-none focus:ring-1 focus:ring-[#B29674] bg-white"
      />
      </div>
    </div>
  );
}
