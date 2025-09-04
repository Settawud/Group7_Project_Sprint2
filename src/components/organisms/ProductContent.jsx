import { useContext, useState } from "react";
import { ValueContext } from "../../context/ValueContext";

const ProductContent = ({ product }) => {
  const {
    id,
    Name,
    Description = [],
    tag,
    material,
    trial,
    variants = [],
  } = product;

  const {cart,setCart} = useContext(ValueContext)

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

  function addToCart(name, color, quantity, price) {
    const item = {name: name, variantOption: color, quantity: quantity, price: price, itemChecked: false }
    console.log(item)
    setCart([...cart, item])
    //fetchCart
  }

  return (
    <div className="flex flex-col gap-3 text-black">
      <div className="text-3xl font-semibold leading-snug">{Name}</div>

      <div className="flex flex-wrap gap-2">
        {tag.map((t, index) => (
          <div
            key={index}
            className="inline-block px-2 py-0.5 text-sm font-medium bg-[#849E9150] text-[#849E91] rounded"
          >
            {t}
          </div>
        ))}
      </div>

      <div className="text-3xl font-bold">฿{price.toLocaleString()}</div>

      <hr className="my-3 border-[#B29675]" />

      <div className="space-y-3 text-sm">
        {Array.isArray(Description) ? (
          Description.map((text, index) => <p key={index}>{text}</p>)
        ) : (
          <p>{Description}</p>
        )}
      </div>

      <hr className="my-3 border-[#B29675]" />

      <div>
        <div className="pb-1 text-sm font-medium">Color</div>
        <div className="flex gap-2">
          {filteredVariants.map((v) => (
            <div
              key={v.skuID}
              onClick={() => setSelectedColor(v.variantOption)}
              className={`w-6 h-6 border rounded-full cursor-pointer hover:border-black ${
                selectedColor === v.variantOption ||
                (!selectedColor && v === filteredVariants[0])
                  ? "border-black"
                  : ""
              }`}
              style={{ backgroundColor: v.variantOption }}
            />
          ))}
        </div>
      </div>

      <hr className="my-3 border-[#B29675]" />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
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

      <hr className="my-3 border-[#B29675]" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
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
          onClick={() => addToCart(Name, selectedColor, quantity, price)}
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

      <div className="pt-4">
        <div className="pb-2 font-semibold">Product Information</div>
        <ul className="list-disc list-inside text-sm text-[#A8A8A8]">
          {currentVariant.dimensions &&
            Object.entries(currentVariant.dimensions)
              .filter(([k]) => k !== "unit")
              .map(([key, value]) => {
                const unit = currentVariant.dimensions.unit?.[key] || "";
                return (
                  <li key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value} {unit}
                  </li>
                );
              })}
          {material && <li>Material: {material}</li>}
        </ul>
      </div>
    </div>
  );
};

export default ProductContent;
