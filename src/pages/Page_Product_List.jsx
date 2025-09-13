import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/organisms/Navbar";
import ProductFilterSortTags from "../components/organisms/ProductFilterSortTags";
import ProductGridList from "../components/organisms/ProductGridList";

const Page_Product_List = () => {
  const [filters, setFilters] = useState({
    category: null,
    price: null,
    availability: null,
  });

  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sort, setSort] = useState("Price High to Low");
  const search = searchParams.get("search") || "";
  // Sync category from URL to filters (normalize lowercase to proper case for backend)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== filters.category) {
      const m = { chairs: "Chairs", tables: "Tables", accessories: "Accessories" };
      const norm = m[cat?.toLowerCase?.()] || cat;
      setFilters((prev) => ({ ...prev, category: norm }));
    }
  }, [searchParams]);

  const getSortQuery = (sortValue) => {
    if (sortValue === "Price High to Low") return "";
    if (sortValue === "Price Low to High") return "";
    if (sortValue === "New In") return "";
    return null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const query = { page };

      if (filters.category) {
        const m = { chairs: "Chairs", tables: "Tables", accessories: "Accessories" };
        query.category = m[filters.category?.toLowerCase?.()] || filters.category;
      }

      if (filters.availability === "In Stock") {
        query.availability = "instock";
      }

      if (filters.price) {
        query.minPrice = filters.price[0];
        query.maxPrice = filters.price[1];
      }

      const sortQuery = getSortQuery(sort);
      if (sortQuery) {
        query.sort = sortQuery;
      }

      if (search.trim()) {
        query.search = search.trim();
      }

      setSearchParams(query);

      try {
        const response = await axios.get("http://localhost:4000/api/v1/mongo/products", {
          params: query,
        });

        setProducts(response.data.items || []);
        setTotalPages(Math.ceil((response.data.total || 0) / 20));
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [filters, sort, page, search]);

  const mappedProducts = products.map((product) => {
    // Normalize image: prefer product thumbnail url, otherwise a variant image, otherwise fallback
    const thumb = Array.isArray(product?.thumbnails) ? product.thumbnails[0] : null;
    const thumbUrl = typeof thumb === "string" ? thumb : thumb?.url;
    const variantWithImage = Array.isArray(product?.variants)
      ? product.variants.find((v) => v?.image && (typeof v.image === "string" ? v.image : v.image.url))
      : null;
    const variantUrl = variantWithImage
      ? (typeof variantWithImage.image === "string" ? variantWithImage.image : variantWithImage.image?.url)
      : null;
    const imageSrc = thumbUrl || variantUrl || "/images/logoCutBackground2.png";

    const d = product?.dimension || {};
    const safeSize = [d.width, d.height, d.depth].every((n) => Number.isFinite(n))
      ? `${d.width}x${d.height}x${d.depth} cm`
      : "";
    const priceNum = Array.isArray(product?.variants) && product.variants[0]?.price
      ? Number(product.variants[0].price)
      : 0;

    return {
      _id: product._id,
      imageSrc,
      title: product.name,
      tag: Array.isArray(product.tags) ? product.tags : [],
      size: safeSize,
      price: priceNum ? priceNum.toLocaleString() : "-",
    };
  });

  return (
    <div className="bg-[#fefdf9]">
      <Navbar />
      <div className="flex min-h-screen justify-center px-4 py-10">
        <div className="w-full">
          <ProductFilterSortTags
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
          />
          <ProductGridList
            products={mappedProducts}
            page={page}
            setPage={setPage}
            totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Page_Product_List;
