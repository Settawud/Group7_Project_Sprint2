import Container from "../layout/Container";
import Input from "../atoms/Input";
import NavUserMenu from "./NavUserMenu"; // <— new

export default function Navbar() {
  const isAuth = true; // TODO: เปลี่ยนตาม state จริง

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50/70 backdrop-blur">
      <Container className="h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="font-semibold">Livin’ Lab</a>
          <nav className="hidden md:flex gap-6 text-stone-700">
            <a href="/c/chairs" className="hover:opacity-80">เก้าอี้เพื่อสุขภาพ</a>
            <a href="/c/tables" className="hover:opacity-80">โต๊ะปรับระดับ</a>
            <a href="/c/accessories" className="hover:opacity-80">อุปกรณ์เสริม</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Input placeholder="Search" className="w-64 hidden sm:block" />
          {isAuth ? (
            <NavUserMenu user={{ name: "GenMateF" }} onLogout={() => console.log("logout")} />
          ) : (
            <a href="/login" className="text-sm">เข้าสู่ระบบ</a>
          )}
          <a href="/cart" aria-label="cart">🛒</a>
        </div>
      </Container>
    </header>
  );
}
