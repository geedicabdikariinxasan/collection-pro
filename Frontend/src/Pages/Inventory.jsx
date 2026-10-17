import React, { useEffect, useMemo, useState } from "react";
import {
  Search, Bell, ChevronDown, LayoutDashboard, Package, Users, ShoppingCart, 
  BarChart3, FileText, Boxes, Settings, User, Menu, X, AlertTriangle, 
  PackageCheck, PackageX, RefreshCw, Pencil, Save, Plus, Minus, Filter, LoaderCircle, LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// KANI WAA XALKA ERROR-KA LOCALHOST (Waxaan ku xirnay Server-kaaga dhabta ah)
const API_URL = "https://collection-pro-backend.onrender.com/api";
const LOW_STOCK_LIMIT = 5;

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  // KANI WAA XALKA ERROR-KA JAALAHA AH (Dhammaan waxay leeyihiin "/")
  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "#" },
    { label: "Invoices", icon: FileText, path: "/invoices" },
    { label: "Inventory", icon: Boxes, path: "/inventory", active: true },
    { label: "Reports", icon: BarChart3, path: "#" },
    { label: "Users", icon: User, path: "#" },
    { label: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden" />}
      <aside className={`fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative justify-between">
          <div>
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 text-white lg:hidden p-1 cursor-pointer z-10"><X size={20} /></button>
            <div className="border-b border-white/10 px-5 py-4 text-center flex flex-col items-center justify-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
              <h1 className="font-serif text-lg font-bold tracking-wider whitespace-nowrap">COLLECTION PRO</h1>
              <p className="text-[7px] tracking-[2px] text-pink-100 uppercase">WOMEN'S FASHION & CLOTHING</p>
            </div>
            <nav className="px-3 py-3 space-y-1">
              <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">Main Menu</p>
              {menu.map(({ label, icon: Icon, path, active }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMobileOpen(false);
                    if (path !== "#") navigate(path);
                    else alert(`Bogga "${label}" dhawaan ayaa la dhisayaa!`);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                    active ? "bg-pink-500 font-semibold shadow-md text-white" : "hover:bg-white/10 text-pink-50"
                  }`}
                >
                  <Icon size={16} /><span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="p-4 text-center border-t border-white/10 bg-black/10 shrink-0 mt-auto">
            <button onClick={() => navigate("/")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition cursor-pointer mb-2">
              <LogOut size={15} /> <span>Logout</span>
            </button>
            <p className="font-serif text-[10px] italic text-pink-100">Style • Elegance • You</p>
            <p className="text-[7px] text-pink-300">© 2026 COLLECTION PRO</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur shadow-xs print:hidden">
      <div className="flex items-center gap-2.5 w-full max-w-[350px]">
        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"><Menu size={22} /></button>
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search inventory..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none focus:ring-2 focus:ring-pink-200" />
        </div>
      </div>
      <div className="ml-4 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer hidden sm:block">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">3</span>
        </button>
        <div className="h-6 w-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xs">A</div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-gray-800">Admin</p>
            <p className="text-[9px] text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StockBadge({ quantity }) {
  const stock = Number(quantity ?? 0);
  let status = "In Stock";
  let style = "bg-emerald-50 text-emerald-700 border-emerald-200";

  if (stock <= 0) {
    status = "Out of Stock";
    style = "bg-red-50 text-red-700 border-red-200";
  } else if (stock <= LOW_STOCK_LIMIT) {
    status = "Low Stock";
    style = "bg-amber-50 text-amber-700 border-amber-200";
  }

  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold border ${style}`}>
      <span className="mr-1">●</span> {status}
    </span>
  );
}

function SummaryCard({ title, value, subtitle, icon: Icon, color }) {
  const iconStyles = {
    pink: "bg-pink-100 text-pink-600",
    green: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
  };
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-xs transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{value}</h3>
          <p className="mt-1 text-[9px] text-gray-400">{subtitle}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyles[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError("Inventory lama soo qaadi karin. Hubi in backend-ku shaqaynayo.");
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(() => ["All Categories", ...new Set(products.map(p => p.category || "General"))], [products]);

  const summary = useMemo(() => {
    const total = products.length;
    const inStock = products.filter(p => Number(p.stock) > LOW_STOCK_LIMIT).length;
    const lowStock = products.filter(p => Number(p.stock) > 0 && Number(p.stock) <= LOW_STOCK_LIMIT).length;
    const outOfStock = products.filter(p => Number(p.stock) <= 0).length;
    const totalUnits = products.reduce((sum, p) => sum + Number(p.stock || 0), 0);
    return { total, inStock, lowStock, outOfStock, totalUnits };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All Categories" || product.category === categoryFilter;
      const stock = Number(product.stock || 0);
      let status = "In Stock";
      if (stock <= 0) status = "Out of Stock";
      else if (stock <= LOW_STOCK_LIMIT) status = "Low Stock";

      const matchesStatus = statusFilter === "All Statuses" || status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryFilter, statusFilter]);

  async function updateStock(event) {
    event.preventDefault();
    const quantity = Number(newQuantity);
    if (quantity < 0 || !selectedProduct?._id) return;

    setSaving(true);
    try {
      await axios.put(`${API_URL}/products/${selectedProduct._id}`, { stock: quantity });
      loadProducts();
      setSelectedProduct(null);
    } catch (err) {
      alert("Stock lama cusboonaysiin karin.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px]">
        <Header setMobileOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <Boxes size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Inventory / Stock</h1>
                <p className="text-xs text-gray-500">Monitor stock levels and manage your clothing inventory.</p>
              </div>
            </div>

            <button onClick={loadProducts} className="inline-flex items-center gap-1.5 rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-xs font-semibold text-pink-700 shadow-xs hover:bg-pink-50 cursor-pointer">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard title="Total Products" value={loading ? "—" : summary.total} subtitle="Registered items" icon={Package} color="pink" />
            <SummaryCard title="In Stock" value={loading ? "—" : summary.inStock} subtitle="Sufficient stock" icon={PackageCheck} color="green" />
            <SummaryCard title="Low Stock" value={loading ? "—" : summary.lowStock} subtitle={`1–${LOW_STOCK_LIMIT} units left`} icon={AlertTriangle} color="amber" />
            <SummaryCard title="Out of Stock" value={loading ? "—" : summary.outOfStock} subtitle="Needs restocking" icon={PackageX} color="red" />
          </section>

          <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xs">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-xs outline-none focus:border-pink-400"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer"
              >
                <option>All Statuses</option>
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[700px]">
                <thead className="bg-pink-50/60 text-left text-gray-500 border-b border-pink-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Size / Color</th>
                    <th className="px-4 py-3 font-semibold">Quantity</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Stock Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="py-14 text-center text-gray-400">
                        <LoaderCircle size={28} className="mx-auto mb-2 animate-spin text-pink-500" />
                        <p>Loading inventory...</p>
                      </td>
                    </tr>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <tr key={prod._id} className="hover:bg-pink-50/30 transition">
                        <td className="px-4 py-2.5 flex items-center gap-2.5 font-bold text-gray-800">
                          <img src={prod.image} alt="" className="h-9 w-9 rounded-lg object-cover ring-1 ring-gray-200" onError={(e)=>{e.target.src="https://images.unsplash.com/photo-1595777457583-95e059d581b8"}} />
                          <span className="truncate max-w-[150px]">{prod.name}</span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{prod.category}</td>
                        <td className="px-4 py-2.5 text-gray-600">{prod.size} / {prod.color}</td>
                        <td className="px-4 py-2.5 font-extrabold text-gray-900 text-sm">{prod.stock}</td>
                        <td className="px-4 py-2.5 font-bold text-pink-600">${Number(prod.price).toFixed(2)}</td>
                        <td className="px-4 py-2.5"><StockBadge quantity={prod.stock} /></td>
                        <td className="px-4 py-2.5 text-right">
                          <button onClick={() => { setSelectedProduct(prod); setNewQuantity(String(prod.stock)); }} className="px-3 py-1.5 border border-pink-300 text-pink-600 rounded-lg hover:bg-pink-50 cursor-pointer font-semibold inline-flex items-center gap-1.5 transition">
                            <Pencil size={12}/> Update Stock
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-14 text-center text-gray-400">
                        <Boxes size={38} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm font-semibold">No inventory items found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="py-4 text-center mt-auto">
            <p className="text-[10px] text-gray-400">© 2026 COLLECTION PRO • Style • Elegance • You</p>
          </footer>
        </main>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl text-xs">
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-gray-900">Update Stock</h3>
              <button onClick={() => setSelectedProduct(null)} className="cursor-pointer text-gray-400 hover:text-gray-700"><X size={17}/></button>
            </div>
            
            <form onSubmit={updateStock} className="space-y-4">
              <div className="bg-pink-50/50 p-3 rounded-xl border border-pink-100 flex gap-3 items-center">
                 <img src={selectedProduct.image} alt="" className="h-10 w-10 rounded-lg object-cover" onError={(e)=>{e.target.src="https://images.unsplash.com/photo-1595777457583-95e059d581b8"}} />
                 <div>
                    <p className="font-bold text-gray-800">{selectedProduct.name}</p>
                    <p className="text-[10px] text-gray-500">Current Stock: <span className="font-bold text-pink-600">{selectedProduct.stock}</span></p>
                 </div>
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-gray-700 text-[11px]">Set New Quantity</label>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setNewQuantity(v => String(Math.max(0, Number(v||0)-1)))} className="p-2.5 rounded-lg border border-gray-200 text-pink-600 hover:bg-pink-50 cursor-pointer"><Minus size={14}/></button>
                  <input 
                    type="number" 
                    min="0" 
                    value={newQuantity} 
                    onChange={(e) => setNewQuantity(e.target.value)} 
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400 font-bold text-sm text-center"
                    required 
                  />
                  <button type="button" onClick={() => setNewQuantity(v => String(Number(v||0)+1))} className="p-2.5 rounded-lg border border-gray-200 text-pink-600 hover:bg-pink-50 cursor-pointer"><Plus size={14}/></button>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setSelectedProduct(null)} className="flex-1 border py-2.5 rounded-xl font-semibold text-gray-600 cursor-pointer hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-pink-600 text-white py-2.5 rounded-xl font-bold shadow-md hover:bg-pink-700 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5">
                  {saving ? <LoaderCircle size={14} className="animate-spin" /> : <Save size={14} />} {saving ? "Saving..." : "Save Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}