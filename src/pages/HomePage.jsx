import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import CategoryCard from "../components/organisms/CategoryCard";
import ProductCard from "../components/organisms/ProductCard";
import ProductGrid from "../components/molecules/ProductGrid";
// import products data
import { products, chairs, tables, accessories } from "../data/products";
const popular = products.slice(0, 4);


export default function HomePage() {
  return (
    <>
      <Navbar />

    <div className="bg-[#c4beb3]">
        <Container className="relative py-10">
          {/* background word */}
          <div aria-hidden className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <span className="select-none leading-none text-[16vw] md:text-[12vw] font-extrabold tracking-tight text-stone-500/30">
              Well-Being Lab
            </span>
          </div>

          {/* hero */}
          <div className="relative mx-auto max-w-3xl">
            <div className="text-center space-y-4 rounded-3xl bg-stone-300/60 px-6 py-10 backdrop-blur">
              <h1 className="text-4xl md:text-6xl tracking-tight text-white drop-shadow">Work, elevated.</h1>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white/90 drop-shadow">Purposeful design. Quiet power.</h2>
              <p className="text-base md:text-lg text-stone-700">Discover ergonomic furniture crafted for focus and comfort.</p>
              <div className="pt-2">
                <button className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-medium text-stone-900 shadow-lg transition hover:-translate-y-0.5">
                  Explore collection
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <Section title="Shop by Category">
          <div className="grid gap-6 sm:grid-cols-3">
            <CategoryCard title="Chairs" href="/pageproductlist?category=chair" subtitle={`${chairs.length} items`} />
            <CategoryCard title="Tables" href="/pageproductlist?category=table" subtitle={`${tables.length} items`} />
            <CategoryCard title="Accessories" href="/pageproductlist?category=อุปกรณ์เสริม" subtitle={`${accessories.length} items`} />
          </div>
        </Section>

        <Section title="Popular Picks" subtitle="Hand-picked for you">
          <ProductGrid>
            {popular.map((p) => (
              <ProductCard
                key={p.productID}
                name={p.Name}
                price={p.variants?.[0]?.price ?? ""}
                // rating not in data objects; fallback to 4 if needed
                rating={p.rating ?? 4}
              />
            ))}
          </ProductGrid>
        </Section>
      </Container>
      <Footer />
    </>
  );
}
