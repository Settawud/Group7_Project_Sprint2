import Container from "../layout/Container";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-800 text-stone-100">
      <Container className="grid gap-8 py-10 md:grid-cols-4">
        <div><h4 className="font-semibold mb-3">Livin’ Lab</h4><ul className="space-y-2 text-stone-300"><li>เกี่ยวกับเรา</li><li>โชว์รูม</li><li>ร่วมงานกับเรา</li></ul></div>
        <div><h4 className="font-semibold mb-3">ช่วยเหลือ</h4><ul className="space-y-2 text-stone-300"><li>คำถามที่พบบ่อย</li><li>การจัดส่งและชำระเงิน</li><li>นโยบายการคืนสินค้า</li></ul></div>
        <div><h4 className="font-semibold mb-3">ติดต่อเรา</h4><p className="text-stone-300">123 ถ.พหลฯ กรุงเทพฯ 10110<br/>support@livinlab.th<br/>02-123-4567</p></div>
        <div><h4 className="font-semibold mb-3">ติดตามเรา</h4><div className="space-x-3">📘 📸 🐦</div></div>
      </Container>
      <div className="py-4 text-center text-sm text-stone-400">© 2025 Livin’ Lab. All rights reserved.</div>
    </footer>
  );
}
