import React, { useState } from "react";
import Navbar from "../components/organisms/Navbar";

export const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productID: "",
    Name: "",
    Description: "",
    category: "chairs",
    tag: "",
    material: "",
    space: "",
    isTrial: false,
    mainImages: [], // Array of objects, each with { file: File, altText: string }
    variants: [
      {
        skuID: "",
        variantName: "",
        variantOption: "",
        price: "",
        quantityInStock: "",
        availability: "In Stock",
        variantImages: [], // Now an array to hold multiple variant image objects

        dimensions: {
          width: "",
          height: "",
          depth: "",
          weight: "",
          unit: { width: "cm", height: "cm", depth: "cm", weight: "kg" },
        },
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

  // Handle changes for main image file input
  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Create an array of objects, with each object containing the file and an empty altText
    const newMainImages = files.map((file) => ({
      file: file,
      altText: "",
    }));
    setFormData({
      ...formData,
      mainImages: newMainImages,
    });
  };

  // Handle changes for individual main image alt text
  const handleMainAltTextChange = (e, index) => {
    const newMainImages = [...formData.mainImages];
    newMainImages[index].altText = e.target.value;
    setFormData({
      ...formData,
      mainImages: newMainImages,
    });
  };

  // Handle changes for variant fields (non-image)
  const handleVariantChange = (e, variantIndex) => {
    const { name, value, type, checked } = e.target;
    const newVariants = [...formData.variants];

    // Handle nested dimensions object
    if (name in newVariants[variantIndex].dimensions) {
      newVariants[variantIndex].dimensions[name] = value;
    } else {
      newVariants[variantIndex][name] =
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value;
    }

    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  // Handle file change for variant images (now allows multiple)
  const handleVariantImageChange = (e, variantIndex) => {
    const files = Array.from(e.target.files);
    const newVariantImages = files.map((file) => ({
      file: file,
      altText: "",
    }));
    const newVariants = [...formData.variants];
    newVariants[variantIndex].variantImages = newVariantImages;
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  // Handle changes for variant image alt text
  const handleVariantAltTextChange = (e, variantIndex, imageIndex) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].variantImages[imageIndex].altText =
      e.target.value;
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
          variantName: "",
          variantOption: "",
          price: "",
          quantityInStock: "",
          availability: "In Stock",
          variantImages: [],
          isTrial: false,
          dimensions: {
            width: "",
            height: "",
            depth: "",
            weight: "",
            unit: { width: "cm", height: "cm", depth: "cm", weight: "kg" },
          },
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
    // Prepare data for submission, converting comma-separated strings to arrays
    const submissionData = {
      ...formData,
      tag: formData.tag
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
      space: formData.space
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    };

    console.log("Form Data:", submissionData);
    // You would typically send this data to an API
    console.log("Product form submitted! Check the console for data.");

    // Clear the form after submission
    handleCancel();
  };

  // Handle form cancellation and reset
  const handleCancel = () => {
    setFormData({
      productID: "",
      Name: "",
      Description: "",
      category: "",
      tag: "",
      material: "",
      space: "",
      mainImages: [],
      variants: [
        {
          skuID: "",
          variantName: "",
          variantOption: "",
          price: "",
          quantityInStock: "",
          availability: "In Stock",
          variantImages: [],
          isTrial: false,
          dimensions: {
            width: "",
            height: "",
            depth: "",
            weight: "",
            unit: { width: "cm", height: "cm", depth: "cm", weight: "kg" },
          },
        },
      ],
    });
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-white p-12 rounded-3xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-4xl font-light text-gray-800 mb-8 text-center tracking-wide">
            Add Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Information Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-800 border-b border-gray-200 pb-2">
                Product Details
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
                    htmlFor="Name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="Description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="Description"
                  name="Description"
                  value={formData.Description}
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
                    htmlFor="tag"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
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
                    Material
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
                <div>
                  <label
                    htmlFor="space"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Space
                  </label>
                  <input
                    type="text"
                    id="space"
                    name="space"
                    value={formData.space}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                    placeholder="เช่น: Workspace, Bedroom"
                  />
                </div>
              </div>

              {/* อัปโหลดรูปภาพหลัก */}
              <div>
                <label
                  htmlFor="main-image-upload"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="main-image-upload"
                  name="imageFiles"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  multiple // Allow multiple file selection
                  className="hidden"
                />
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="main-image-upload"
                    className="bg-[#E7E2D8] text-gray-800 font-medium py-3 px-6 rounded-xl cursor-pointer hover:bg-[#d6cfc1] transition-colors duration-200"
                  >
                    Choose image
                  </label>
                  {formData.mainImages.length > 0 && (
                    <span className="text-sm text-gray-600 truncate">
                      {formData.mainImages.length} ไฟล์ที่ถูกเลือก
                    </span>
                  )}
                </div>
              </div>

              {/* Image Preview and Alt Text Inputs Section */}
              {formData.mainImages.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-4">
                  {formData.mainImages.map((img, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                        <img
                          src={URL.createObjectURL(img.file)}
                          alt={img.altText || `Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        name={`altText-${index}`}
                        value={img.altText}
                        onChange={(e) => handleMainAltTextChange(e, index)}
                        className="mt-2 w-32 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B29674] text-center"
                        placeholder={`Alt Text ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Variants Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-800 border-b border-gray-200 pb-2">
                (Variants)
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
                        htmlFor={`variantName-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        VariantName
                      </label>
                      <input
                        type="text"
                        id={`variantName-${variantIndex}`}
                        name="variantName"
                        value={variant.variantName}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`variantOption-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        ColorProduct
                      </label>
                      <input
                        type="text"
                        id={`variantOption-${variantIndex}`}
                        name="variantOption"
                        value={variant.variantOption}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`price-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Price
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
                        Quantity
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
                    <div>
                      <label
                        htmlFor={`availability-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Availability
                      </label>
                      <select
                        id={`availability-${variantIndex}`}
                        name="availability"
                        value={variant.availability}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674] appearance-none cursor-pointer"
                      >
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                        <option>Pre-order</option>
                      </select>
                    </div>
                    {/* Variant Image Upload Section (Updated) */}
                    <div className="col-span-full space-y-4">
                      <label
                        htmlFor={`variant-image-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Upload Image Variant
                      </label>
                      <input
                        type="file"
                        id={`variant-image-${variantIndex}`}
                        accept="image/*"
                        onChange={(e) =>
                          handleVariantImageChange(e, variantIndex)
                        }
                        multiple // Now allows multiple file selection
                        className="hidden"
                      />
                      <div className="flex items-center space-x-4">
                        <label
                          htmlFor={`variant-image-${variantIndex}`}
                          className="bg-[#E7E2D8] text-gray-800 font-medium py-3 px-6 rounded-xl cursor-pointer hover:bg-[#d6cfc1] transition-colors duration-200"
                        >
                          Choose Image
                        </label>
                        {variant.variantImages.length > 0 && (
                          <span className="text-sm text-gray-600 truncate">
                            {variant.variantImages.length} ไฟล์ที่ถูกเลือก
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Variant Image Preview and Alt Text Inputs */}
                    {variant.variantImages.length > 0 && (
                      <div className="flex flex-wrap gap-6 mt-4 col-span-full">
                        {variant.variantImages.map((img, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="flex flex-col items-center"
                          >
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                              <img
                                src={URL.createObjectURL(img.file)}
                                alt={
                                  img.altText ||
                                  `Variant Preview ${imageIndex + 1}`
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <input
                              type="text"
                              name={`variant-altText-${variantIndex}-${imageIndex}`}
                              value={img.altText}
                              onChange={(e) =>
                                handleVariantAltTextChange(
                                  e,
                                  variantIndex,
                                  imageIndex
                                )
                              }
                              className="mt-2 w-32 px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B29674] text-center"
                              placeholder={`Alt Text ${imageIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Checkbox for Trial Product */}
                    <div className="col-span-full flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id={`isTrial-${variantIndex}`}
                        name="isTrial"
                        checked={variant.isTrial}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="h-4 w-4 text-[#B29674] border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`isTrial-${variantIndex}`}
                        className="text-gray-700"
                      >
                        Trial
                      </label>
                    </div>
                  </div>

                  {/* Dimensions Section */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-gray-200 mt-4">
                    <div>
                      <label
                        htmlFor={`width-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        width (cm.)
                      </label>
                      <input
                        type="number"
                        id={`width-${variantIndex}`}
                        name="width"
                        value={variant.dimensions.width}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                        min="0"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`height-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        height (cm.)
                      </label>
                      <input
                        type="number"
                        id={`height-${variantIndex}`}
                        name="height"
                        value={variant.dimensions.height}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                        min="0"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`depth-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        depth (cm.)
                      </label>
                      <input
                        type="number"
                        id={`depth-${variantIndex}`}
                        name="depth"
                        value={variant.dimensions.depth}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                        min="0"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`weight-${variantIndex}`}
                        className="block text-gray-700 font-medium mb-2"
                      >
                        weight (kg.)
                      </label>
                      <input
                        type="number"
                        id={`weight-${variantIndex}`}
                        name="weight"
                        value={variant.dimensions.weight}
                        onChange={(e) => handleVariantChange(e, variantIndex)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B29674]"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVariant}
                className="w-full py-3 px-8 rounded-3xl border border-dashed border-[#B29674] text-[#B29674] font-medium hover:bg-[#E7E2D8] transition-colors duration-200"
              >
                + Add Variant
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                type="submit"
                className="bg-[#B29674] text-white font-bold py-3 px-8 rounded-3xl shadow-lg hover:bg-[#a18c6a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B29674] focus:ring-offset-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-3xl shadow-lg hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
