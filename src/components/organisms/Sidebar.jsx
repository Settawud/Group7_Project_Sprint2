import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sidebarClass = `
    top-0 left-0 z-50 h-screen p-6 bg-[#B29675] transition-all duration-300 fixed
    ${isMobileOpen ? "translate-x-0" : "translate-x-[-100%]"}
    ${isCollapsed ? "w-20" : "w-64"}
    lg:translate-x-0 lg:sticky lg:top-0
  `;

  const sidebarLabelClass = `${isCollapsed ? "hidden" : ""} sidebar-label`;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 text-[#B29675]"
        >
          <img src="./icon/Hamburger.svg" className="h-6 w-6" alt="Menu" />
          <span className="font-semibold">My Account</span>
        </button>
      </div>

      <aside className={sidebarClass}>
        <div className="flex flex-col h-full">
          <div className="mb-6 flex items-center justify-between text-base font-bold text-white">
            <span className={`flex items-center gap-2 ${sidebarLabelClass}`}>
              My Account
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center"
            >
              <img src="./icon/Hamburger.svg" alt="Toggle" />
            </button>
          </div>

          <nav className="mb-6 flex flex-col gap-4 indent-4 text-sm text-white">
            {[
              { label: "Profile", icon: "Profile" },
              { label: "Address", icon: "Address" },
              { label: "Purchase", icon: "Purchase", active: true },
              { label: "Payment", icon: "Payment" },
            ].map(({ label, icon, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded py-2 hover:bg-[#A8A8A880] cursor-pointer ${
                  active ? "bg-[#A8A8A830] hover:bg-[#A8A8A8]" : ""
                }`}
              >
                <img src={`./icon/${icon}.svg`} alt={label} />
                <span className={sidebarLabelClass}>{label}</span>
              </div>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-2 rounded py-2 indent-2 text-sm text-white hover:bg-[#A8A8A880] cursor-pointer">
            <img src="./icon/Logout.svg" alt="Logout" />
            <span className={sidebarLabelClass}>Log out</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
