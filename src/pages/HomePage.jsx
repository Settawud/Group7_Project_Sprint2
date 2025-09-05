import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import CategoryCard from "../components/organisms/CategoryCard";
import ProductCard from "../components/organisms/ProductCard";
import ProductGrid from "../components/molecules/ProductGrid";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, Headphones, Wrench, ArrowRight, Heart, Gem, Award, Quote } from "lucide-react";
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
  const [fbName, setFbName] = useState("");
  const [fbEmail, setFbEmail] = useState("");
  const [fbMsg, setFbMsg] = useState("");
  const [fbSent, setFbSent] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => setVpVisible(entry.isIntersecting), { threshold: 0.2 });
    if (vpRef.current) obs.observe(vpRef.current);
    return () => {
      try { if (vpRef.current) obs.unobserve(vpRef.current); } catch {}
      obs.disconnect?.();
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">

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
              <div className="mt-8 md:mt-10 flex items-center justify-center gap-3">
                <Link
                  to="/pageproductlist"
                  aria-label="Shop now"
                  className="relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#B29674] to-[#c8a883] px-10 py-3.5 text-base md:text-lg font-semibold text-white shadow-[0_10px_20px_rgba(178,150,116,0.45)] ring-1 ring-black/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(178,150,116,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 -mr-1" />
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 sm:divide-x divide-stone-200/60">
              <div className="flex items-center justify-center gap-2">
                <Truck className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">Nationwide Shipping</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">3‑Year Warranty</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Headphones className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">Expert Support</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Wrench className="w-5 h-5 text-[#B29675]" />
                <span className="text-sm text-[#49453A]">Easy 15‑min Assembly</span>
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
        {/* About Us section */}
      <Section
  title="Invest in Better Health"
  subtitle="Why choose Livin' Lab? Because we care about design, premium materials, and details that enhance your focus."
  className="text-center py-16"
>
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <Heart className="w-10 h-10 mx-auto text-[#B29675]" />
        <h4 className="mt-4 font-semibold">Designed for Health</h4>
        <p className="mt-2 text-sm text-stone-600">
          Ergonomic support to reduce fatigue and relieve office syndrome, so you can stay focused longer.
        </p>
      </div>
      <div>
        <Gem className="w-10 h-10 mx-auto text-[#B29675]" />
        <h4 className="mt-4 font-semibold">Premium Materials</h4>
        <p className="mt-2 text-sm text-stone-600">
        Durable structure, tested for everyday use, built to last with confidence.
        </p>
      </div>
      <div>
        <Award className="w-10 h-10 mx-auto text-[#B29675]" />
        <h4 className="mt-4 font-semibold">Trusted by Customers</h4>
        <p className="mt-2 text-sm text-stone-600">
          With reliable warranty and attentive after-sales service.
        </p>
      </div>
    </div>
  </div>
</Section>



        {/* Testimonials */}
        <Section title="What Our Customers Say">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <figure className="rounded-2xl bg-white ring-1 ring-black/5 p-6 shadow-sm">
              <Quote className="w-6 h-6 text-[#B29675]" />
              <blockquote className="mt-3 text-stone-700">I can work longer with less strain. Clear assembly, solid materials — exceeded expectations.</blockquote>
              <figcaption className="mt-3 text-sm text-stone-500">– K. Somsri, Graphic Designer</figcaption>
            </figure>
            <figure className="rounded-2xl bg-white ring-1 ring-black/5 p-6 shadow-sm">
              <Quote className="w-6 h-6 text-[#B29675]" />
              <blockquote className="mt-3 text-stone-700">Stable desk, quiet height adjustment, and excellent support. Big productivity boost.</blockquote>
              <figcaption className="mt-3 text-sm text-stone-500">– Aek, Full‑Stack Developer</figcaption>
            </figure>
          </div>
        </Section>

        {/* FAQ / Feedback form */}
        <Section title="Questions or Feedback?" subtitle="Send us a message — our team will get back quickly.">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!fbName || !fbEmail || !fbMsg) return;
              setFbSent(true);
              setFbName("");
              setFbEmail("");
              setFbMsg("");
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              className="rounded-xl border border-stone-300 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Your name"
              value={fbName}
              onChange={(e) => setFbName(e.target.value)}
              required
            />
            <input
              type="email"
              className="rounded-xl border border-stone-300 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
              placeholder="Email"
              value={fbEmail}
              onChange={(e) => setFbEmail(e.target.value)}
              required
            />
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
              <textarea
                rows={3}
                className="rounded-xl border border-stone-300 bg-white/80 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300"
                placeholder="Type your question or message"
                value={fbMsg}
                onChange={(e) => setFbMsg(e.target.value)}
                required
              />
              <button
                type="submit"
                className="h-12 md:h-auto md:self-stretch rounded-xl bg-[#B29675] px-6 text-white font-semibold hover:bg-[#a68968] transition"
              >
                Send Message
              </button>
            </div>
            {fbSent && (
              <p className="md:col-span-3 text-sm text-green-700">Thanks! Your message has been received.</p>
            )}
          </form>
        </Section>
      </Container>
      </div>
      </main>
      <Footer />
    </div>
  );
}
