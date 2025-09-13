import { Link } from "react-router-dom";

const ProductCardList = ({ _id, imageSrc, title, tag, size, price }) => {

  return (
    <div className="w-full max-w-sm overflow-hidden bg-white border border-[#b29675] rounded-xl shadow transition-transform duration-300 ease-in-out hover:scale-105">
      <Link to={`/products/${_id}`}>
        <img src={imageSrc} alt={title} />
      </Link >
      <div className="p-4 space-y-3">
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
        <h3 className="text-xl text-black truncate overflow-hidden whitespace-nowrap">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#A8A8A8] truncate overflow-hidden whitespace-nowrap">
            {size}
          </span>
          <span className="text-2xl font-semibold text-black">฿{price}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2 text-white">
          <div className="flex items-center justify-center w-full h-12 bg-[#B29675] rounded-lg hover:bg-[#B2967590] transition"> {/*sm:w-2/3*/}
            <button className="text-lg">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
