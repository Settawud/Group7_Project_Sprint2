import ProductCardList from "./ProductCardList";

const ProductGridList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
      {products.map((product, index) => (
        <ProductCardList key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductGridList;
