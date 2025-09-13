import React, { useState } from "react";
import Navbar from "../components/organisms/Navbar";
import { api } from "../lib/api";
export const AddProductPage = () => {
  const [formData, setFormData] = useState({
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
        trial: false,
        image: null,
      },
    ],
  });

  // === Field Handlers ===
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dimension: { ...formData.dimension, [name]: value },
    });
  };

  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnails: Array.from(e.target.files) });
  };

  const handleVariantChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index][name] =
      type === "checkbox" ? checked : type === "number" ? Number(value) : value;
    setFormData({ ...formData, variants: newVariants });
  };

  const handleVariantImageChange = (e, index) => {
    const file = e.target.files[0] || null;
    const newVariants = [...formData.variants];
    newVariants[index].image = file;
    setFormData({ ...formData, variants: newVariants });
  };

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
          trial: false,
          image: null,
        },
      ],
    });
  };

  const handleRemoveVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  // === Submit Handler ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1) เตรียม payload JSON ให้ตรงกับ backend
      const tags = String(formData.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const dimension = {
        width: Number(formData.dimension.width || 0),
        height: Number(formData.dimension.height || 0),
        depth: Number(formData.dimension.depth || 0),
        weight: Number(formData.dimension.weight || 0),
      };

      const variants = formData.variants.map((v) => ({
        colorId: v.colorId,
        price: Number(v.price || 0),
        quantityInStock: Number(v.quantityInStock || 0),
        trial: !!v.trial,
      }));

      if (!variants.length) {
        alert("ต้องมีอย่างน้อย 1 variant");
        return;
      }
      if (variants.some((v) => !v.colorId)) {
        alert("กรุณาเลือก Color ID ให้ครบทุก variant");
        return;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        trial: !!formData.trial,
        tags,
        material: formData.material,
        thumbnails: [], // อัปโหลดทีหลัง
        dimension,
        variants,
      };

      // 2) สร้างสินค้า (JSON)
      const createRes = await api.post("/products", payload);
      const productId = createRes?.data?.item?._id;
      const createdVariants = createRes?.data?.item?.variants || [];
      if (!productId) throw new Error("Missing productId in response");

      // 3) อัปโหลดรูปหลัก (thumbnails) ทีละไฟล์
      for (const file of formData.thumbnails) {
        const fd = new FormData();
        fd.append("image", file);
        await api.post(`/products/${productId}/images`, fd);
      }

      // 4) อัปโหลดรูปของแต่ละ variant หากมี (แม็พตาม index)
      for (let i = 0; i < formData.variants.length; i++) {
        const file = formData.variants[i]?.image;
        const variantId = createdVariants[i]?._id;
        if (file && variantId) {
          const fd = new FormData();
          fd.append("image", file);
          await api.post(`/products/${productId}/variants/${variantId}/images`, fd);
        }
      }

      alert(`เพิ่มสินค้าเรียบร้อย! ID: ${productId}`);
      handleCancel();
    } catch (err) {
      console.error("Error creating product:", err);
      alert("ไม่สามารถเพิ่มสินค้าได้");
    }
  };

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
      dimension: { width: "", height: "", depth: "", weight: "" },
      variants: [
        {
          skuID: "",
          colorId: "",
          price: "",
          quantityInStock: "",
          trial: false,
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
          {/* Product Info */}
          <div className="space-y-6">
            {/* Product ID + Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Product ID
                </label>
                <input
                  type="text"
                  name="productID"
                  value={formData.productID}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  ชื่อสินค้า
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                รายละเอียดสินค้า
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border rounded-xl"
                required
              ></textarea>
            </div>

            {/* Category / Tags / Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
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
                <label className="block text-gray-700 font-medium mb-2">
                  Tags (แยกด้วยคอมม่า)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="เช่น: แผ่นรองเมาส์, รองข้อมือ"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  วัสดุ
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Trial Checkbox */}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                name="trial"
                checked={formData.trial}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label className="text-gray-700">สินค้าทดลอง</label>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {["width", "height", "depth", "weight"].map((key) => (
                <div key={key}>
                  <label className="block text-gray-700 font-medium mb-2">
                    {key}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData.dimension[key]}
                    onChange={handleDimensionChange}
                    className="w-full px-4 py-3 border rounded-xl"
                    min="0"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Thumbnails Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
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
                  className="bg-[#E7E2D8] py-3 px-6 rounded-xl cursor-pointer"
                >
                  เลือกไฟล์
                </label>
                {formData.thumbnails.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {formData.thumbnails.length} ไฟล์ที่ถูกเลือก
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Previews */}
            {formData.thumbnails.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-4">
                {formData.thumbnails.map((file, index) => (
                  <div key={index} className="w-32 h-32 border rounded-lg">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variants Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light text-gray-800 border-b pb-2">
              รุ่นสินค้า (Variants)
            </h3>
            {formData.variants.map((variant, variantIndex) => (
              <div
                key={variantIndex}
                className="space-y-4 border p-6 rounded-2xl bg-gray-50 relative"
              >
                <h4 className="text-lg font-bold">
                  Variant #{variantIndex + 1}
                </h4>

                {formData.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(variantIndex)}
                    className="absolute top-4 right-4 text-red-500"
                  >
                    ✕
                  </button>
                )}

                {/* Variant Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <input
                    type="text"
                    name="skuID"
                    value={variant.skuID}
                    onChange={(e) => handleVariantChange(e, variantIndex)}
                    placeholder="SKU ID"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <select
                    name="colorId"
                    value={variant.colorId}
                    onChange={(e) => handleVariantChange(e, variantIndex)}
                    className="w-full px-4 py-3 border rounded-xl"
                  >
                    <option value="" disabled>
                      เลือก Color ID
                    </option>
                    <option value="68c3920d4670b96d19e824ff">
                      68c3920d4670b96d19e824ff
                    </option>
                    <option value="66141445b23d6a2f442c4b58">
                      66141445b23d6a2f442c4b58
                    </option>
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(e, variantIndex)}
                    placeholder="ราคา"
                    className="w-full px-4 py-3 border rounded-xl"
                    min="0"
                  />
                  <input
                    type="number"
                    name="quantityInStock"
                    value={variant.quantityInStock}
                    onChange={(e) => handleVariantChange(e, variantIndex)}
                    placeholder="จำนวนในคลัง"
                    className="w-full px-4 py-3 border rounded-xl"
                    min="0"
                  />
                </div>

                {/* Variant Image Upload */}
                <div className="col-span-full">
                  <input
                    type="file"
                    id={`variant-image-${variantIndex}`}
                    accept="image/*"
                    onChange={(e) => handleVariantImageChange(e, variantIndex)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`variant-image-${variantIndex}`}
                    className="bg-[#E7E2D8] py-3 px-6 rounded-xl cursor-pointer"
                  >
                    เลือกไฟล์รูปภาพ
                  </label>
                  {variant.image && (
                    <span className="text-sm text-gray-600 ml-4">
                      {variant.image.name}
                    </span>
                  )}
                  {variant.image && (
                    <div className="mt-4 w-32 h-32 border rounded-lg">
                      <img
                        src={URL.createObjectURL(variant.image)}
                        alt="Variant Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddVariant}
              className="w-full py-3 px-8 border border-dashed rounded-3xl text-[#B29674] hover:bg-[#E7E2D8]"
            >
              + เพิ่มรุ่นสินค้า
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="submit"
              className="bg-[#B29674] text-white py-3 px-8 rounded-3xl shadow-lg"
            >
              บันทึกสินค้า
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 py-3 px-8 rounded-3xl shadow-lg"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
