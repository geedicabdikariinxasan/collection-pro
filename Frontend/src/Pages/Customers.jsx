import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Users,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  FileText,
  Boxes,
  Settings,
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  Star,
  Pencil,
  Trash2,
  CreditCard,
  User,
  LogOut,
  Plus,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Qeex API URL-ka (Vercel Environment Variable ama Render Live URL)
const API_URL = import.meta.env?.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://collection-pro-backend.onrender.com";

function Sidebar() {
  const navigate = useNavigate();
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Customers", icon: Users, path: "/customers", active: true },
    { name: "Orders", icon: ShoppingCart, path: "/orders" },
    { name: "Sales", icon: BarChart3, path: "#" },
    { name: "Invoices", icon: FileText, path: "/invoices" },
    { name: "Inventory / Stock", icon: Boxes, path: "#" },
    { name: "Reports", icon: BarChart3, path: "#" },
    { name: "Users", icon: User, path: "#" },
    { name: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] overflow-hidden bg-gradient-to-b from-pink-700 via-pink-800 to-rose-950 text-white z-40 flex flex-col justify-between shadow-xl">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="border-b border-white/10 px-5 py-5 text-center flex flex-col items-center justify-center">
          <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
          <h1 className="text-lg font-extrabold tracking-wider whitespace-nowrap">
            COLLECTION <span className="text-pink-200">PRO</span>
          </h1>
          <p className="text-[8px] tracking-[2.5px] text-pink-100 uppercase font-semibold">WOMEN'S FASHION & CLOTHING</p>
        </div>
       <nav className="flex-1 px-3 py-2 space-y-1 overflow-hidden">
          <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">Main Menu</p>
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
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

        <div className="px-4 py-3 text-center border-t border-white/10 bg-black/10 flex flex-col gap-1.5">
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
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur shadow-xs">
      <div className="relative w-full max-w-[350px]">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search customers..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
      </div>
      <div className="ml-4 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">3</span>
        </button>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xs">A</div>
          <div>
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
          <mark key={i} className="bg-green-200 text-green-900 px-1 rounded font-bold">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-100 text-green-600",
    Pending: "bg-orange-100 text-orange-600",
    Inactive: "bg-red-100 text-red-600",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function CustomerModal({ close, onSave, editingCustomer }) {
  const [form, setForm] = useState(
    editingCustomer || {
      name: "", email: "", phone: "", city: "", status: "Active", joinDate: new Date().toISOString().split('T')[0],
      image: "https://i.pravatar.cc/150?img=47", address: "Mogadishu, Somalia"
    }
  );
  const [loading, setLoading] = useState(false);

  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setForm(prev => ({ ...prev, image: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">{editingCustomer ? "Edit Customer" : "Add New Customer"}</h2>
          <button type="button" onClick={close} className="text-gray-500 hover:text-pink-600 cursor-pointer text-xs">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Full Name</label>
              <input name="name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Amina Hassan" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Email Address</label>
              <input name="email" type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="amina@gmail.com" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Phone</label>
              <input name="phone" required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+252 61..." className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">City</label>
              <input name="city" required value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} placeholder="Mogadishu" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Status</label>
              <select name="status" value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="mb-0.5 block font-medium text-gray-700">Join Date</label>
              <input name="joinDate" type="date" value={form.joinDate} onChange={(e) => setForm({...form, joinDate: e.target.value})} className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">Customer Photo</label>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if(e.dataTransfer.files[0]) processImageFile(e.dataTransfer.files[0]); }}
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/40 p-3 text-center cursor-pointer hover:bg-pink-50 transition"
            >
              {form.image ? (
                <img src={form.image} alt="Preview" className="h-10 w-10 rounded-full object-cover mb-1 ring-2 ring-pink-300" />
              ) : (
                <UploadCloud size={20} className="text-pink-500 mb-1" />
              )}
              <p className="text-[11px] text-gray-600 font-medium">Drag & drop image here, or <label className="text-pink-600 underline cursor-pointer">browse<input type="file" accept="image/*" onChange={(e) => { if(e.target.files[0]) processImageFile(e.target.files[0]); }} className="hidden" /></label></p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button type="button" onClick={close} disabled={loading} className="flex-1 rounded-xl border border-gray-200 py-2.5 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-pink-600 py-2.5 font-semibold text-white shadow-md hover:bg-pink-700 cursor-pointer disabled:opacity-50">
              {loading ? "Processing..." : (editingCustomer ? "Update" : "Save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CustomerDetails({ customer, onClose, onEdit }) {
  if (!customer) return null;

  return (
    <aside className="fixed right-0 top-[70px] z-20 h-[calc(100vh-70px)] w-[330px] overflow-y-auto border-l border-gray-100 bg-white custom-scrollbar shadow-2xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 bg-pink-50/50">
          <h2 className="text-sm font-bold text-gray-900">Customer Details</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-pink-50 hover:text-pink-600 cursor-pointer">
            <X size={17} />
          </button>
        </div>

        <div className="border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <img src={customer.image} alt={customer.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-pink-50" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-gray-900 truncate">{customer.name}</h3>
              <p className="text-[11px] text-gray-500 truncate">{customer.email}</p>
              <p className="text-[11px] text-gray-500">{customer.phone}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 p-3 text-center bg-gray-50/50">
          <div className="rounded-lg border border-gray-100 bg-white p-2"><ShoppingCart size={14} className="mx-auto text-gray-600"/><p className="text-xs font-bold mt-1">{customer.orders || 0}</p><p className="text-[8px] text-gray-400">Orders</p></div>
          <div className="rounded-lg border border-gray-100 bg-white p-2"><CreditCard size={14} className="mx-auto text-gray-600"/><p className="text-xs font-bold mt-1">${customer.spent || 0}</p><p className="text-[8px] text-gray-400">Spent</p></div>
          <div className="rounded-lg border border-gray-100 bg-white p-2"><Star size={14} className="mx-auto text-orange-500"/><p className="text-xs font-bold mt-1">{customer.rating || 5}</p><p className="text-[8px] text-gray-400">Rating</p></div>
          <div className="rounded-lg border border-gray-100 bg-white p-2"><CalendarDays size={14} className="mx-auto text-gray-600"/><p className="text-[10px] font-bold mt-1 truncate">{customer.joinDate}</p><p className="text-[8px] text-gray-400">Joined</p></div>
        </div>

        <div className="p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold text-gray-700">Information</span>
            <button onClick={() => onEdit(customer)} className="flex items-center gap-1 text-pink-600 font-bold hover:underline cursor-pointer"><Pencil size={12}/> Edit</button>
          </div>
          <div className="space-y-1.5 text-gray-600">
            <p><strong>Full Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>City:</strong> {customer.city}</p>
            <p><strong>Status:</strong> {customer.status}</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t text-center bg-gray-50">
        <p className="text-[10px] text-gray-400">COLLECTION PRO • Customer Panel</p>
      </div>
    </aside>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    fetchCustomers();
  }, [search, statusFilter]);

  const fetchCustomers = async () => {
    try {
      // Halkan waxaa la isticmaalay API_URL
      let url = `${API_URL}/api/customers?search=${search}&status=${statusFilter}`;
      const res = await axios.get(url);
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      if (editingCustomer) {
        await axios.put(`${API_URL}/api/customers/${editingCustomer._id}`, customerData);
      } else {
        await axios.post(`${API_URL}/api/customers`, customerData);
      }
      fetchCustomers();
      setShowModal(false);
      setEditingCustomer(null);
    } catch (err) {
      console.error("Error saving customer:", err);
      alert("Qalad ayaa dhacay, fadlan hubi xogta!");
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${API_URL}/api/customers/${id}`);
        fetchCustomers();
        if (selectedCustomer?._id === id) setSelectedCustomer(null);
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f8fb] flex">
      <Sidebar />
      <div className="ml-[250px] flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <Users size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Customers Management</h1>
                <p className="text-xs text-gray-500">Manage your store customers here.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => { setEditingCustomer(null); setShowModal(true); }} 
              className="flex items-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-pink-700 cursor-pointer"
            >
              <Plus size={16} /> Add Customer
            </button>
          </div>

          <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xs">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search customers by name, phone..."
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-xs outline-none focus:border-pink-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-pink-400 cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-pink-50/60 text-left text-gray-500">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.length > 0 ? (
                    customers.map((customer, index) => (
                      <tr key={customer._id} className="hover:bg-pink-50/20">
                        <td className="px-4 py-2.5 text-gray-600">{index + 1}</td>
                        <td className="px-4 py-2.5 flex items-center gap-2.5 font-bold text-gray-800">
                          <img 
                            src={customer.image} 
                            alt="" 
                            className="h-8 w-8 rounded-full object-cover"
                            onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=47"; }}
                          />
                          <HighlightText text={customer.name} highlight={search} />
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">
                          <HighlightText text={customer.email} highlight={search} />
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">
                          <HighlightText text={customer.phone} highlight={search} />
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{customer.city}</td>
                        <td className="px-4 py-2.5"><StatusBadge status={customer.status} /></td>
                        <td className="px-4 py-2.5 text-right space-x-1.5">
                          <button onClick={() => setSelectedCustomer(customer)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer font-semibold inline-flex items-center gap-1"><Eye size={12}/> View</button>
                          <button onClick={() => { setEditingCustomer(customer); setShowModal(true); }} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer"><Pencil size={12}/></button>
                          <button onClick={() => deleteCustomer(customer._id)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer"><Trash2 size={12}/></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-14 text-center text-gray-400">
                        <Users size={38} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm font-semibold">No customers found in database.</p>
                        <p className="text-xs text-gray-400 mt-0.5">Click "Add Customer" to add your first client.</p>
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

      <CustomerDetails 
        customer={selectedCustomer} 
        onClose={() => setSelectedCustomer(null)} 
        onEdit={(cust) => {
          setSelectedCustomer(null);
          setEditingCustomer(cust);
          setShowModal(true);
        }}
      />

      {showModal && (
        <CustomerModal 
          close={() => {
            setShowModal(false);
            setEditingCustomer(null);
          }} 
          onSave={handleSaveCustomer} 
          editingCustomer={editingCustomer} 
        />
      )}
    </div>
  );
}