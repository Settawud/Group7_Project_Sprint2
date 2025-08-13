import { useEffect, useRef, useState } from "react";

function Icon({ children }) {
  return <span className="inline-flex h-5 w-5 items-center justify-center">{children}</span>;
}

export default function NavUserMenu({
  user = { name: "Guest" },
  onLogout = () => {}
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // ปิดเมื่อคลิกนอก/กด Esc
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      {/* ปุ่มโปรไฟล์ */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-3 py-1.5 text-sm shadow-sm hover:bg-amber-50"
      >
        <span className="h-6 w-6 rounded-full bg-stone-300/80 grid place-items-center">👤</span>
        <span className="hidden sm:block max-w-[8rem] truncate">{user?.name}</span>
        <svg width="16" height="16" viewBox="0 0 20 20" className={`transition ${open ? "rotate-180" : ""}`}>
          <path d="M5.5 7.5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </svg>
      </button>

      {/* เมนูเด้งลง */}
      <div
        ref={menuRef}
        role="menu"
        className={`
          absolute right-0 mt-2 w-64 rounded-2xl border border-amber-200 bg-white shadow-xl
          ring-1 ring-black/5 p-2
          origin-top-right transition
          ${open ? "scale-100 opacity-100 translate-y-0" : "pointer-events-none scale-95 opacity-0 -translate-y-1"}
        `}
      >
        <ul className="space-y-1 text-slate-700">
          <li>
            <a href="/account/profile" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-stone-100" role="menuitem">
              <Icon>🧑</Icon> <span>Profile</span>
            </a>
          </li>
          <li>
            <a href="/account/address" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-stone-100" role="menuitem">
              <Icon>🏠</Icon> <span>Address</span>
            </a>
          </li>
          <li>
            <a href="/account/purchase" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-stone-100" role="menuitem">
              <Icon>🧾</Icon> <span>Purchase</span>
            </a>
          </li>
          <li>
            <a href="/account/payment" className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-stone-100" role="menuitem">
              <Icon>💳</Icon> <span>Payment</span>
            </a>
          </li>

          <li className="my-1 border-t border-stone-200" />
          <li>
            <button
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full text-left flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-stone-100"
              role="menuitem"
            >
              <Icon>↩️</Icon> <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
