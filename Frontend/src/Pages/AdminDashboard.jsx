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
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard", active: true },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "Sales" },
    { label: "Invoices", icon: FileText, path: "/invoices" },
    { label: "Inventory ", icon: Boxes, path: "/inventory" },
    { label: "Users", icon: User, path: "#" },
    { label: "Settings", icon: Settings, path: "#" },
    { label: "Logout", icon: LogOut, path: "/", isLogout: true },
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

// Helper function to safely render any value and avoid React Error #31
function renderSafeText(val, fallback = "") {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string" || typeof val === "number") return val;
  if (typeof val === "object") {
    return val.name || val.title || val.customerName || val.email || val._id || fallback;
  }
  return String(val);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const BASE_URL = "https://collection-pro-backend.onrender.com/api";

  const fetchLiveMongoData = async () => {
    try {
      const [prodRes, custRes, ordRes, invRes] = await Promise.all([
        fetch(`${BASE_URL}/products`).catch(() => null),
        fetch(`${BASE_URL}/customers`).catch(() => null),
        fetch(`${BASE_URL}/orders`).catch(() => null),
        fetch(`${BASE_URL}/invoices`).catch(() => null),
      ]);

      const prodJson = prodRes && prodRes.ok ? await prodRes.json().catch(() => []) : [];
      const custJson = custRes && custRes.ok ? await custRes.json().catch(() => []) : [];
      const ordJson = ordRes && ordRes.ok ? await ordRes.json().catch(() => []) : [];
      
      // Fallback for Invoices from LocalStorage if /api/invoices returns 404
      let invJson = [];
      if (invRes && invRes.ok) {
        invJson = await invRes.json().catch(() => []);
      } else {
        invJson = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
      }

      const extractArray = (resData) => {
        if (Array.isArray(resData)) return resData;
        if (resData && Array.isArray(resData.data)) return resData.data;
        if (resData && Array.isArray(resData.products)) return resData.products;
        if (resData && Array.isArray(resData.orders)) return resData.orders;
        if (resData && Array.isArray(resData.customers)) return resData.customers;
        if (resData && Array.isArray(resData.invoices)) return resData.invoices;
        return [];
      };

      setProducts(extractArray(prodJson));
      setCustomers(extractArray(custJson));
      setOrders(extractArray(ordJson));
      setInvoices(extractArray(invJson));

    } catch (err) {
      console.error("MongoDB Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchLiveMongoData();
    const interval = setInterval(fetchLiveMongoData, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalProductsCount = products.length;
  const totalCustomersCount = customers.length;
  const totalOrdersCount = orders.length;
  const totalInvoicesCount = invoices.length;
  const totalSalesAmount = orders.reduce((sum, ord) => sum + Number(ord.totalAmount || ord.total || 0), 0);

  const recentOrders = [...orders].reverse().slice(0, 5);
  const lowStockProducts = products.filter((p) => Number(p.stock || p.quantity || 0) <= 10).slice(0, 5);
  const topSellingProducts = [...products].slice(0, 5);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
              <p className="font-bold">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* 5 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
          <MetricCard
            title="Total Products"
            value={totalProductsCount}
            icon={<Package size={18} className="text-pink-600" />}
            bgColor="bg-pink-50"
            iconBg="bg-pink-100"
            badge="MongoDB Live"
          />
          <MetricCard
            title="Total Customers"
            value={totalCustomersCount}
            icon={<Users size={18} className="text-purple-600" />}
            bgColor="bg-purple-50/60"
            iconBg="bg-purple-100"
            badge="MongoDB Live"
          />
          <MetricCard
            title="Total Orders"
            value={totalOrdersCount}
            icon={<ShoppingCart size={18} className="text-emerald-600" />}
            bgColor="bg-emerald-50/60"
            iconBg="bg-emerald-100"
            badge="MongoDB Live"
          />
          <MetricCard
            title="Total Sales"
            value={`$${totalSalesAmount.toFixed(2)}`}
            icon={<DollarSign size={18} className="text-blue-600" />}
            bgColor="bg-blue-50/60"
            iconBg="bg-blue-100"
            badge="MongoDB Live"
          />
          <MetricCard
            title="Total Invoices"
            value={totalInvoicesCount}
            icon={<FileText size={18} className="text-amber-600" />}
            bgColor="bg-amber-50/60"
            iconBg="bg-amber-100"
            badge="MongoDB Live"
          />
        </div>

        {/* Sales Chart & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Sales Overview</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-gray-900">${totalSalesAmount.toFixed(2)}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp size={12} /> Live Sync
                  </span>
                </div>
              </div>
              <select className="bg-gray-50 border border-gray-200 text-xs text-gray-600 rounded-xl px-2.5 py-1.5 outline-none font-medium">
                <option>This Month</option>
                <option>This Week</option>
              </select>
            </div>

            <div className="w-full h-44 relative mt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d91b5c" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d91b5c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 110 Q70 120 120 85 T250 60 T370 40 T500 20 L500 150 L0 150 Z"
                  fill="url(#gradient)"
                />
                <path
                  d="M0 110 Q70 120 120 85 T250 60 T370 40 T500 20"
                  fill="none"
                  stroke="#d91b5c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="85" r="4" fill="#d91b5c" />
                <circle cx="250" cy="60" r="4" fill="#d91b5c" />
                <circle cx="370" cy="40" r="4" fill="#d91b5c" />
                <circle cx="500" cy="20" r="5" fill="#d91b5c" className="animate-pulse" />
              </svg>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-3">
                <span>May 1</span>
                <span>May 4</span>
                <span>May 7</span>
                <span>May 10</span>
                <span>May 13</span>
                <span>May 15</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900">Recent Orders</h2>
              <button onClick={() => navigate("/orders")} className="text-xs font-semibold text-pink-600 hover:underline">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-100 text-[10px] uppercase font-bold">
                    <th className="pb-2">#</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Total</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium text-gray-800">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((ord, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/20">
                        <td className="py-2.5 font-semibold text-gray-500">ORD-{String(idx + 1001)}</td>
                        <td className="py-2.5">{renderSafeText(ord.customerName || ord.customer || ord.name, "Customer")}</td>
                        <td className="py-2.5 font-bold">${Number(ord.totalAmount || ord.total || 0).toFixed(2)}</td>
                        <td className="py-2.5 text-right">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            renderSafeText(ord.status) === "Delivered" ? "bg-emerald-100 text-emerald-700" :
                            renderSafeText(ord.status) === "Processing" ? "bg-blue-100 text-blue-700" :
                            "bg-amber-100 text-amber-700"
                          }`}>
                            {renderSafeText(ord.status, "Pending")}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-400">
                        No recent orders.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Selling & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Top Selling Products</h2>
              <button onClick={() => navigate("/products")} className="text-xs font-semibold text-pink-600 hover:underline">
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {topSellingProducts.length > 0 ? (
                topSellingProducts.map((prod, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded-xl text-center border border-gray-100 hover:shadow-xs transition">
                    <img
                      src={prod.image || prod.imageUrl || "https://images.unsplash.com/photo-1595777457583-95e059d581b8"}
                      alt=""
                      className="h-20 w-full object-cover rounded-lg mb-2"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8"; }}
                    />
                    <h3 className="text-[11px] font-bold text-gray-800 truncate">{renderSafeText(prod.name || prod.title, "Product")}</h3>
                    <p className="text-xs font-black text-pink-600">${Number(prod.price || 0).toFixed(2)}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-5 py-6 text-center text-gray-400 text-xs">
                  No products found.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate("/products")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-pink-100 bg-pink-50/50 hover:bg-pink-100/60 transition cursor-pointer text-pink-700 font-bold text-xs gap-1.5">
                <PlusCircle size={20} />
                <span>Add Product</span>
              </button>
              <button onClick={() => navigate("/orders")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-pink-100 bg-pink-50/50 hover:bg-pink-100/60 transition cursor-pointer text-pink-700 font-bold text-xs gap-1.5">
                <ShoppingCart size={20} />
                <span>New Order</span>
              </button>
              <button onClick={() => navigate("/invoices")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-pink-100 bg-pink-50/50 hover:bg-pink-100/60 transition cursor-pointer text-pink-700 font-bold text-xs gap-1.5">
                <Receipt size={20} />
                <span>View Invoices</span>
              </button>
              <button onClick={() => navigate("/products")} className="flex flex-col items-center justify-center p-4 rounded-xl border border-pink-100 bg-pink-50/50 hover:bg-pink-100/60 transition cursor-pointer text-pink-700 font-bold text-xs gap-1.5">
                <Boxes size={20} />
                <span>Check Stock</span>
              </button>
            </div>
          </div>
        </div>

        {/* Low Stock Table & Promo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <AlertCircle size={16} className="text-red-500" />
                <h2 className="text-sm font-bold text-gray-900">Recent Low Stock Products</h2>
              </div>
              <button onClick={() => navigate("/products")} className="text-xs font-semibold text-pink-600 hover:underline">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-100 text-[10px] uppercase font-bold">
                    <th className="pb-2">#</th>
                    <th className="pb-2">Product Name</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Stock</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium text-gray-800">
                  {lowStockProducts.length > 0 ? (
                    lowStockProducts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-2.5 text-gray-400">{idx + 1}</td>
                        <td className="py-2.5 font-bold">{renderSafeText(item.name || item.title, "Product")}</td>
                        <td className="py-2.5 text-gray-500">{renderSafeText(item.category, "General")}</td>
                        <td className="py-2.5 text-red-600 font-black">{item.stock || item.quantity || 0}</td>
                        <td className="py-2.5">
                          <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-bold">
                            Low Stock
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <button onClick={() => navigate("/products")} className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg cursor-pointer">
                            Restock
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-400 text-xs">
                        All products have sufficient stock!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-200 p-6 rounded-2xl border border-pink-200 shadow-xs flex items-center justify-between relative overflow-hidden">
            <div className="z-10 max-w-[220px]">
              <div className="flex items-center gap-1 text-pink-600 font-bold text-[10px] uppercase tracking-wider mb-1">
                <span>👗 COLLECTION PRO</span>
              </div>
              <h3 className="font-serif text-xl font-black text-gray-900 leading-tight mb-2">
                Fashion Makes You Confident
              </h3>
              <button
                onClick={() => navigate("/products")}
                className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition cursor-pointer mt-2"
              >
                <span>View Products</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"
              alt="Fashion"
              className="h-36 w-36 object-cover rounded-2xl shadow-md border-2 border-white transform rotate-3"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, bgColor, iconBg, badge }) {
  return (
    <div className={`${bgColor} p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">{title}</span>
        <div className={`h-8 w-8 rounded-xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-xl font-black text-gray-900">{value}</p>
        <p className="text-[9px] font-bold text-gray-500 mt-1">{badge}</p>
      </div>
    </div>
  );
}