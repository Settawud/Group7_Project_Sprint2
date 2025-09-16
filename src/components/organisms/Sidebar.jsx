import { useState, useEffect } from "react";
import { Menu, LogOut, User, MapPin, Wallet, TicketPercent, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/users/me");
        const role = data?.user?.role || data?.role;
        setIsAdmin(role === "admin");
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  const sidebarClass = `
    top-16 left-0 z-40 h-[calc(100vh-64px)] p-6 bg-[#B29675] transition-all duration-300 fixed
    ${isMobileOpen ? "translate-x-0" : "translate-x-[-100%]"}
    ${isCollapsed ? "w-20" : "w-64"}
    lg:translate-x-0 lg:sticky lg:top-16
  `;

  const sidebarLabelClass = `${isCollapsed ? "hidden" : ""} sidebar-label`;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 text-[#B29675]"
        >
          <Menu className="h-6 w-6" />
          <span className="font-semibold">My Account</span>
        </button>
      </div>

      <aside className={sidebarClass}>
        <div className="flex flex-col h-full">
          <div className="mb-6 flex items-center justify-between text-base font-bold text-white">
            <span className={`flex items-center gap-2 ${sidebarLabelClass}`}>
              My Account
            </span>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden lg:flex items-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <nav className="mb-6 flex flex-col gap-4 indent-4 text-sm text-white">
            {[
              { label: "Profile", icon: <User className="w-4 h-4" />, onClick: () => {} },
              { label: "Address", icon: <MapPin className="w-4 h-4" />, onClick: () => {} },
              { label: "Coupons", icon: <TicketPercent className="w-4 h-4" />, onClick: () => { document.getElementById("coupons")?.scrollIntoView({ behavior: "smooth" }); } },
              ...(isAdmin ? [
                { label: "Add Product", icon: <PlusCircle className="w-4 h-4" />, onClick: () => navigate("/AddProductPage") },
                { label: "Add Coupon", icon: <TicketPercent className="w-4 h-4" />, onClick: () => { document.getElementById("create-coupon")?.scrollIntoView({ behavior: "smooth" }); } },
              ] : []),
              { label: "Purchase", icon: <Wallet className="w-4 h-4" />, onClick: () => {} },
            ].map(({ label, icon, onClick }) => (
              <button
                type="button"
                key={label}
                onClick={onClick}
                className="flex items-center gap-2 rounded py-2 hover:bg-[#A8A8A880] cursor-pointer text-left"
              >
                {icon}
                <span className={sidebarLabelClass}>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-2 rounded py-2 indent-2 text-sm text-white hover:bg-[#A8A8A880] cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span className={sidebarLabelClass}>Log out</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
