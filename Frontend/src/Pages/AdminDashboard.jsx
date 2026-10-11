import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  FileText,
  Boxes,
  Settings,
  Bell,
  Search,
  User,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env?.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://collection-pro-backend.onrender.com";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, active: true, path: "/admin-dashboard" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Customers", icon: Users, path: "/customers" },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Sales", icon: BarChart3, path: "#" },
    { name: "Invoices", icon: FileText, path: "/invoices" },
    { name: "Inventory / Stock", icon: Boxes, path: "#" },
    { name: "Reports", icon: BarChart3, path: "#" },
    { name: "Users", icon: Users, path: "#" },
    { name: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-[260px] bg-gradient-to-b from-pink-700 via-pink-800 to-rose-950 text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative justify-between">
          
          <div>
            <button 
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 text-white lg:hidden p-1 cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            <div className="border-b border-white/10 px-6 py-4 text-center flex flex-col items-center justify-center shrink-0">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">
                👗
              </div>
              <h1 className="text-base font-extrabold tracking-wider whitespace-nowrap">
                COLLECTION <span className="text-pink-200">PRO</span>
              </h1>
              <p className="text-[7px] tracking-[2.5px] text-pink-100 uppercase font-semibold">
                WOMEN'S FASHION & CLOTHING
              </p>
            </div>

            <nav className="px-3 py-2 space-y-1">
              <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">
                Main Menu
              </p>
              {menu.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setMobileOpen(false);
                      if (item.name === "Products") navigate("/products");
                      else if (item.name === "Customers") navigate("/customers");
                      else if (item.name === "Dashboard") navigate("/admin-dashboard");
                      else if (item.name === "Orders") navigate("/orders");
                      else if (item.name === "Invoices") navigate("/invoices");
                      else alert(`Bogga "${item.name}" dhawaan ayaa la dhisayaa!`);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      item.active
                        ? "bg-pink-500 text-white shadow-md font-bold"
                        : "text-pink-50 hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="px-4 py-3 text-center border-t border-white/10 bg-black/20 flex flex-col gap-1.5 shrink-0 my-2">
            <button
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-2.5 text-xs font-bold text-white hover:bg-red-600 transition cursor-pointer shadow-md"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
            <div>
              <p className="font-serif text-[10px] italic text-pink-100">Style • Elegance • You</p>
              <p className="text-[7px] text-pink-300">© 2026 COLLECTION PRO</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-4 md:px-6 backdrop-blur shadow-xs">
      <div className="flex items-center gap-3 w-full max-w-[380px]">
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-xl bg-gray-50 py-2 pl-9 pr-3 text-xs outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-pink-200"
          />
        </div>
      </div>

      <div className="ml-2 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer hidden sm:block">
          <Bell size={19} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xs">
            A
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-gray-800">Admin</p>
            <p className="text-[9px] text-gray-400">Administrator</p>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [liveStats, setLiveStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalSales: 0,
    totalInvoices: 0
  });

  const [recentOrdersList, setRecentOrdersList] = useState([]);

  useEffect(() => {
    fetchLiveStats();
  }, []);

  const fetchLiveStats = async () => {
    try {
      const prodRes = await axios.get(`${API_URL}/api/products`);
      const custRes = await axios.get(`${API_URL}/api/customers`);
      const invoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");

      setLiveStats({
        totalProducts: prodRes.data.length || 0,
        totalCustomers: custRes.data.length || 0,
        totalOrders: invoices.length || 0,
        totalSales: invoices.reduce((sum, i) => sum + (i.totalAmount || 0), 0),
        totalInvoices: invoices.length || 0
      });

      setRecentOrdersList(invoices.slice(0, 5));
    } catch (err) {
      console.error("Error fetching live dashboard stats:", err);
    }
  };

  const statCards = [
    { title: "Total Products", value: liveStats.totalProducts },
    { title: "Total Customers", value: liveStats.totalCustomers },
    { title: "Total Orders", value: liveStats.totalOrders },
    { title: "Total Sales", value: `$${liveStats.totalSales.toFixed(2)}` },
    { title: "Total Invoices", value: liveStats.totalInvoices }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f8fb] text-gray-900 flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[260px]">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Welcome Back, Admin 👑
              </h1>
              <p className="text-xs text-gray-500">
                Here's what's happening with your store today (Live Database Synchronized).
              </p>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-1.5 shadow-xs ring-1 ring-gray-100">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-100 text-pink-600 text-xs">
                📅
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Today</p>
                <p className="text-[9px] text-gray-400">Live</p>
              </div>
            </div>
          </div>

          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {statCards.map((stat, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                <p className="text-xs text-gray-500">{stat.title}</p>
                <h3 className="mt-1 text-xl font-bold text-pink-600">{stat.value}</h3>
                <p className="text-[9px] text-green-600 font-bold mt-1">● Synced with DB</p>
              </div>
            ))}
          </section>

          <section className="mb-6 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-5">
            
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Sales Overview (Live Chart)</h2>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">
                  Total: ${liveStats.totalSales.toFixed(2)}
                </span>
              </div>
              
              <div className="relative h-[180px] w-full flex items-end">
                <svg viewBox="0 0 700 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <defs>
                    <linearGradient id="dashboardSalesGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 140 C120 100, 250 160, 400 70 S580 30, 700 15 L700 180 L0 180 Z" fill="url(#dashboardSalesGrad)" />
                  <path d="M0 140 C120 100, 250 160, 400 70 S580 30, 700 15" fill="none" stroke="#ec4899" strokeWidth="3" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100">
                  <span>Day 1</span>
                  <span>Day 5</span>
                  <span>Day 10</span>
                  <span>Day 15</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">Recent Orders</h2>
                <span className="text-xs text-pink-600 font-semibold">Live Feed</span>
              </div>

              <div className="overflow-x-auto flex-1">
                {recentOrdersList.length > 0 ? (
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-gray-400">
                        <th className="pb-2">Invoice</th>
                        <th className="pb-2">Customer</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {recentOrdersList.map((ord) => (
                        <tr key={ord.id} className="hover:bg-pink-50/30">
                          <td className="py-2.5 font-bold text-gray-800">{ord.id}</td>
                          <td className="py-2.5 text-gray-600 truncate max-w-[100px]">{ord.customerName}</td>
                          <td className="py-2.5 font-bold text-pink-600">${ord.totalAmount?.toFixed(2)}</td>
                          <td className="py-2.5 text-right">
                            <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-[9px] font-bold">
                              {ord.status || "Unpaid"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs italic py-12">
                    No recent orders found. Create orders from Orders page.
                  </div>
                )}
              </div>
            </div>

          </section>

          <footer className="border-t border-gray-200 py-4 text-center mt-auto">
            <p className="text-[11px] text-gray-400">
              © 2026 COLLECTION PRO • Style • Elegance • You
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}