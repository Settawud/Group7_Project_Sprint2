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
      <div className="bg-stone-300/50">
        <Container className="py-16">
          <div className="text-center space-y-3">
            <p className="text-stone-700">Working ทำงานอย่างมีระดับ GenMate F Style</p>
            <h1 className="text-5xl font-bold text-stone-700">Well-Being Lab</h1>
          </div>
        </Container>
      </div>

      <Container>
        <Section title="เลือกช้อปตามหมวดหมู่">
          <div className="grid gap-6 sm:grid-cols-3">
            <CategoryCard title="Chairs" href="/c/chairs" subtitle="เก้าอี้เพื่อสุขภาพ" />
            <CategoryCard title="Tables" href="/c/tables" subtitle="โต๊ะปรับระดับ" />
            <CategoryCard title="Accessories" href="/c/accessories" subtitle="อุปกรณ์เสริม" />
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
