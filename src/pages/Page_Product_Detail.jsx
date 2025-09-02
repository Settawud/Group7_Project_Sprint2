import StickyImage from "../components/organisms/StickyImage";
import ProductContent from "../components/organisms/ProductContent";
import ScrollableThumbnails from "../components/organisms/ScrollableThumbnails";
import UsersReviewSection from "../components/organisms/UsersReviewSection";
import { products } from "../data/products";
import Navbar from "../components/organisms/Navbar";
import { useSearchParams } from "react-router-dom";

const App = () => {
  const [searchParams] = useSearchParams();
  const selectedProductID = searchParams.get("id") || products[0]?.productID;
  const selectedProducts = products.filter((product) => product.productID === selectedProductID);
  const product = selectedProducts[0] || products[0];

  // Build images from product variants/images if available
  const variantImages = Array.isArray(product?.variants)
    ? product.variants
        .map((v) => v.image)
        .filter(Boolean)
        .map((img) => (String(img).startsWith("/") ? img : `/images/${img}`))
    : [];
  const images = variantImages.length > 0
    ? Array.from(new Set(variantImages))
    : [product?.image ? `/images/${product.image}` : "/images/logo.png"];

  const productData = {
    Name: product.Name,
    tag: product.tag,
    Description: product.Description,
    material: product.material,
    trial: product.trial,
    variants: product.variants,
  };

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
        <StickyImage src={product?.image ? `/images/${product.image}` : images[0]} />
        <ProductContent product={productData} />
      </div>
      <ScrollableThumbnails images={images} />
      <UsersReviewSection reviews={reviews} />
    </div>
  );
};

export default App;
