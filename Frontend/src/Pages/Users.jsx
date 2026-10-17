import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Package,
  Users as UsersIcon,
  ShoppingCart,
  BarChart3,
  Boxes,
  Settings,
  User,
  Eye,
  X,
  Pencil,
  Trash2,
  LogOut,
  UploadCloud,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================
   SIDEBAR & HEADER
========================= */

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const links = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: UsersIcon, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "/sales" },
    { label: "Invoices", icon: FileText, path: "/invoices" },
    { label: "Inventory", icon: Boxes, path: "/inventory" },
    { label: "Users", icon: User, path: "/users", active: true }, // Users Active
    { label: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden"
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-[250px] overflow-hidden bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="border-b border-white/10 px-5 py-4 text-center flex flex-col items-center justify-center relative">
            <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 lg:hidden p-1">
              <X size={18} />
            </button>
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
            <h1 className="font-serif text-lg font-bold tracking-wider whitespace-nowrap">COLLECTION PRO</h1>
            <p className="text-[7px] tracking-[2px] text-pink-100 uppercase">WOMEN'S FASHION & CLOTHING</p>
          </div>

          <nav className="flex-1 px-3 py-2 space-y-1 overflow-hidden">
            <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">Main Menu</p>
            {links.map(({ label, icon: Icon, path, active }) => (
              <button
                key={label}
                onClick={() => {
                  if (path !== "#") navigate(path);
                  else alert(`Bogga "${label}" dhawaan ayaa la dhisayaa!`);
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                  active ? "bg-pink-500 font-semibold shadow-md text-white" : "hover:bg-white/10 text-pink-50"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="px-4 py-2.5 text-center border-t border-white/10 bg-black/10 flex flex-col gap-1.5">
            <button onClick={() => navigate("/")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition cursor-pointer">
              <LogOut size={15} />
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
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur shadow-xs print:hidden">
      <div className="flex items-center gap-2.5 w-full max-w-[350px]">
        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer">
          <Menu size={22} />
        </button>
        <div className="relative w-full hidden sm:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search users..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none focus:ring-2 focus:ring-pink-200" />
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
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

/* =========================
   MAIN USERS PAGE
========================= */

// Xogta bilowga ah (Kaliya Admin-ka ayaa ku jira sida aad codsatay)
const initialUsers = [
  {
    id: 1,
    name: "Haji Hassan",
    email: "admin@collectionpro.com",
    phone: "+252 61 2345678",
    role: "Administrator",
    status: "Active",
    joined: new Date().toISOString().split('T')[0],
    initials: "HH",
    image: "https://i.pravatar.cc/150?img=47" // Sawir default ah ee admin-ka
  }
];

const roleStyles = {
  Administrator: "bg-purple-100 text-purple-700",
  Cashier: "bg-pink-100 text-pink-700",
  Customer: "bg-blue-100 text-blue-700",
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: "Customer",
  status: "Active",
  image: "" // Sawirka lagu daray
};

export default function Users() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  
  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  
  // Modals state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch = [user.name, user.email, user.phone, user.role].some((value) => value.toLowerCase().includes(query));
      const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All Status" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // Statistics
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const adminCount = users.filter((u) => u.role === "Administrator").length;
  const cashierCount = users.filter((u) => u.role === "Cashier").length;
  const customerCount = users.filter((u) => u.role === "Customer").length;

  function openAddModal() {
    setEditingUser(null);
    setForm(emptyForm);
    setFormError("");
    setShowModal(true);
  }

  function openEditModal(user) {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      image: user.image || ""
    });
    setFormError("");
    setShowModal(true);
  }

  // Sawirka Processing (Drag & Drop)
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
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setForm(prev => ({ ...prev, image: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  function saveUser(event) {
    event.preventDefault();
    setFormError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (!name || !email || !phone) {
      setFormError("Fadlan buuxi dhammaan meelaha loo baahan yahay.");
      return;
    }

    const duplicateEmail = users.some(
      (user) => user.email.toLowerCase() === email && user.id !== editingUser?.id
    );

    if (duplicateEmail) {
      setFormError("Email-kan hore ayaa loo isticmaalay.");
      return;
    }

    const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id ? { ...user, ...form, name, email, phone, initials } : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        ...form,
        name,
        email,
        phone,
        joined: new Date().toISOString().slice(0, 10),
        initials,
      };
      setUsers((previous) => [newUser, ...previous]);
    }

    setShowModal(false);
    setEditingUser(null);
    setForm(emptyForm);
  }

  function deleteUser(user) {
    if (user.role === "Administrator" && adminCount <= 1) {
      alert("Ma tirtiri kartid Admin-ka keliya ee nidaamka ku jira!");
      return;
    }
    const confirmed = window.confirm(`Ma hubtaa inaad tirtirayso user-ka ${user.name}?`);
    if (!confirmed) return;
    setUsers((previous) => previous.filter((item) => item.id !== user.id));
    if (selectedUser?.id === user.id) setSelectedUser(null);
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px]">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          
          {/* PAGE TITLE */}
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <UsersIcon size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Users Management</h1>
                <p className="text-xs text-gray-500">Manage system users, images and roles.</p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-pink-700 cursor-pointer"
            >
              <Plus size={16} /> Add User
            </button>
          </div>

          {/* STATISTICS */}
          <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              { title: "Total Users", value: users.length, icon: UsersIcon, color: "text-pink-600", bg: "bg-pink-100" },
              { title: "Active Users", value: activeUsers, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
              { title: "Administrators", value: adminCount, icon: User, color: "text-purple-600", bg: "bg-purple-100" },
              { title: "Cashiers", value: cashierCount, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">{stat.title}</p>
                    <h2 className="text-xl font-bold text-gray-900">{stat.value}</h2>
                  </div>
                </div>
              );
            })}
          </section>

          {/* FILTERS */}
          <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xs">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users by name, email, phone..."
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-pink-400"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer"
              >
                <option>All Roles</option>
                <option>Administrator</option>
                <option>Cashier</option>
                <option>Customer</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* USER TABLE */}
          <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-xs">
                <thead className="bg-pink-50/60 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Profile</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Phone</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Joined</th>
                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-pink-50/30 transition">
                      <td className="px-4 py-2.5 text-gray-500">{index + 1}</td>
                      
                      {/* Qodobka: Sawirka Qofka (Image) ayaa halkan ka muuqanaya */}
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-200 bg-gradient-to-br from-pink-100 to-pink-200 font-bold text-pink-700 overflow-hidden">
                            {user.image ? (
                              <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                              user.initials
                            )}
                          </div>
                          <span className="font-bold text-gray-800">{user.name}</span>
                        </div>
                      </td>

                      <td className="px-4 py-2.5 text-gray-600">{user.email}</td>
                      <td className="px-4 py-2.5 text-gray-600">{user.phone}</td>
                      
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${roleStyles[user.role]}`}>
                          {user.role}
                        </span>
                      </td>

                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => toggleStatus(user)}
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold cursor-pointer transition ${
                            user.status === "Active" ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} />
                          {user.status}
                        </button>
                      </td>

                      <td className="px-4 py-2.5 text-gray-600">{user.joined}</td>

                      <td className="px-4 py-2.5 text-right space-x-1.5">
                        <button onClick={() => setSelectedUser(user)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer inline-flex items-center gap-1 font-semibold text-[10px]"><Eye size={12}/> View</button>
                        <button onClick={() => openEditModal(user)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer"><Pencil size={12}/></button>
                        <button onClick={() => deleteUser(user)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer"><Trash2 size={12}/></button>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center text-gray-400">
                        <UsersIcon size={38} className="mx-auto mb-2 text-gray-300" />
                        <p className="font-semibold text-sm">No users found</p>
                        <p className="mt-0.5 text-[10px]">Try changing your search or filters.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-3 border-t border-gray-100 text-[11px] text-gray-500 bg-gray-50 flex justify-between">
              <span>Showing {filteredUsers.length} of {users.length} users</span>
            </div>
          </section>

          <footer className="py-4 text-center text-[10px] text-gray-400 mt-auto">
            © 2026 COLLECTION PRO • Style • Elegance • You
          </footer>
        </main>
      </div>

      {/* ADD / EDIT USER MODAL (Qodobka 3: Sawir gelinta) */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">{editingUser ? "Edit User" : "Add New User"}</h2>
                <p className="text-[10px] text-gray-500">Manage account information and profile picture.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={saveUser} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="E.g. Amina Ali" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Email Address *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@example.com" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Phone Number *</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+252 61..." className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400" />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-700">Role *</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer">
                    <option>Administrator</option>
                    <option>Cashier</option>
                    <option>Customer</option>
                  </select>
                </div>
              </div>

              {/* Upload Image Section */}
              <div className="pt-2">
                <label className="block mb-1 font-semibold text-gray-700">Profile Picture</label>
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); if(e.dataTransfer.files[0]) processImageFile(e.dataTransfer.files[0]); }}
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/40 p-4 text-center cursor-pointer hover:bg-pink-50 transition"
                >
                  {form.image ? (
                    <img src={form.image} alt="Preview" className="h-12 w-12 rounded-full object-cover mb-2 ring-2 ring-pink-300" />
                  ) : (
                    <UploadCloud size={24} className="text-pink-500 mb-2" />
                  )}
                  <p className="text-[11px] text-gray-600 font-medium">Drag & drop image here, or <label className="text-pink-600 underline cursor-pointer">browse<input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) processImageFile(e.target.files[0]); }} className="hidden" /></label></p>
                </div>
              </div>

              {formError && <p className="rounded-lg bg-red-50 p-2 text-[11px] font-bold text-red-600 text-center">{formError}</p>}

              <div className="flex gap-2 pt-3 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-xl border border-gray-200 py-2.5 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 rounded-xl bg-pink-600 py-2.5 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer">
                  {editingUser ? "Update User" : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW USER MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs" onClick={() => setSelectedUser(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedUser(null)} className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
            
            <div className="text-center mt-2">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-pink-50 bg-gradient-to-br from-pink-100 to-pink-200 text-2xl font-bold text-pink-700 shadow-sm overflow-hidden mb-3">
                {selectedUser.image ? (
                  <img src={selectedUser.image} alt={selectedUser.name} className="h-full w-full object-cover" />
                ) : (
                  selectedUser.initials
                )}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{selectedUser.name}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{selectedUser.email}</p>
              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold ${roleStyles[selectedUser.role]}`}>{selectedUser.role}</span>
            </div>

            <div className="mt-5 space-y-3 bg-gray-50 p-4 rounded-xl text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500">Phone Number</span><span className="font-bold text-gray-800">{selectedUser.phone}</span></div>
              <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500">Joined Date</span><span className="font-bold text-gray-800">{selectedUser.joined}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Account Status</span><span className={`font-bold ${selectedUser.status === "Active" ? "text-green-600" : "text-red-500"}`}>{selectedUser.status}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}