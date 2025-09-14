import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [sort, setSort] = useState("Price High to Low");
  const search = searchParams.get("search") || "";
  const normalizeCategoryToBackend = (val) => {
    const s = String(val || "").trim().toLowerCase();
    if (!s) return null;
    // Strip parentheses content
    const base = s.split("(")[0].trim();
    const dict = new Map([
      ["chairs", "Chairs"],
      ["chair", "Chairs"],
      ["เก้าอี้", "Chairs"],
      ["โต๊ะ", "Tables"],
      ["tables", "Tables"],
      ["table", "Tables"],
      ["desk", "Tables"],
      ["desks", "Tables"],
      ["standing desk", "Tables"],
      ["standing desks", "Tables"],
      ["accessories", "Accessories"],
      ["accessory", "Accessories"],
      ["อุปกรณ์เสริม", "Accessories"],
      ["อุปกรณ์", "Accessories"],
    ]);
    return dict.get(base) || null;
  };

  const displayLabelFromBackend = (eng) => {
    const map = { Chairs: "Chairs(เก้าอี้)", Tables: "Tables(โต๊ะ)", Accessories: "Accessories(อุปกรณ์เสริม)" };
    return map[eng] || eng;
  };
  // Sync category from URL to filters (normalize lowercase to proper case for backend)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== filters.category) {
      const eng = normalizeCategoryToBackend(cat) || String(cat).split("(")[0].trim();
      const label = displayLabelFromBackend(eng);
      setFilters((prev) => ({ ...prev, category: label }));
    }
    // Mark filters as hydrated from URL on first pass
    setHydrated(true);
  }, [searchParams]);

  const getSortQuery = (sortValue) => {
    // We sort client-side; keep backend sort empty for now
    if (sortValue === "Price High to Low") return "";
    if (sortValue === "Price Low to High") return "";
    if (sortValue === "New In") return "";
    return null;
  };

  useEffect(() => {
    if (!hydrated) return; // wait until filters are synced from URL
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      const query = { page };

      if (filters.category) {
        // Convert user-friendly label or Thai/English synonyms to backend value
        const eng = normalizeCategoryToBackend(filters.category);
        if (eng) query.category = eng;
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

      // Update URL only when derived query differs from current params
      const current = new URLSearchParams(searchParams);
      // Keep display label for category in URL (e.g., "Chairs(เก้าอี้)")
      const urlParams = { ...query };
      if (filters.category) {
        urlParams.category = filters.category;
      }
      Object.entries(urlParams).forEach(([k, v]) => current.set(k, String(v)));
      const nextStr = current.toString();
      if (nextStr !== searchParams.toString()) {
        setSearchParams(current);
      }

      try {
        const { data } = await api.get("/products", { params: query });
        const items = Array.isArray(data?.items) ? data.items : [];

        // Keep backend order; only sort by price if selected
        const withPrice = items.map((p) => ({
          ...p,
          __minPrice: Array.isArray(p.variants) && p.variants.length
            ? Math.min(...p.variants.map((v) => Number(v.price || 0)))
            : 0,
        }));

        let sorted = withPrice.slice();
        if (sort === "Price High to Low") {
          sorted.sort((a, b) => (b.__minPrice || 0) - (a.__minPrice || 0));
        } else if (sort === "Price Low to High") {
          sorted.sort((a, b) => (a.__minPrice || 0) - (b.__minPrice || 0));
        }

        setProducts(sorted);
        setTotalPages(Math.ceil((data.total || 0) / 20));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sort, page, search, hydrated]);

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
    const trial = !!(product?.trial || (Array.isArray(product?.variants) && product.variants.some((v) => !!v.trial)));

    return {
      _id: product._id,
      imageSrc,
      title: product.name,
      tag: Array.isArray(product.tags) ? product.tags : [],
      size: safeSize,
      price: priceNum ? priceNum.toLocaleString() : "-",
      trial,
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
          {loading ? (
            <div className="py-20 text-center text-stone-600">Loading products…</div>
          ) : error ? (
            <div className="py-10 text-center text-red-600">{error}</div>
          ) : mappedProducts.length === 0 ? (
            <div className="py-20 text-center text-stone-500">No products found.</div>
          ) : (
            <ProductGridList
              products={mappedProducts}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page_Product_List;
