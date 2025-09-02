import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import CategoryCard from "../components/organisms/CategoryCard";
import ProductCard from "../components/organisms/ProductCard";
import ProductGrid from "../components/molecules/ProductGrid";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, Headphones, Wrench } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
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
  const vpRef = useRef(null);
  const [vpVisible, setVpVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setVpVisible(entry.isIntersecting), { threshold: 0.2 });
    if (vpRef.current) obs.observe(vpRef.current);
    return () => {
      try { if (vpRef.current) obs.unobserve(vpRef.current); } catch {}
      obs.disconnect?.();
    };
  }, []);
  return (
    <>
      <Navbar />

    
        <Container className="relative py-8 md:py-12">
          {/* hero (edge-to-edge blur) */}
          <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden min-h-[420px] md:min-h-[520px]">
            <img
              src="/images/EGT-AP-01-W-150.png"
              alt="Ergonomic workspace desk"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            {/* full overlay + side vignettes */}
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm" />
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 md:w-40 bg-gradient-to-l from-black/20 to-transparent" />
            {/* centered content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center space-y-4 px-6 py-12 md:py-16">
              <h1 className="text-5xl md:text-7xl tracking-tight text-white drop-shadow">Work, elevated.</h1>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white/95 drop-shadow">Purposeful design. Quiet power.</h2>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">Discover ergonomic furniture crafted for focus and comfort.</p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <Link
                  to="/pageproductlist"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#B29674] px-10 py-3.5 font-medium text-white shadow-xl ring-1 ring-black/10 transition hover:-translate-y-0.5"
                  aria-label="Shop now"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

        </Container>

        {/* full-width value props bar */}
        <div
          ref={vpRef}
          className={`mt-6 w-full bg-white/70 backdrop-blur-sm border-t border-b border-white/60 transition-all duration-500 ${vpVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <Container>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">ส่งทั่วประเทศ</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">รับประกันนาน 3 ปี</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Headphones className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">ปรึกษาผู้เชี่ยวชาญ</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Wrench className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">ประกอบง่ายใน 15 นาที</span>
              </div>
            </div>
          </Container>
        </div>
  

      <div className="bg-off-white py-8 md:py-12"> 
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
