import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import CategoryCard from "../components/organisms/CategoryCard";
import ProductCard from "../components/organisms/ProductCard";
import ProductGrid from "../components/molecules/ProductGrid";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ValueContext } from "../context/ValueContext";
// import products data
import { products, chairs, tables, accessories } from "../data/products";

// pick top 4 and compute display fields
const popular = products.slice(0, 4).map((p) => {
  // prefer the lowest priced non-trial variant; fallback to trial
  const normal = p.variants
    ?.filter((v) => v.variantName !== "สินค้าทดลอง")
    .sort((a, b) => a.price - b.price);
  const price = normal?.[0]?.price ??
    p.variants
      ?.filter((v) => v.variantName === "สินค้าทดลอง")
      .sort((a, b) => a.price - b.price)?.[0]?.price ?? "";

  return {
    id: p.productID,
    name: p.Name,
    img: p.image,
    price,
    rating: p.rating ?? 4,
    href: `/pageproductdetail?id=${encodeURIComponent(p.productID)}`,
  };
});


export default function HomePage() {
  const { addToCart } = useContext(ValueContext) || {};
  return (
    <>
      <Navbar />

    <div className="bg-[#c4beb3]">
        <Container className="relative py-8 md:py-12">
          {/* hero */}
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
            <img
              src="/images/EGT-AP-01-W-150.png"
              alt="Ergonomic workspace desk"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="relative z-10 text-center space-y-4 px-6 py-12 md:py-16 bg-black/30 backdrop-blur-sm">
              <h1 className="text-4xl md:text-6xl tracking-tight text-white drop-shadow">Work, elevated.</h1>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white/90 drop-shadow">Purposeful design. Quiet power.</h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">Discover ergonomic furniture crafted for focus and comfort.</p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <Link
                  to="/pageproductlist"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-medium text-stone-900 shadow-lg transition hover:-translate-y-0.5"
                  aria-label="Shop now"
                >
                  Shop Now
                </Link>
                {/* <a
                  href="#categories"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 font-medium text-white shadow-lg ring-1 ring-white/30 transition hover:-translate-y-0.5"
                >
                  Browse Categories
                </a> */}
              </div>
            </div>
          </div>

          {/* value props */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/70 backdrop-blur p-4 text-center">
              <p className="font-medium text-stone-800">Free shipping over ฿2,000</p>
            </div>
            <div className="rounded-xl bg-white/70 backdrop-blur p-4 text-center">
              <p className="font-medium text-stone-800">30-day returns</p>
            </div>
            <div className="rounded-xl bg-white/70 backdrop-blur p-4 text-center">
              <p className="font-medium text-stone-800">1-year warranty</p>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-[#ffffff] py-8 md:py-12"> 
      <Container> 
        <Section id="categories" title="Shop by Category">
          <div className="grid gap-6 sm:grid-cols-3">
            <CategoryCard
              title="Ergonomic Chairs"
              href="/pageproductlist?category=chairs"
              subtitle={`${chairs.length} items`}
              imageSrc="EGC-EF-01-B.png"
            />
            <CategoryCard
              title="Standing Tables"
              href="/pageproductlist?category=tables"
              subtitle={`${tables.length} items`}
              imageSrc="EGT-AP-01-W-120.png"
            />
            <CategoryCard
              title="Accessories"
              href="/pageproductlist?category=อุปกรณ์เสริม"
              subtitle={`${accessories.length} items`}
              imageSrc="EGA-FR-01.png"
            />
          </div>
        </Section>

        <Section
          title="Popular Picks"
          subtitle="Hand-picked for you"
          actions={<Link to="/pageproductlist" className="text-sm text-stone-600 hover:underline">View all</Link>}
        >
          <ProductGrid>
            {popular.map((p) => (
              <ProductCard
                key={p.id}
                img={p.img}
                name={p.name}
                price={p.price}
                rating={p.rating}
                href={p.href}
                onAdd={() =>
                  addToCart?.({
                    skuId: p.id,
                    image: `/images/${p.img}`,
                    name: p.name,
                    altText: p.name,
                    price: p.price,
                  }, 1)
                }
              />
            ))}
          </ProductGrid>
        </Section>
      </Container>
      </div>
      <Footer />
    </>
  );
}
