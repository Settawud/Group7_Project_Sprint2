import React, { useEffect, useState } from "react";
import Navbar from "../components/organisms/Navbar";
import { api } from "../lib/api";
export const AddProductPage = () => {
  const [colors, setColors] = useState([]);
  const [addColorOpen, setAddColorOpen] = useState(null); // variant index or null
  const [newColor, setNewColor] = useState({ name_th: "", name_en: "", hex: "#000000" });
  const [savingColor, setSavingColor] = useState(false);
  const [formData, setFormData] = useState({
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

  // Load colors for dropdown
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/colors");
        // Accept { items: [...] } or direct array fallback
        const items = Array.isArray(data) ? data : (data?.items || []);
        setColors(items);
      } catch (e) {
        console.warn("Failed to load colors", e);
      }
    })();
  }, []);

  const openAddColor = (variantIndex) => {
    setAddColorOpen(variantIndex);
    setNewColor({ name_th: "", name_en: "", hex: "#000000" });
  };

  const cancelAddColor = () => {
    setAddColorOpen(null);
  };

  const saveNewColor = async (variantIndex) => {
    try {
      const hexOk = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(newColor.hex || "").trim());
      if (!newColor.name_th && !newColor.name_en) {
        alert("Please enter at least one name (TH or EN)");
        return;
      }
      if (!hexOk) {
        alert("Invalid color hex (e.g., #FF0000)");
        return;
      }
      setSavingColor(true);
      const resp = await api.post("/colors", {
        name_th: newColor.name_th,
        name_en: newColor.name_en,
        hex: String(newColor.hex || "").trim(),
      });
      const item = resp?.data?.item || resp?.data?.color || resp?.data;
      if (!item?._id) {
        alert("Failed to create color");
        setSavingColor(false);
        return;
      }
      setColors((prev) => [...prev, item]);
      const newVariants = [...formData.variants];
      newVariants[variantIndex].colorId = item._id;
      setFormData({ ...formData, variants: newVariants });
      setAddColorOpen(null);
    } catch (e) {
      console.error("Failed to add color", e);
      alert("Failed to add color. You may need admin permissions.");
    } finally {
      setSavingColor(false);
    }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dimension: { ...formData.dimension, [name]: value },
    });
  };

  const handleThumbnailChange = (e) => {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    // Append to existing selection (allow many files)
    setFormData({ ...formData, thumbnails: [...formData.thumbnails, ...picked] });
    // Reset input value to allow re-picking the same files
    e.target.value = "";
  };

  const removeThumbnail = (index) => {
    const next = formData.thumbnails.filter((_, i) => i !== index);
    setFormData({ ...formData, thumbnails: next });
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
        alert("At least one variant is required");
        return;
      }
      if (variants.some((v) => !v.colorId)) {
        alert("Please select colorId for every variant");
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

      alert(`Product created! ID: ${productId}`);
      handleCancel();
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product");
    }
  };

  const handleCancel = () => {
    setFormData({
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
        Add New Product
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Name */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Product Name</label>
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
              <label className="block text-gray-700 font-medium mb-2">Description</label>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Chairs">Chairs</option>
                  <option value="Tables">Tables</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl"
                  placeholder="e.g., mouse pad, wrist rest"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Material</label>
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
              <label className="text-gray-700">Trial product</label>
            </div>

            {/* Dimensions (dimension) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Dimensions</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["width", "height", "depth", "weight"].map((key) => (
                  <div key={key}>
                    <label className="block text-gray-700 text-sm mb-1">
                      {key === 'width' ? 'Width' : key === 'height' ? 'Height' : key === 'depth' ? 'Depth' : 'Weight'}
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
            </div>

            {/* Thumbnails Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload main images — multiple allowed
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
                  Choose files
                </label>
                {formData.thumbnails.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {formData.thumbnails.length} files selected
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Previews */}
            {formData.thumbnails.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-4">
                {formData.thumbnails.map((file, index) => (
                  <div key={index} className="relative w-32 h-32 border rounded-lg overflow-hidden group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeThumbnail(index)}
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-600 rounded-full px-2 py-0.5 text-xs shadow"
                    aria-label="Remove this image"
                  >
                    Remove
                  </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variants Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light text-gray-800 border-b pb-2">Variants</h3>
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
                  <div className="flex gap-3 items-center relative">
                    <select
                      name="colorId"
                      value={variant.colorId}
                      onChange={(e) => handleVariantChange(e, variantIndex)}
                      className="w-full px-4 py-3 border rounded-xl"
                    >
                      <option value="" disabled>Select color (colorId)</option>
                      {colors.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name_th || c.name_en || c.hex || c._id}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => openAddColor(variantIndex)}
                      className="px-3 py-2 bg-[#E7E2D8] rounded-lg border hover:bg-[#ddd7cb]"
                      title="Add new color"
                    >
                      + New Color
                    </button>
                  </div>

                  {addColorOpen === variantIndex && (
                    <div className="absolute z-20 right-0 top-full mt-2 w-[28rem] max-w-[90vw] border rounded-xl p-4 bg-white space-y-3 shadow-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Color name (TH)</label>
                          <input
                            type="text"
                            value={newColor.name_th}
                            onChange={(e) => setNewColor({ ...newColor, name_th: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="e.g., Dark gray (TH)"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Color name (EN)</label>
                          <input
                            type="text"
                            value={newColor.name_en}
                            onChange={(e) => setNewColor({ ...newColor, name_en: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="e.g., Dark Gray"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Hex</label>
                          <input
                            type="text"
                            value={newColor.hex}
                            onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={cancelAddColor}
                          className="px-4 py-2 rounded-lg border"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={savingColor}
                          onClick={() => saveNewColor(variantIndex)}
                          className="px-4 py-2 rounded-lg bg-[#B29674] text-white disabled:opacity-50"
                        >
                          {savingColor ? "Saving..." : "Save color"}
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type="number"
                    name="price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(e, variantIndex)}
                    placeholder="Price (price)"
                    className="w-full px-4 py-3 border rounded-xl"
                    min="0"
                  />
                  <input
                    type="number"
                    name="quantityInStock"
                    value={variant.quantityInStock}
                    onChange={(e) => handleVariantChange(e, variantIndex)}
                    placeholder="In stock (quantityInStock)"
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
                    Choose image
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
              + Add variant
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="submit"
              className="bg-[#B29674] text-white py-3 px-8 rounded-3xl shadow-lg"
            >
              Save product
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 py-3 px-8 rounded-3xl shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
