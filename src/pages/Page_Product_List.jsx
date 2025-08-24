import { useState, useEffect } from "react";
import ProductFilterSortTags from "../components/organisms/ProductFilterSortTags";
import ProductGridList from "../components/organisms/ProductGridList";
import { products as rawProducts } from "../data/products";
import Navbar from "../components/organisms/Navbar";

const App = () => {
  const [filters, setFilters] = useState({
    category: null,
    space: null,
    price: null,
    availability: null,
  });

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

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen justify-center px-4 py-10 bg-[#fefdf9]">
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
    </div>
  );
};

export default App;
