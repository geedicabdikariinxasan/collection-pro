import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
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
  Menu,
  UploadCloud,
  CheckCircle,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://collection-pro-backend.onrender.com/api"; // Ama http://localhost:5000/api haddii aad tijaabineyso Local

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const links = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: UsersIcon, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "/sales" },
    { label: "Invoices", icon: FileText, path: "/invoices" },
    { label: "Inventory / Stock", icon: Boxes, path: "/inventory" },
    { label: "Reports", icon: BarChart3, path: "#" },
    { label: "Users", icon: User, path: "/users", active: true },
    { label: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <>
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden" />
      )}
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
              {links.map(({ label, icon: Icon, path, active }) => (
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
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur shadow-xs">
      <div className="flex items-center gap-2.5 w-full max-w-[350px]">
        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"><Menu size={22} /></button>
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search users..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
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
          <div>
            <p className="text-xs font-bold text-gray-800">Admin</p>
            <p className="text-[9px] text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

const roleStyles = {
  Administrator: "bg-purple-100 text-purple-700",
  Cashier: "bg-pink-100 text-pink-700",
  Customer: "bg-blue-100 text-blue-700",
  ADMIN: "bg-purple-100 text-purple-700",
  CASHIER: "bg-pink-100 text-pink-700",
  CUSTOMER: "bg-blue-100 text-blue-700",
};

const emptyForm = {
  name: "", email: "", phone: "", role: "Customer", status: "Active", image: ""
};

export default function Users() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      let url = `${API_URL}/users?search=${search}&role=${roleFilter}&status=${statusFilter}`;
      const res = await axios.get(url);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users from DB:", err);
    }
  };

  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 150; canvas.height = 150;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 150, 150);
        setForm(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.8) }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user ee ku jira database-ka
        await axios.put(`${API_URL}/users/${editingUser._id}`, form);
      } else {
        // Save user cusub oo ku dhacaya database-ka
        await axios.post(`${API_URL}/users`, form);
      }
      fetchUsers();
      setShowModal(false);
      setEditingUser(null);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Qalad ayaa dhacay intii la keydinayay!");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirayso user-kan database-ka?")) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        fetchUsers();
        if (selectedUser?._id === id) setSelectedUser(null);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const toggleStatus = async (user) => {
    try {
      await axios.patch(`${API_URL}/users/${user._id}/status`);
      fetchUsers();
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const activeUsers = users.filter(u => u.status === "Active").length;
  const adminCount = users.filter(u => u.role?.toLowerCase().includes("admin")).length;
  const cashierCount = users.filter(u => u.role?.toLowerCase().includes("cashier")).length;
  const customerCount = users.filter(u => u.role?.toLowerCase().includes("customer")).length;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px]">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <UsersIcon size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Users Management</h1>
                <p className="text-xs text-gray-500">Live database synchronized users & roles.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => { setEditingUser(null); setForm(emptyForm); setShowModal(true); }} 
              className="flex items-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-pink-700 cursor-pointer"
            >
              <Plus size={16} /> Add User
            </button>
          </div>

          <section className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600"><UsersIcon size={18}/></div>
              <div><p className="text-[10px] text-gray-500 font-medium">Total Users</p><h2 className="text-xl font-bold text-gray-900">{users.length}</h2></div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600"><CheckCircle size={18}/></div>
              <div><p className="text-[10px] text-gray-500 font-medium">Active Users</p><h2 className="text-xl font-bold text-gray-900">{activeUsers}</h2></div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600"><User size={18}/></div>
              <div><p className="text-[10px] text-gray-500 font-medium">Administrators</p><h2 className="text-xl font-bold text-gray-900">{adminCount}</h2></div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><ShoppingCart size={18}/></div>
              <div><p className="text-[10px] text-gray-500 font-medium">Cashiers</p><h2 className="text-xl font-bold text-gray-900">{cashierCount}</h2></div>
            </div>
          </section>

          <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xs">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search users by name, phone..."
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-xs outline-none focus:border-pink-400"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-pink-400 cursor-pointer"
              >
                <option>All Roles</option>
                <option>Administrator</option>
                <option>Cashier</option>
                <option>Customer</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-pink-400 cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[700px]">
                <thead className="bg-pink-50/60 text-left text-gray-500 border-b border-pink-100">
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
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id} className="hover:bg-pink-50/20">
                        <td className="px-4 py-2.5 text-gray-600">{index + 1}</td>
                        <td className="px-4 py-2.5 flex items-center gap-2.5 font-bold text-gray-800">
                          <img 
                            src={user.image} 
                            alt="" 
                            className="h-8 w-8 rounded-full object-cover ring-1 ring-gray-200"
                            onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=47"; }}
                          />
                          <span>{user.name}</span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{user.email}</td>
                        <td className="px-4 py-2.5 text-gray-600">{user.phone}</td>
                        <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${roleStyles[user.role] || "bg-gray-100 text-gray-700"}`}>{user.role}</span></td>
                        <td className="px-4 py-2.5">
                          <button onClick={() => toggleStatus(user)} className={`px-2 py-0.5 rounded-full font-bold text-[10px] cursor-pointer ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {user.status}
                          </button>
                        </td>
                        <td className="px-4 py-2.5 text-gray-600">{user.joined}</td>
                        <td className="px-4 py-2.5 text-right space-x-1.5">
                          <button onClick={() => setSelectedUser(user)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer font-semibold inline-flex items-center gap-1 text-[10px]"><Eye size={12}/> View</button>
                          <button onClick={() => { setEditingUser(user); setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status, image: user.image }); setShowModal(true); }} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer"><Pencil size={12}/></button>
                          <button onClick={() => deleteUser(user._id)} className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer"><Trash2 size={12}/></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-14 text-center text-gray-400">
                        <UsersIcon size={38} className="mx-auto mb-2 text-gray-300" />
                        <p className="text-sm font-semibold">No users found in database.</p>
                        <p className="text-xs text-gray-400 mt-0.5">Click "Add User" to add your first user.</p>
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl text-xs">
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-gray-900">{editingUser ? "Edit User" : "Add New User"}</h3>
              <button onClick={() => setShowModal(false)} className="cursor-pointer text-gray-400 hover:text-gray-700"><X size={17}/></button>
            </div>
            
            <form onSubmit={saveUser} className="space-y-3">
              <div>
                <label className="block mb-0.5 font-medium text-gray-700">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Amina Ali" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400 text-xs" />
              </div>
              <div>
                <label className="block mb-0.5 block font-medium text-gray-700">Email Address</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="user@gmail.com" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400 text-xs" />
              </div>
              <div>
                <label className="block mb-0.5 block font-medium text-gray-700">Phone</label>
                <input required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="+252 61..." className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-pink-400 text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-0.5 block font-medium text-gray-700">Role</label>
                  <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer text-xs">
                    <option value="Administrator">Administrator</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-0.5 block font-medium text-gray-700">Status</label>
                  <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 outline-none focus:border-pink-400 cursor-pointer text-xs">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-0.5 block font-medium text-gray-700">Profile Picture</label>
                <div className="flex items-center gap-3 p-2 border-2 border-dashed border-pink-200 rounded-xl bg-pink-50/40 text-center cursor-pointer">
                  {form.image ? <img src={form.image} alt="" className="h-8 w-8 rounded-full object-cover" /> : <UploadCloud size={18} className="text-pink-500 mx-auto"/>}
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if(file) processImageFile(file);
                  }} className="text-[10px]" />
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border py-2.5 rounded-xl font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 text-xs">Cancel</button>
                <button type="submit" className="flex-1 bg-pink-600 text-white py-2.5 rounded-xl font-bold shadow-md hover:bg-pink-700 cursor-pointer text-xs">{editingUser ? "Update User" : "Save User"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelectedUser(null)}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center relative text-xs" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedUser(null)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 cursor-pointer"><X size={17}/></button>
            <img src={selectedUser.image} alt="" className="h-16 w-16 rounded-full object-cover mx-auto ring-2 ring-pink-300 mb-3" />
            <h3 className="font-bold text-sm text-gray-900">{selectedUser.name}</h3>
            <p className="text-gray-500 mb-3">{selectedUser.email}</p>
            <div className="bg-gray-50 p-3 rounded-xl text-left space-y-1.5 mb-4">
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Joined:</strong> {selectedUser.joined}</p>
            </div>
            <button onClick={() => setSelectedUser(null)} className="w-full bg-pink-600 text-white py-2 rounded-xl font-bold cursor-pointer">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}