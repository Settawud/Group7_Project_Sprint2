import { useState, useEffect } from "react";
import ProductFilterSortTags from "../components/organisms/ProductFilterSortTags";
import ProductGridList from "../components/organisms/ProductGridList";
import { products as rawProducts } from "../data/products";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { useSearchParams } from "react-router-dom";

const App = () => {

  // เพิ่ม searchParams ในการดึงค่าพารามิเตอร์จาก URL
  const [searchParams] = useSearchParams();

  // category and search params are handled below with mapping

  const [filters, setFilters] = useState({
    category: null,
    space: null,
    price: null,
    availability: null,
    search: null,
  });

  const categoryMap = {
    chair: "เก้าอี้",
    chairs: "เก้าอี้",
    table: "โต๊ะ",
    tables: "โต๊ะ",
    accessories: "อุปกรณ์เสริม",
    // also accept Thai directly
    "เก้าอี้": "เก้าอี้",
    "โต๊ะ": "โต๊ะ",
    "อุปกรณ์เสริม": "อุปกรณ์เสริม",
  };

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      const key = String(cat).toLowerCase();
      const mapped = categoryMap[key] ?? cat;
      setFilters((f) => ({ ...f, category: mapped }));
    } else {
      setFilters((f) => ({ ...f, category: null }));
    }
  }, [searchParams]);

  const [sort, setSort] = useState("Price High to Low");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  
  useEffect(() => {
    const transformed = rawProducts.map((p) => {
      let selectedVariant;

      const normalVariants = p.variants
        .filter((v) => v.variantName !== "สินค้าทดลอง")
        .sort((a, b) => a.price - b.price);

      if (normalVariants.length > 0) {
        selectedVariant = normalVariants[0];
      } else {
        const trialVariants = p.variants
          .filter((v) => v.variantName === "สินค้าทดลอง")
          .sort((a, b) => a.price - b.price);
        selectedVariant = trialVariants[0] || null;
      }

      let sizeStr = "";
      if (selectedVariant) {
        const d = selectedVariant.dimensions;
        const u = d.unit;
        sizeStr = `${d.width} ${u.width} x ${d.depth} ${u.depth} x ${d.height} ${u.height}`;
      }

      return {
        id: p.productID,
        imageSrc: p.image,
        title: p.Name,
        tag: p.tag,
        category: p.category,
        space: p.space,
        size: sizeStr,
        price: selectedVariant ? selectedVariant.price : 999999999,
        allStocks: p.variants.map((v) => v.quantityInStock),
      };
    });

    setProducts(transformed);
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;

      if (filters.space && !p.space.includes(filters.space)) return false;

      if (filters.availability === "In Stock") {
        const hasStock = p.allStocks.some((q) => q > 0);
        if (!hasStock) return false;
      }

      if (filters.price) {
        const [min, max] = filters.price;
        if (p.price < min || p.price > max) return false;
      }

      if (filters.search) {
        const q = String(filters.search).toLowerCase();
        const inTitle = p.title?.toLowerCase().includes(q);
        const inTags = Array.isArray(p.tag) && p.tag.some((t) => String(t).toLowerCase().includes(q));
        const inSpace = Array.isArray(p.space) && p.space.some((s) => String(s).toLowerCase().includes(q));
        if (!(inTitle || inTags || inSpace)) return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  useEffect(() => {
    const sorted = [...filteredProducts];
    if (sort === "Price High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === "Price Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === "New In") {
      sorted.reverse();
    }
    setSortedProducts(sorted);
  }, [filteredProducts, sort]);

  // Read search query from URL: ?q=...
  useEffect(() => {
    const q = searchParams.get("q");
    setFilters((f) => ({ ...f, search: q || null }));
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="flex justify-center px-4 py-10 bg-[#fefdf9]">
          <div className="w-full">
            <ProductFilterSortTags
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
            />
            <ProductGridList products={sortedProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
