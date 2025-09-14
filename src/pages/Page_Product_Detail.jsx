import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";

import StickyImage from "../components/organisms/StickyImage";
import ProductContent from "../components/organisms/ProductContent";
import ScrollableThumbnails from "../components/organisms/ScrollableThumbnails";
import UsersReviewSection from "../components/organisms/UsersReviewSection";
import Navbar from "../components/organisms/Navbar";

const Page_Product_Detail = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [images, setImages] = useState([]);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data.item;

        const colorResponses = await Promise.all(
          data.variants.map((v) =>
            api
              .get(`/colors/${v.colorId}`)
              .then((res) => ({ id: v.colorId, hex: res.data.item.hex }))
              .catch(() => ({ id: v.colorId, hex: "#D3D3D3" }))
          )
        );

        const colorMap = colorResponses.reduce((acc, color) => {
          acc[color.id] = color.hex;
          return acc;
        }, {});

        const mappedProducts = {
          _id: data._id,
          Name: data.name,
          Description: data.description,
          tag: data.tags,
          material: data.material,
          variants: data.variants.map((v) => ({
            _id: v._id,
            trial: v.trial,
            color: colorMap[v.colorId],
            price: v.price,
            quantityInStock: v.quantityInStock,
            dimensions: data.dimension,
          })),
        };

        const firstThumb = Array.isArray(data.thumbnails)
          ? (typeof data.thumbnails[0] === 'string' ? data.thumbnails[0] : data.thumbnails[0]?.url)
          : null;

        const variantImages = (data.variants || [])
          .map((v) => (typeof v.image === 'string' ? v.image : v.image?.url))
          .filter(Boolean);
        const allImages = [firstThumb, ...variantImages].filter(Boolean);

        setProductData({
          ...mappedProducts,
          image: firstThumb,
        });
        setImages(allImages);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">ไม่พบข้อมูลสินค้า</span>
      </div>
    );
  }

  return (
    <div className="bg-[#fefdf9]">
      <Navbar />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-10 mx-auto px-4 py-10">
        <StickyImage src={productData.image} />
        <ProductContent product={productData} />
      </div>
      <ScrollableThumbnails images={images} />
      <UsersReviewSection reviews={reviews} />
    </div>
  );
};

export default Page_Product_Detail;
