import { useContext, useState } from "react";
import { ValueContext } from "../../context/ValueContext";
import { ClipboardType } from "lucide-react";

function normalizePublicImage(p) {
  if (!p) return null;
  const s = String(p);
  if (/^https?:\/\//i.test(s)) return s;
  let cleaned = s.replace(/^\.\/+/, "");
  if (cleaned.startsWith("/images/")) return cleaned;
  if (cleaned.startsWith("images/")) return "/" + cleaned;
  const idx = cleaned.indexOf("images/");
  if (idx >= 0) return "/" + cleaned.slice(idx);
  return `/images/${cleaned}`;
}

const AddToCartModal = ({ product}) => {
  const {
    productID,
    image,
    altText,
    Name,
    Description = [],
    tag,
    material,
    trial,
    variants = [],
  } = product;

  const {cart,setCart, addToCart} = useContext(ValueContext)

  const [selected, setSelected] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSkuId, setSelectedSkuId] = useState(null);

  const filteredVariants = variants.filter((v) =>
    selected === "trial"
      ? v.variantName === "สินค้าทดลอง"
      : v.variantName !== "สินค้าทดลอง"
  );

  const currentVariant = selectedColor
    ? filteredVariants.find((v) => v.variantOption === selectedColor)
    : filteredVariants[0] || {};

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const quantityInStock = currentVariant.quantityInStock || 0;
  const price = currentVariant.price || 0;

  function handleSelectColor(skuId, color) {
    setSelectedColor(color)
    setSelectedSkuId(skuId)
  }



  return (
    <div className="flex flex-col gap-3 text-black">
      <div className="text-2xl font-semibold leading-snug">{Name}</div>
      <img src={normalizePublicImage(currentVariant.image)}  alt={`${Name}`} className="h-50 w-50 p-1 border-1 mx-auto rounded-sm border-gray-300 shadow-[0_2px_4px_1px_rgba(209,213,219,0.2)]"/>
          <div className="pt-4">
        <ul className="list-disc list-inside text-sm text-[#A8A8A8]">
 
    <li>
      {currentVariant.dimensions.width} {currentVariant.dimensions.unit.width} x{" "}
      {currentVariant.dimensions.depth} {currentVariant.dimensions.unit.depth} x{" "}
      {currentVariant.dimensions.height} {currentVariant.dimensions.unit.height}
    </li>

          {material && <li>Material: {material}</li>}
        </ul>
      </div>
      <div>
        <div className="pb-1 text-sm font-medium">Color</div>
        <div className="flex gap-2">
          {filteredVariants.map((v) => (
            <div
              key={v.skuID}
              onClick={() => handleSelectColor(v.skuID, v.variantOption)}
              className={`w-6 h-6 border rounded-full cursor-pointer hover:border-black ${
                selectedColor === v.variantOption ||
                (!selectedColor && v === filteredVariants[0])
                  ? "border-black"
                  : ""
              }`}
              style={{ backgroundColor: v.variantOption[1] }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full mt-2">
        <div className="flex flex-row gap-2 w-full">
          {trial && (
            <button
              onClick={() => {
                setSelected("trial");
                setSelectedColor(null);
              }}
              className={`flex-1 h-12 px-4 py-2 font-semibold rounded text-sm transition ${
                selected === "trial"
                  ? "bg-[#849E91] text-white hover:bg-[#849E9190] border-none"
                  : "border border-[#B29675] text-[#B29675] hover:bg-[#B2967590]"
              }`}
            >
              ทดลองใช้ ฿
              {variants.find((v) => v.variantName === "สินค้าทดลอง")?.price}
            </button>
          )}
          <button
            onClick={() => {
              setSelected("buy");
              setSelectedColor(null);
            }}
            className={`flex-1 h-12 px-4 py-2 font-semibold rounded text-sm transition ${
              selected === "buy"
                ? "bg-[#849E91] text-white hover:bg-[#849E9190] border-none"
                : "border border-[#B29675] text-[#B29675] hover:bg-[#B2967590]"
            }`}
          >
            ซื้อเดี๋ยวนี้ ฿
            {variants.find((v) => v.variantName !== "สินค้าทดลอง")?.price}
          </button>
        </div>
      </div>



      <div className="flex flex-row gap-2 w-full">
        <div
          className={`flex items-center justify-between h-12 px-4 py-2 border rounded transition w-full lg:w-1/2 ${
            quantityInStock === 0
              ? "border-[#B2967590] text-gray-400 cursor-not-allowed bg-[#B2967510]"
              : "border-[#B29675] hover:bg-[#B2967510] text-black"
          }`}
        >
          <button
            onClick={decrement}
            disabled={quantityInStock === 0}
            className={`px-2 text-lg rounded transition ${
              quantityInStock === 0
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-[#B2967590]"
            }`}
          >
            −
          </button>
          <span className="px-4 rounded">{quantity}</span>
          <button
            onClick={increment}
            disabled={quantityInStock === 0}
            className={`px-2 text-lg rounded transition ${
              quantityInStock === 0
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-[#B2967590]"
            }`}
          >
            +
          </button>
        </div>

        <button
          onClick={() => addToCart(productID, Name, selectedColor, quantity, price, normalizePublicImage(image), altText, selected, variants)}
          disabled={quantityInStock === 0}
          className={`h-12 px-4 py-2 rounded text-sm w-full lg:w-1/2 transition ${
            quantityInStock === 0
              ? "bg-[#B2967590] text-white cursor-not-allowed"
              : "bg-[#B29675] text-white hover:bg-[#B2967590]"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
