import React, { useState } from "react";
import Navbar from "../components/organisms/Navbar";

export const AddProductPage = () => {
  // Initial state for the entire form, structured to match the Mongoose schema
  const [formData, setFormData] = useState({
    productID: "", // Kept for form tracking, not in schema
    name: "",
    description: "",
    category: "",
    tags: "", // Will be converted to array on submit
    material: "",
    trial: false,
    thumbnails: [], // Array of File objects, will be processed on submit
    dimension: {
      width: "",
      height: "",
      depth: "",
      weight: "",
    },
    variants: [
      {
        skuID: "", // Kept for form tracking, not in schema
        colorId: "",
        price: "",
        quantityInStock: "",
        image: null, // Single File object
      },
    ],
  });

  // Handle changes for top-level form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle changes for top-level dimension fields
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dimension: {
        ...formData.dimension,
        [name]: value,
      },
    });
  };

  // Handle changes for main image file input (thumbnails)
  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      thumbnails: files,
    });
  };

  // Handle changes for variant fields (non-image)
  const handleVariantChange = (e, variantIndex) => {
    const { name, value, type } = e.target;
    const newVariants = [...formData.variants];
    newVariants[variantIndex][name] = type === "number" ? Number(value) : value;

    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  // Handle file change for a single variant image
  const handleVariantImageChange = (e, variantIndex) => {
    const file = e.target.files[0] || null;
    const newVariants = [...formData.variants];
    newVariants[variantIndex].image = file;
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  // Add a new variant to the variants array
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          skuID: "",
          colorId: "",
          price: "",
          quantityInStock: "",
          image: null,
        },
      ],
    });
  };

  // Remove a variant from the variants array
  const handleRemoveVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for submission to match the Mongoose schema
    const submissionData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      trial: formData.trial,
      tags: formData.tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
      material: formData.material,
      thumbnails: formData.thumbnails.map((file) => ({
        url: URL.createObjectURL(file), // Mock URL for demonstration
        publicId: "mock-public-id-" + file.name, // Mock publicId
      })),
      dimension: formData.dimension,
      variants: formData.variants.map((variant) => ({
        colorId: variant.colorId,
        price: Number(variant.price),
        quantityInStock: Number(variant.quantityInStock),
        image: variant.image
          ? {
              url: URL.createObjectURL(variant.image),
              publicId: "mock-public-id-" + variant.image.name,
            }
          : null,
      })),
    };

    console.log("Form Data (matches Mongoose schema):", submissionData);
    // You would typically send this data to an API
    console.log("Product form submitted! Check the console for data.");
  };

  // Handle form cancellation and reset
  const handleCancel = () => {
    setFormData({
      productID: "",
      name: "",
      description: "",
      category: "",
      tags: "",
      material: "",
      trial: false,
      thumbnails: [],
      dimension: {
        width: "",
        height: "",
        depth: "",
        weight: "",
      },
      variants: [
        {
          skuID: "",
          colorId: "",
          price: "",
          quantityInStock: "",
          image: null,
        },
      ],
    });
  };
  return (
    <div>
      <Navbar />
      <h2 className="text-4xl font-light text-gray-800 mb-8 text-center tracking-wide">
        เพิ่มสินค้าใหม่
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light text-gray-800 border-b border-gray-200 pb-2">
              ข้อมูลสินค้า
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="productID"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  id="productID"
                  name="productID"
                  value={formData.productID}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  ชื่อสินค้า
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                รายละเอียดสินค้า
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674] appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    เลือกหมวดหมู่
                  </option>
                  <option value="Chairs">Chairs</option>
                  <option value="Tables">Tables</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Tags (แยกด้วยคอมม่า)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  placeholder="เช่น: แผ่นรองเมาส์, รองข้อมือ"
                />
              </div>
              <div>
                <label
                  htmlFor="material"
                  className="block text-gray-700 font-medium mb-2"
                >
                  วัสดุ
                </label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                />
              </div>
            </div>

            {/* Checkbox for Trial Product */}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="trial"
                name="trial"
                checked={formData.trial}
                onChange={handleChange}
                className="h-4 w-4 text-[#B29674] border-gray-300 rounded"
              />
              <label htmlFor="trial" className="text-gray-700">
                สินค้าทดลอง
              </label>
            </div>

            {/* Dimensions Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              <div className="md:col-span-4">
                <h4 className="text-lg font-medium text-gray-700">
                  ขนาดสินค้า
                </h4>
              </div>
              <div>
                <label
                  htmlFor="width"
                  className="block text-gray-700 font-medium mb-2"
                >
                  ความกว้าง (ซม.)
                </label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={formData.dimension.width}
                  onChange={handleDimensionChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  min="0"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="height"
                  className="block text-gray-700 font-medium mb-2"
                >
                  ความสูง (ซม.)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.dimension.height}
                  onChange={handleDimensionChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  min="0"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="depth"
                  className="block text-gray-700 font-medium mb-2"
                >
                  ความลึก (ซม.)
                </label>
                <input
                  type="number"
                  id="depth"
                  name="depth"
                  value={formData.dimension.depth}
                  onChange={handleDimensionChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  min="0"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-gray-700 font-medium mb-2"
                >
                  น้ำหนัก (กก.)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.dimension.weight}
                  onChange={handleDimensionChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Upload Thumbnails Section */}
            <div>
              <label
                htmlFor="thumbnail-upload"
                className="block text-gray-700 font-medium mb-2"
              >
                อัปโหลดรูปภาพหลัก (Thumbnails)
              </label>
              <input
                type="file"
                id="thumbnail-upload"
                name="thumbnails"
                accept="image/*"
                onChange={handleThumbnailChange}
                multiple
                className="hidden"
              />
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="thumbnail-upload"
                  className="bg-[#E7E2D8] text-gray-800 font-medium py-3 px-6 rounded-xl cursor-pointer hover:bg-[#d6cfc1] transition-colors duration-200"
                >
                  เลือกไฟล์
                </label>
                {formData.thumbnails.length > 0 && (
                  <span className="text-sm text-gray-600 truncate">
                    {formData.thumbnails.length} ไฟล์ที่ถูกเลือก
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Preview Section */}
            {formData.thumbnails.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-4">
                {formData.thumbnails.map((file, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Variants Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light text-gray-800 border-b border-gray-200 pb-2">
              รุ่นสินค้า (Variants)
            </h3>
            {formData.variants.map((variant, variantIndex) => (
              <div
                key={variantIndex}
                className="space-y-4 border border-gray-200 p-6 rounded-2xl bg-gray-50 relative"
              >
                <h4 className="text-lg font-bold text-gray-700">
                  Variant #{variantIndex + 1}
                </h4>

                {formData.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(variantIndex)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label
                      htmlFor={`skuID-${variantIndex}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      SKU ID
                    </label>
                    <input
                      type="text"
                      id={`skuID-${variantIndex}`}
                      name="skuID"
                      value={variant.skuID}
                      onChange={(e) => handleVariantChange(e, variantIndex)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`colorId-${variantIndex}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Color ID
                    </label>
                    <select
                      id={`colorId-${variantIndex}`}
                      name="colorId"
                      value={variant.colorId}
                      onChange={(e) => handleVariantChange(e, variantIndex)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674] appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled>
                        เลือก Color ID
                      </option>
                      <option value="66141445b23d6a2f442c4b57">
                        66141445b23d6a2f442c4b57
                      </option>
                      <option value="66141445b23d6a2f442c4b58">
                        66141445b23d6a2f442c4b58
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor={`price-${variantIndex}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      ราคา (บาท)
                    </label>
                    <input
                      type="number"
                      id={`price-${variantIndex}`}
                      name="price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(e, variantIndex)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`quantityInStock-${variantIndex}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      จำนวนในคลัง
                    </label>
                    <input
                      type="number"
                      id={`quantityInStock-${variantIndex}`}
                      name="quantityInStock"
                      value={variant.quantityInStock}
                      onChange={(e) => handleVariantChange(e, variantIndex)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                      required
                      min="0"
                    />
                  </div>

                  {/* Variant Image Upload Section (single image) */}
                  <div className="col-span-full space-y-4">
                    <label
                      htmlFor={`variant-image-${variantIndex}`}
                      className="block text-gray-700 font-medium mb-2"
                    >
                      อัปโหลดรูปภาพรุ่นสินค้า (1 ภาพ)
                    </label>
                    <input
                      type="file"
                      id={`variant-image-${variantIndex}`}
                      accept="image/*"
                      onChange={(e) =>
                        handleVariantImageChange(e, variantIndex)
                      }
                      className="hidden"
                    />
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor={`variant-image-${variantIndex}`}
                        className="bg-[#E7E2D8] text-gray-800 font-medium py-3 px-6 rounded-xl cursor-pointer hover:bg-[#d6cfc1] transition-colors duration-200"
                      >
                        เลือกไฟล์
                      </label>
                      {variant.image && (
                        <span className="text-sm text-gray-600 truncate">
                          {variant.image.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Variant Image Preview */}
                  {variant.image && (
                    <div className="flex flex-wrap gap-6 mt-4 col-span-full">
                      <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                          <img
                            src={URL.createObjectURL(variant.image)}
                            alt="Variant Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVariant}
              className="w-full py-3 px-8 rounded-3xl border border-dashed border-[#B29674] text-[#B29674] font-medium hover:bg-[#E7E2D8] transition-colors duration-200"
            >
              + เพิ่มรุ่นสินค้า
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="submit"
              className="bg-[#B29674] text-white font-bold py-3 px-8 rounded-3xl shadow-lg hover:bg-[#a18c6a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B29674] focus:ring-offset-2"
            >
              บันทึกสินค้า
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-3xl shadow-lg hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
