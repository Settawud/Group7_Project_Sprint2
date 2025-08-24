import StickyImage from "../components/organisms/StickyImage";
import ProductContent from "../components/organisms/ProductContent";
import ScrollableThumbnails from "../components/organisms/ScrollableThumbnails";
import UsersReviewSection from "../components/organisms/UsersReviewSection";
import { products } from "../data/products";
import Navbar from "../components/organisms/Navbar";

const App = () => {
  const images = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
    "/images/product4.jpg",
    "/images/product5.jpg",
  ];

  const selectedProductID = "EGC-001";
  const selectedProducts = products.filter(
    (product) => product.productID === selectedProductID
  );

  const productData = selectedProducts.map((product) => ({
    Name: product.Name,
    tag: product.tag,
    Description: product.Description,
    material: product.material,
    trial: product.trial,
    variants: product.variants,
  }))[0];

  const reviews = [
    {
      id: 1,
      name: "คุณธีระ",
      rating: 5.0,
      comment: "โต๊ะสวยมาก วัสดุดี แข็งแรง แต่ประกอบเองยากนิดหน่อย",
    },
    {
      id: 2,
      name: "คุณธีระ",
      rating: 5.0,
      comment: "ส่งไว ประกอบง่าย ใช้งานดีมากครับ ประทับใจ",
    },
    {
      id: 3,
      name: "คุณธีระ",
      rating: 5.0,
      comment: "สินค้าคุณภาพดีแต่สีไม่ตรงกับภาพเล็กน้อย",
    },
    {
      id: 4,
      name: "คุณธีระ",
      rating: 5.0,
      comment: "เหมาะกับการใช้งานในออฟฟิศมาก",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-10 mx-auto px-4 py-10 bg-[#fefdf9]">
        <StickyImage src={selectedProducts[0].image} />
        <ProductContent product={productData} />
      </div>
      <ScrollableThumbnails images={images} />
      <UsersReviewSection reviews={reviews} />
    </div>
  );
};

export default App;
