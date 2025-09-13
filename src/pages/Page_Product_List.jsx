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
        query.category = filters.category;
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

  const mappedProducts = products.map(product => ({
    _id: product._id,
    imageSrc: product.thumbnails[0],
    title: product.name,
    tag: product.tags,
    size: `${product.dimension.width}x${product.dimension.height}x${product.dimension.depth} cm`,
    price: product.variants[0].price.toLocaleString(),
  }));

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
