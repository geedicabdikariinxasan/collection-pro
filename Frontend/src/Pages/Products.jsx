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
  Plus,
  Pencil,
  Trash2,
  Grid3X3,
  List,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Qeex API URL-ka (Vercel Environment Variable ama Render Live URL)
const API_URL = import.meta.env?.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://collection-pro-backend.onrender.com";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { name: "Products", icon: Package, path: "/products", active: true },
    { name: "Customers", icon: Users, path: "/customers" },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Sales", icon: BarChart3, path: "/Sales" },
    { name: "Invoices", icon: FileText, path: "/invoices" },
    { name: "Inventory", icon: Boxes, path: "/inventory" },
    { name: "Users", icon: Users, path: "#" },
    { name: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar Responsive */}
      <aside className={`fixed left-0 top-0 h-screen w-[250px] overflow-hidden bg-gradient-to-b from-pink-700 via-pink-800 to-rose-950 text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-hidden relative">
          
          {/* Close Button for Mobile */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3 text-white lg:hidden p-1 cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="border-b border-white/10 px-5 py-5 text-center flex flex-col items-center justify-center">
            <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
            <h1 className="text-lg font-extrabold tracking-wider whitespace-nowrap">
              COLLECTION <span className="text-pink-200">PRO</span>
            </h1>
            <p className="text-[8px] tracking-[2.5px] text-pink-100 uppercase font-semibold">WOMEN'S FASHION & CLOTHING</p>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
            <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">Main Menu</p>
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setMobileOpen(false); // Xir menu-ga marka la gujiyo
                    if (item.path !== "#") {
                      navigate(item.path);
                    } else {
                      alert(`Bogga "${item.name}" dhawaan ayaa la dhisayaa!`);
                    }
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                    item.active ? "bg-pink-500 text-white shadow-md font-bold" : "text-pink-50 hover:bg-white/10"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-4 py-3 text-center border-t border-white/10 bg-black/10 flex flex-col gap-1.5 mt-auto">
            <button onClick={() => navigate("/")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2 text-xs font-semibold text-white hover:bg-red-600 transition cursor-pointer">
              <LogOut size={15} /> <span>Logout</span>
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
      <div className="flex items-center gap-2.5 w-full max-w-[350px]">
        {/* Mobile Hamburger Button (3-da xariiqood) */}
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
        </div>
      </div>

      <div className="ml-2 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer hidden sm:block">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">8</span>
        </button>
        <div className="h-6 w-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
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

function HighlightText({ text, highlight }) {
  if (!highlight || !highlight.trim()) return text;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 px-0.5 rounded font-bold">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function ProductCard({ product, onEdit, onDelete, searchTerm }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-[150px] overflow-hidden bg-pink-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"; }} 
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="p-3">
        <h3 className="truncate text-xs font-bold text-gray-800">
          <HighlightText text={product.name} highlight={searchTerm} />
        </h3>
        <p className="mt-0.5 text-sm font-bold text-pink-600">${Number(product.price).toFixed(2)}</p>

        <div className="mt-1.5 space-y-0.5 text-[10px]">
          <p className="text-gray-500">Size: <span className="font-medium text-gray-700">{product.size}</span></p>
          <p className="text-gray-500">Color: <span className="font-medium text-gray-700">{product.color}</span></p>
          <p className="flex items-center gap-1 text-gray-500">
            <Boxes size={11} className="text-pink-500" />
            <span>Stock <strong className="text-gray-700">({product.stock})</strong></span>
          </p>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <button onClick={() => onEdit(product)} className="flex items-center justify-center gap-1 rounded-lg border border-pink-300 py-1 text-[10px] font-semibold text-pink-600 hover:bg-pink-50 cursor-pointer">
            <Pencil size={11} /> Edit
          </button>
          <button onClick={() => onDelete(product._id)} className="flex items-center justify-center gap-1 rounded-lg border border-pink-300 py-1 text-[10px] font-semibold text-pink-600 hover:bg-pink-50 cursor-pointer">
            <Trash2 size={11} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ close, onSave, editingProduct }) {
  const [form, setForm] = useState(
    editingProduct || {
      name: "", price: "", stock: "", size: "M", color: "Pink", category: "Dresses",
      image: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
          <button type="button" onClick={close} className="text-gray-500 hover:text-pink-600 cursor-pointer text-xs">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Product Name</label>
              <input name="name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Cabaayad iyo xijaab" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Price ($)</label>
              <input name="price" type="number" required value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="15.00" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Stock</label>
              <input name="stock" type="number" required value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} placeholder="12" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>

            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Category</label>
              <select name="category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer">
                <option value="Dresses">Dresses</option>
                <option value="Sets">Sets</option>
                <option value="Bags">Bags</option>
                <option value="Shoes">Shoes</option>
                <option value="Abayas">Abayas</option>
              </select>
            </div>

            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Size</label>
              <select name="size" value={form.size} onChange={(e) => setForm({...form, size: e.target.value})} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="Standard">Standard</option>
              </select>
            </div>

            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Color</label>
              <select name="color" value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer">
                <option value="Pink">Pink</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Floral">Floral</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-0.5 block font-medium text-gray-700">Image URL</label>
            <input name="image" required value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} placeholder="Geli linkiga sawirka..." className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
          </div>

          <div className="mt-5 flex gap-2">
            <button type="button" onClick={close} className="flex-1 rounded-xl border border-gray-200 py-2.5 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
            <button type="submit" className="flex-1 rounded-xl bg-pink-600 py-2.5 font-semibold text-white hover:bg-pink-700 cursor-pointer">{editingProduct ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Products() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      let url = `${API_URL}/api/products?search=${search}`;
      const res = await axios.get(url);
      let data = res.data;
      if (category !== "All Categories") {
        data = data.filter(p => p.category?.toLowerCase() === category.toLowerCase());
      }
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/api/products/${editingProduct._id}`, productData);
      } else {
        await axios.post(`${API_URL}/api/products`, productData);
      }
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f8fb] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* lg:ml-[250px] waxay ka dhigaysaa in desktop-ka uu boos banneeyo laakiin mobile-ka uu ka bilaabmo 0 */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px]">
        <Header setMobileOpen={setMobileOpen} />
        
        <main className="flex-1 overflow-y-auto p-3 md:p-5 custom-scrollbar">
          
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <Package size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Products</h1>
                <p className="text-[11px] text-gray-500">Live database synchronized products.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => { 
                setEditingProduct(null); 
                setShowModal(true); 
              }} 
              className="flex items-center gap-1 rounded-xl bg-pink-600 px-3 py-2 text-xs font-semibold text-white shadow-md hover:bg-pink-700 cursor-pointer"
            >
              <Plus size={15} /> Add Product
            </button>
          </div>

          <div className="mb-3 rounded-xl border border-gray-100 bg-white p-2.5 shadow-xs">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products by name..."
                  className="w-full rounded-lg border border-gray-200 py-1.5 pl-9 pr-3 text-xs outline-none focus:border-pink-400"
                />
              </div>

              <div className="relative flex items-center gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-pink-400 cursor-pointer"
                >
                  <option>All Categories</option>
                  <option>Dresses</option>
                  <option>Sets</option>
                  <option>Bags</option>
                  <option>Shoes</option>
                  <option>Abayas</option>
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />

                <div className="flex items-center gap-1 ml-auto">
                  <button onClick={() => setView("grid")} className={`flex h-7 w-7 items-center justify-center rounded-lg transition cursor-pointer ${view === "grid" ? "bg-pink-600 text-white" : "border border-gray-200 text-gray-500 hover:bg-pink-50"}`}>
                    <Grid3X3 size={14} />
                  </button>
                  <button onClick={() => setView("list")} className={`flex h-7 w-7 items-center justify-center rounded-lg transition cursor-pointer ${view === "list" ? "bg-pink-600 text-white" : "border border-gray-200 text-gray-500 hover:bg-pink-50"}`}>
                    <List size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {products.length > 0 ? (
            view === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} searchTerm={search} onEdit={(p) => { setEditingProduct(p); setShowModal(true); }} onDelete={deleteProduct} />
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
                <table className="w-full min-w-[700px] text-xs">
                  <thead className="bg-pink-50/60 text-left text-gray-500">
                    <tr>
                      <th className="px-3 py-2.5">Product</th>
                      <th className="px-3 py-2.5">Price</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5">Stock</th>
                      <th className="px-3 py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-pink-50/20">
                        <td className="px-3 py-2 flex items-center gap-2 font-bold text-gray-800">
                          <img 
                            src={product.image} 
                            alt="" 
                            className="h-8 w-8 rounded-md object-cover" 
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"; }} 
                          />
                          <HighlightText text={product.name} highlight={search} />
                        </td>
                        <td className="px-3 py-2 font-bold text-pink-600">${product.price}</td>
                        <td className="px-3 py-2 text-gray-600">{product.category}</td>
                        <td className="px-3 py-2 text-gray-700">{product.stock}</td>
                        <td className="px-3 py-2 text-right space-x-1">
                          <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="p-1 border border-pink-300 text-pink-600 rounded hover:bg-pink-50 cursor-pointer"><Pencil size={11}/></button>
                          <button onClick={() => deleteProduct(product._id)} className="p-1 border border-pink-300 text-pink-600 rounded hover:bg-pink-50 cursor-pointer"><Trash2 size={11}/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
              <Package size={32} className="mx-auto mb-2 text-gray-300" />
              <h3 className="font-semibold text-gray-700 text-xs">No products found</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">Click "Add Product" to add items.</p>
            </div>
          )}

        </main>
      </div>

      {showModal && (
        <ProductModal 
          close={() => {
            setShowModal(false);
            setEditingProduct(null);
          }} 
          onSave={handleSaveProduct} 
          editingProduct={editingProduct} 
        />
      )}
    </div>
  );
}