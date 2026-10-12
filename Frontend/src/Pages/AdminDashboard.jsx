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
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const links = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard", active: true },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "#" },
    { label: "Invoices", icon: FileText, path: "/invoices" },
    { label: "Inventory / Stock", icon: Boxes, path: "#" },
    { label: "Reports", icon: BarChart3, path: "#" },
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

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    loadLiveDashboardData();
    window.addEventListener("storage", loadLiveDashboardData);
    return () => window.removeEventListener("storage", loadLiveDashboardData);
  }, []);

  const loadLiveDashboardData = () => {
    const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    const rawOrders = JSON.parse(localStorage.getItem("storeOrders") || "[]");

    // Mix orders or fallback to default presentation if empty
    const allLiveOrders = rawInvoices.length > 0 ? rawInvoices : rawOrders;
    
    const formattedOrders = allLiveOrders.slice(0, 5).map((ord, idx) => ({
      id: ord.id || `ORD-${String(idx + 1).padStart(3, "0")}`,
      customer: ord.customerName || "Customer",
      phone: ord.customerPhone || "N/A",
      amount: ord.totalAmount || 0,
      status: ord.status || "Pending",
      date: ord.date || new Date().toISOString().split("T")[0],
    }));

    setOrders(formattedOrders);

    const calculatedSales = allLiveOrders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    setStats({
      totalSales: calculatedSales > 0 ? calculatedSales : 12450,
      totalOrders: allLiveOrders.length > 0 ? allLiveOrders.length : 148,
      totalCustomers: new Set(allLiveOrders.map(o => o.customerName)).size || 89,
    });
  };

  const chartData = [
    { day: "Mon", sales: 420, height: "45%" },
    { day: "Tue", sales: 680, height: "65%" },
    { day: "Wed", sales: 950, height: "85%" },
    { day: "Thu", sales: 510, height: "55%" },
    { day: "Fri", sales: 1200, height: "100%" },
    { day: "Sat", sales: 880, height: "80%" },
    { day: "Sun", sales: 740, height: "70%" },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-y-auto lg:ml-[250px] p-4 md:p-6 custom-scrollbar">
        {/* Header Title */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome back to COLLECTION PRO Management.</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-xl text-pink-700 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-600"></span>
            </span>
            Live System Analytics
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard title="Total Sales" value={`$${stats.totalSales.toFixed(2)}`} icon={<DollarSign size={20} />} change="+12%" />
          <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingCart size={20} />} change="+8%" />
          <StatCard title="Total Customers" value={stats.totalCustomers} icon={<Users size={20} />} change="+5%" />
          <StatCard title="Growth Rate" value="23.5%" icon={<TrendingUp size={20} />} change="+18%" />
        </div>

        {/* Live Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Bar Chart: Weekly Revenue */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Weekly Revenue Trend</h3>
                <p className="text-[11px] text-gray-400">Live sales breakdown for the current week</p>
              </div>
              <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <ArrowUpRight size={14} /> +14.2%
              </span>
            </div>

            <div className="h-48 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-gray-100">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none whitespace-nowrap">
                    ${item.sales}
                  </div>

                  <div 
                    style={{ height: item.height }}
                    className="w-full max-w-[32px] bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg group-hover:from-pink-700 group-hover:to-pink-500 transition-all duration-300 shadow-xs"
                  />
                  <span className="text-[10px] font-semibold text-gray-400 mt-2">{item.day}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 text-xs text-gray-500">
              <span>Avg Daily Revenue: <strong className="text-gray-800">$770.00</strong></span>
              <span>Peak Day: <strong className="text-pink-600">Friday ($1,200)</strong></span>
            </div>
          </div>

          {/* Donut Progress / Distribution */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Sales by Category</h3>
              <p className="text-[11px] text-gray-400">Top selling fashion lines</p>
            </div>

            <div className="space-y-3 my-4">
              <CategoryProgress label="Abayas & Dresses" percent={55} color="bg-pink-600" />
              <CategoryProgress label="Hijabs & Scarves" percent={25} color="bg-purple-600" />
              <CategoryProgress label="Handbags & Accessories" percent={15} color="bg-rose-400" />
              <CategoryProgress label="Footwear" percent={5} color="bg-gray-400" />
            </div>

            <div className="pt-3 border-t border-gray-100 text-center">
              <p className="text-[11px] text-gray-500">Monthly Target Completed: <strong className="text-gray-900">78%</strong></p>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-pink-600 h-full rounded-full w-[78%]" />
              </div>
            </div>
          </div>

        </div>

        {/* Live Recent Orders Table */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Live Recent Orders</h3>
              <p className="text-[11px] text-gray-400">Real-time order submissions from store</p>
            </div>
            <button 
              onClick={() => navigate("/orders")}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 cursor-pointer flex items-center gap-1"
            >
              View All Orders <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-pink-50/50 text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length > 0 ? (
                  orders.map((ord, idx) => (
                    <tr key={idx} className="hover:bg-pink-50/20 transition">
                      <td className="px-4 py-3 font-bold text-pink-600">{ord.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800">{ord.customer}</p>
                        <p className="text-[10px] text-gray-400">{ord.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{ord.date}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">${Number(ord.amount).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          ord.status === "Paid" || ord.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}>
                          {ord.status === "Paid" ? <CheckCircle size={10} /> : <Clock size={10} />}
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => navigate("/orders")}
                          className="p-1.5 border border-pink-200 text-pink-600 hover:bg-pink-50 rounded-lg font-semibold inline-flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <Eye size={12} /> Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400">
                      No live orders found. Orders placed will appear here automatically.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

function CategoryProgress({ label, percent, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}