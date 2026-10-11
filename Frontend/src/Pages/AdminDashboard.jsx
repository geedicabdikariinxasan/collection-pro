function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const links = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "#" },
    { label: "Invoices", icon: FileText, path: "/invoices", active: true },
    { label: "Inventory / Stock", icon: Boxes, path: "#" },
    { label: "Reports", icon: BarChart3, path: "#" },
    { label: "Users", icon: User, path: "#" },
    { label: "Settings", icon: Settings, path: "#" },
    { label: "Logout", icon: LogOut, path: "/", isLogout: true }, // Waxaa lagu dhex daray Menu-ga hoostiisa
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative justify-between">
          
          <div>
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 text-white lg:hidden p-1 cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            <div className="border-b border-white/10 px-5 py-4 text-center flex flex-col items-center justify-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
              <h1 className="font-serif text-lg font-bold tracking-wider whitespace-nowrap">COLLECTION PRO</h1>
              <p className="text-[7px] tracking-[2px] text-pink-100 uppercase">WOMEN'S FASHION & CLOTHING</p>
            </div>

            <nav className="px-3 py-3 space-y-1">
              <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">Main Menu</p>
              {links.map(({ label, icon: Icon, path, active, isLogout }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMobileOpen(false);
                    if (isLogout) {
                      navigate("/");
                    } else if (path !== "#") {
                      navigate(path);
                    } else {
                      alert(`Bogga "${label}" dhawaan ayaa la dhisayaa!`);
                    }
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                    isLogout
                      ? "mt-4 bg-red-600/80 hover:bg-red-600 text-white font-bold shadow-sm"
                      : active
                      ? "bg-pink-500 font-semibold shadow-md text-white"
                      : "hover:bg-white/10 text-pink-50"
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 text-center border-t border-white/10 bg-black/10 shrink-0 mt-auto">
            <p className="font-serif text-[10px] italic text-pink-100">Style • Elegance • You</p>
            <p className="text-[7px] text-pink-300">© 2026 COLLECTION PRO</p>
          </div>
        </div>
      </aside>
    </>
  );
}