import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Boxes,
  Settings,
  User,
  LogOut,
  X,
  Menu,
  Search,
  Bell,
  TrendingUp,
  DollarSign,
  Calendar,
  PlusCircle,
  Receipt,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-screen bg-[#f8fafc] flex overflow-x-hidden">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto lg:ml-[250px] p-4 md:p-6 lg:p-8 custom-scrollbar">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <div className="relative w-64 md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search anything..."
                className="w-full rounded-2xl bg-white border border-gray-100 py-2.5 pl-10 pr-4 text-xs shadow-xs outline-none focus:border-pink-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full bg-white p-2.5 text-gray-500 shadow-xs hover:bg-pink-50 cursor-pointer">
              <Bell size={18} />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">3</span>
            </button>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl shadow-xs border border-gray-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white font-bold text-xs">A</div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-800">Admin</p>
                <p className="text-[9px] text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Welcome Back, Admin <span className="text-pink-600 text-xl">👑</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">Here's what's happening with your store today.</p>
          </div>
          <div className="flex items-center gap-2 bg-[#d91b5c] text-white px-4 py-2.5 rounded-2xl shadow-sm text-xs font-semibold self-start sm:self-auto">
            <Calendar size={16} />
            <div>
              <p className="text-[9px] text-pink-200 uppercase tracking-wider">Today</p>
              <p className="font-bold">May 15, 2026</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Sales" value="$12,450.00" icon={<DollarSign size={20} />} change="+12%" />
          <StatCard title="Total Orders" value="148" icon={<ShoppingCart size={20} />} change="+8%" />
          <StatCard title="Total Customers" value="89" icon={<Users size={20} />} change="+5%" />
          <StatCard title="Growth Rate" value="23.5%" icon={<TrendingUp size={20} />} change="+18%" />
        </div>

        {/* Central Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs text-center py-16">
          <LayoutDashboard size={48} className="mx-auto text-pink-400 mb-3" />
          <h2 className="text-lg font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
            System is fully active. Navigate through the menu to manage orders, products, and invoices.
          </p>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-pink-100 bg-white p-4 shadow-xs">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
        <span className="text-[10px] text-green-600 font-semibold">{change} from last month</span>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
        {icon}
      </div>
    </div>
  );
}