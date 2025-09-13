// import React, { useState } from "react";
// import Navbar from "../components/organisms/Navbar";
// import { useNavigate } from "react-router-dom";

// export const AdminProductManagement = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   // mock data
//   const [products, setProducts] = useState([
//     {
//       productID: "P001",
//       Name: "Ergonomic Chair",
//       category: "Chairs",
//       price: 3200,
//       stock: 15,
//       mainImage: "https://via.placeholder.com/100"
//     },
//     {
//       productID: "P002",
//       Name: "Wooden Table",
//       category: "Tables",
//       price: 5200,
//       stock: 8,
//       mainImage: "https://via.placeholder.com/100"
//     }
//   ]);

//   const handleDelete = (id) => {
//     // Logic to delete product from a real backend would go here
//     setProducts(products.filter((p) => p.productID !== id));
//   };
  
//   // New function to handle edit action
//   const handleEdit = (productID) => {
//     // Navigate to AddProductPage and pass the productID as state
//     navigate(`/AddProductPage`, { state: { productID } });
//   };

//   const filteredProducts = products.filter(
//     (p) =>
//       p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.productID.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center">
//         <div className="w-full max-w-6xl bg-white p-12 rounded-3xl shadow-xl border border-gray-100 mt-12">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-4xl font-light text-gray-800 tracking-wide">
//               Product Management
//             </h2>
//             <button
//               onClick={() => navigate("/AddProductPage")}
//               className="bg-[#B29674] text-white font-semibold px-6 py-3 rounded-2xl shadow hover:bg-[#a18c6a] transition-colors"
//             >
//               + Add Product
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="ค้นหาสินค้า..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
//             />
//           </div>

//           {/* Product Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-[#E7E2D8] text-gray-800 text-left">
//                   <th className="p-4 rounded-tl-xl">Image</th>
//                   <th className="p-4">Product ID</th>
//                   <th className="p-4">Name</th>
//                   <th className="p-4">Category</th>
//                   <th className="p-4">Price</th>
//                   <th className="p-4">Stock</th>
//                   <th className="p-4 rounded-tr-xl text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((p) => (
//                     <tr
//                       key={p.productID}
//                       className="border-b hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-4">
//                         <img
//                           src={p.mainImage}
//                           alt={p.Name}
//                           className="w-16 h-16 object-cover rounded-lg border"
//                         />
//                       </td>
//                       <td className="p-4">{p.productID}</td>
//                       <td className="p-4">{p.Name}</td>
//                       <td className="p-4">{p.category}</td>
//                       <td className="p-4">{p.price.toLocaleString()} ฿</td>
//                       <td className="p-4">{p.stock}</td>
//                       <td className="p-4 flex justify-center space-x-3">
//                         <button 
//                           onClick={() => handleEdit(p.productID)}
//                           className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.productID)}
//                           className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="text-center text-gray-500 py-6 italic"
//                     >
//                       ไม่พบสินค้า
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import Navbar from "../components/organisms/Navbar";
import { useNavigate } from "react-router-dom";

export const AdminProductManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // Mock Data
  const mockProducts = [
    {
      productID: "P001",
      Name: "Wooden Chair",
      category: "chairs",
      mainImages: [{ url: "https://via.placeholder.com/100" }],
    },
    {
      productID: "P002",
      Name: "Modern Sofa",
      category: "sofas",
      mainImages: [{ url: "https://via.placeholder.com/100" }],
    },
    {
      productID: "P003",
      Name: "Dining Table",
      category: "tables",
      mainImages: [{ url: "https://via.placeholder.com/100" }],
    },
  ];

  // จำลองการโหลดข้อมูลจาก backend
  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // ลบจาก state (mock)
  const handleDelete = (id) => {
    if (!window.confirm("คุณแน่ใจว่าจะลบสินค้านี้?")) return;
    setProducts(products.filter((p) => p.productID !== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-white p-12 rounded-3xl shadow-xl border border-gray-100 mt-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-light text-gray-800 tracking-wide">
              Product Management
            </h2>
            <button
              onClick={() => navigate("/AddProductPage")}
              className="bg-[#B29674] text-white font-semibold px-6 py-3 rounded-2xl shadow hover:bg-[#a18c6a] transition-colors"
            >
              + Add Product
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
            />
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#E7E2D8] text-gray-800 text-left">
                  <th className="p-4 rounded-tl-xl">Image</th>
                  <th className="p-4">Product ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 rounded-tr-xl text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <tr
                      key={p.productID}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <img
                          src={p.mainImages?.[0]?.url || "https://via.placeholder.com/100"}
                          alt={p.Name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="p-4">{p.productID}</td>
                      <td className="p-4">{p.Name}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4 flex justify-center space-x-3">
                        <button
                          onClick={() => navigate(`/EditProduct/${p.productID}`)}
                          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.productID)}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-6 italic">
                      ไม่พบสินค้า
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from "react";
// import Navbar from "../components/organisms/Navbar";
// import { useNavigate } from "react-router-dom";

// export const AdminProductManagement = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   // mock data
//   const [products, setProducts] = useState([
//     {
//       productID: "P001",
//       Name: "Ergonomic Chair",
//       category: "Chairs",
//       price: 3200,
//       stock: 15,
//       mainImage: "https://via.placeholder.com/100",
//     },
//     {
//       productID: "P002",
//       Name: "Wooden Table",
//       category: "Tables",
//       price: 5200,
//       stock: 8,
//       mainImage: "https://via.placeholder.com/100",
//     },
//   ]);

//   const handleDelete = (id) => {
//     setProducts(products.filter((p) => p.productID !== id));
//   };

//   const filteredProducts = products.filter(
//     (p) =>
//       p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.productID.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center">
//         <div className="w-full max-w-6xl bg-white p-12 rounded-3xl shadow-xl border border-gray-100 mt-12">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-4xl font-light text-gray-800 tracking-wide">
//               Product Management
//             </h2>
//             <button
//               onClick={() => navigate("/AddProductPage")}
//               className="bg-[#B29674] text-white font-semibold px-6 py-3 rounded-2xl shadow hover:bg-[#a18c6a] transition-colors"
//             >
//               + Add Product
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="ค้นหาสินค้า..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
//             />
//           </div>

//           {/* Product Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-[#E7E2D8] text-gray-800 text-left">
//                   <th className="p-4 rounded-tl-xl">Image</th>
//                   <th className="p-4">Product ID</th>
//                   <th className="p-4">Name</th>
//                   <th className="p-4">Category</th>
//                   <th className="p-4">Price</th>
//                   <th className="p-4">Stock</th>
//                   <th className="p-4 rounded-tr-xl text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map((p) => (
//                     <tr
//                       key={p.productID}
//                       className="border-b hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-4">
//                         <img
//                           src={p.mainImage}
//                           alt={p.Name}
//                           className="w-16 h-16 object-cover rounded-lg border"
//                         />
//                       </td>
//                       <td className="p-4">{p.productID}</td>
//                       <td className="p-4">{p.Name}</td>
//                       <td className="p-4">{p.category}</td>
//                       <td className="p-4">{p.price.toLocaleString()} ฿</td>
//                       <td className="p-4">{p.stock}</td>
//                       <td className="p-4 flex justify-center space-x-3">
//                         <button
//                           onClick={() => navigate(`/product/${p.productID}`)}
//                           className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//                         >
//                           Detail
//                         </button>
//                         <button
//                           onClick={() => handleDelete(p.productID)}
//                           className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="text-center text-gray-500 py-6 italic"
//                     >
//                       ไม่พบสินค้า
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

