import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import CategoryCard from "../components/organisms/CategoryCard";
import ProductCard from "../components/organisms/ProductCard";
import ProductGrid from "../components/molecules/ProductGrid";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="bg-[#c4beb3]">
        <Container className="relative py-10">
  {/* ข้อความใหญ่มากด้านหลัง */}
  <div aria-hidden className="absolute inset-0 flex items-end justify-center pointer-events-none">
    <span className="select-none leading-none text-[16vw] md:text-[12vw] font-extrabold tracking-tight text-stone-500/30">
      Well-Being Lab
    </span>
  </div>

  {/* กล่องข้อความกลางหน้าพร้อมพื้นหลังนวล ๆ */}
  <div className="relative mx-auto max-w-3xl">
    <div className="text-center space-y-4 rounded-3xl bg-stone-300/60 px-6 py-10 backdrop-blur">
      <h1 className="text-4xl md:text-6xl tracking-tight text-white drop-shadow">
        ทำงานอย่างมีระดับ
      </h1>
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-white/90 drop-shadow">
        ในพื้นที่ที่สะท้อนตัวตนของคุณ
      </h2>
      <p className="text-base md:text-lg text-stone-700">
        ค้นพบเฟอร์นิเจอร์ที่ออกแบบตามหลักสรีรศาสตร์ 
      </p>
      <p className="text-base md:text-lg text-stone-700">ผสานดีไซน์อบอุ่นเป็นธรรมชาติ
        เพื่อสุขภาพและประสิทธิภาพที่ดีที่สุด</p>

      <div className="pt-2">
        <button className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 font-medium text-stone-900 shadow-lg shadow-amber-400/30 transition hover:-translate-y-0.5">
          ทดลองสินค้า ✨
        </button>
      </div>
    </div>
  </div>
</Container>


      </div>

      <Container>
        <Section title="เลือกช้อปตามหมวดหมู่">
          <div className="grid gap-6 sm:grid-cols-3">
            <CategoryCard
              title="Chairs"
              href="/c/chairs"
              subtitle="เก้าอี้เพื่อสุขภาพ"
            />
            <CategoryCard
              title="Tables"
              href="/c/tables"
              subtitle="โต๊ะปรับระดับ"
            />
            <CategoryCard
              title="Accessories"
              href="/c/accessories"
              subtitle="อุปกรณ์เสริม"
            />
          </div>
        </Section>

        <Section title="สินค้ายอดนิยม" subtitle="เลือกโดยลูกค้าจริง">
          <ProductGrid>
            <ProductCard name="Chair Pro-X" price={8990} rating={5} />
            <ProductCard name="Desk Lift-Up" price={12250} rating={4} />
            <ProductCard name="Monitor Arm" price={2490} rating={4} />
            <ProductCard name="Gaming Chair" price={9500} rating={5} />
          </ProductGrid>
        </Section>
      </Container>

      <Footer />
    </>
  );
}
