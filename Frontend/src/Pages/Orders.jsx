import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  CalendarDays,
  CreditCard,
  Truck,
  Phone,
  MapPin,
  X,
  Eye,
  Bell,
  CheckCircle,
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  FileText,
  Boxes,
  Settings,
  User,
  LogOut,
  Plus,
  Trash2,
  Grid,
  List,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Customers", icon: Users, path: "/customers" },
    { name: "Orders", icon: ShoppingCart, path: "/orders", active: true },
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
        <input type="text" placeholder="Search products..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
      </div>
      <div className="ml-4 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">8</span>
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

const money = (amount) => `$${Number(amount || 0).toFixed(2)}`;

export default function Orders() {
  const [storeProducts, setStoreProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [paymentFilter, setPaymentFilter] = useState("All Payment Methods");
  
  const [invoiceSent, setInvoiceSent] = useState(false);

  useEffect(() => {
    fetchData();
  }, [search, statusFilter, paymentFilter]);

  const fetchData = async () => {
    try {
      const prodRes = await axios.get("http://localhost:5000/api/products");
      setStoreProducts(prodRes.data);

      const custRes = await axios.get("http://localhost:5000/api/customers");
      setCustomers(custRes.data);
      if (custRes.data.length > 0 && !selectedCustomer) {
        setSelectedCustomer(custRes.data[0]);
      }
    } catch (err) {
      console.error("Error loading orders data:", err);
    }
  };

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.productId === product._id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === product._id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          qty: 1,
          size: product.size || "M",
          color: product.color || "Pink",
          image: product.image
        },
      ]);
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  // QODOBKA MUHIMKA AH: Halkan waxaa xogta loo dirayaa Invoices Page-ka si toos ah
  const handleSendPayment = () => {
    if (cartItems.length === 0) {
      alert("Fadlan ku dar wax badeecad ah Order-ka!");
      return;
    }
    if (!selectedCustomer) {
      alert("Fadlan dooro Customer!");
      return;
    }

    const currentInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    
    const newInvoice = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      orderId: "ORD-1001",
      customerName: selectedCustomer.name,
      customerEmail: selectedCustomer.email,
      customerPhone: selectedCustomer.phone,
      customerImage: selectedCustomer.image,
      date: new Date().toISOString().split('T')[0],
      totalAmount: subtotal,
      status: "Unpaid",
      items: cartItems
    };

    // Ku kaydi localStorage si bogga Invoices uu uga dhex helo
    localStorage.setItem("storeInvoices", JSON.stringify([newInvoice, ...currentInvoices]));

    setInvoiceSent(true);
    setTimeout(() => {
      setInvoiceSent(false);
      setCartItems([]);
    }, 4000);
  };

  const filteredProducts = storeProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f8fb] flex">
      <Sidebar />

      <div className="ml-[250px] flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          
          {/* Page Heading */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <ShoppingCart size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Orders</h1>
                <p className="text-xs text-gray-500">View and manage all customer orders.</p>
              </div>
            </div>

            {/* Dooro Customer */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-gray-600">Customer:</span>
              <select
                value={selectedCustomer?._id || ""}
                onChange={(e) => {
                  const found = customers.find(c => c._id === e.target.value);
                  setSelectedCustomer(found);
                }}
                className="text-xs font-semibold text-pink-600 bg-transparent outline-none cursor-pointer"
              >
                {customers.length > 0 ? (
                  customers.map(c => <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>)
                ) : (
                  <option value="">No customers found (Add in Customers)</option>
                )}
              </select>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-xs">
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-4">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search by customer name, order ID..."
                  className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-pink-400"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer"
              >
                <option>All Status</option>
                <option>Delivered</option>
                <option>Pending</option>
                <option>Processing</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer"
              >
                <option>All Payment Methods</option>
                <option>Mobile Money</option>
                <option>Credit Card</option>
                <option>Cash</option>
              </select>

              <div className="flex items-center justify-end gap-1.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600 text-white cursor-pointer"><Grid size={15}/></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-pink-50 cursor-pointer"><List size={15}/></button>
              </div>
            </div>
          </div>

          {/* Main Grid: Products Grid (Left) & Order Details (Right) */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">

            {/* Products Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 content-start">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <div key={prod._id} className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden flex flex-col justify-between">
                    <div className="relative h-[130px] bg-pink-50">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      <span className="absolute left-2 top-2 rounded-full bg-pink-600 px-2 py-0.5 text-[9px] font-semibold text-white">
                        {prod.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold text-gray-800 truncate">{prod.name}</h3>
                      <p className="text-sm font-bold text-pink-600 mt-0.5">${Number(prod.price).toFixed(2)}</p>
                      <p className="text-[10px] text-gray-400 mb-2.5">In Stock ({prod.stock})</p>

                      <div className="grid grid-cols-2 gap-1">
                        <button 
                          onClick={() => handleAddToCart(prod)}
                          className="flex items-center justify-center gap-1 rounded-lg bg-pink-600 py-1.5 text-[10px] font-semibold text-white hover:bg-pink-700 cursor-pointer"
                        >
                          <Plus size={12} /> Add Order
                        </button>
                        <button 
                          onClick={() => handleRemoveItem(prod._id)}
                          className="flex items-center justify-center gap-1 rounded-lg border border-pink-300 py-1.5 text-[10px] font-semibold text-pink-600 hover:bg-pink-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-gray-300 rounded-xl bg-white">
                  <Package size={38} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm font-semibold text-gray-700">No products found.</p>
                  <p className="text-xs text-gray-400 mt-0.5">Add products from Products management page.</p>
                </div>
              )}
            </div>

            {/* Order Details Panel */}
            <aside className="bg-white rounded-xl border border-gray-100 shadow-xs p-4 text-xs flex flex-col justify-between h-fit">
              <div>
                <div className="flex items-center justify-between border-b pb-3 mb-3">
                  <h2 className="font-bold text-gray-900 text-sm">Order Details</h2>
                  <span className="rounded-full bg-green-100 text-green-700 px-2.5 py-0.5 text-[10px] font-bold">Delivered</span>
                </div>

                <div className="bg-pink-500 text-white rounded-lg p-2.5 mb-3 font-bold text-center text-xs shadow-sm">
                  Order #ORD-1001
                </div>

                {/* Xogta Customer-ka */}
                {selectedCustomer ? (
                  <div className="mb-3 flex items-start gap-3 bg-pink-50/40 p-3 rounded-xl border border-pink-100">
                    <img 
                      src={selectedCustomer.image} 
                      alt="Customer" 
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-pink-300 mt-0.5" 
                      onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=47"; }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900">{selectedCustomer.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{selectedCustomer.email}</p>
                      <p className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5"><Phone size={10}/> {selectedCustomer.phone}</p>
                      <p className="text-[10px] text-gray-600 flex items-center gap-1"><MapPin size={10}/> {selectedCustomer.city}, Somalia</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 p-3 rounded-xl bg-gray-50 text-gray-400 text-center italic">
                    No customer selected.
                  </div>
                )}

                <div className="grid grid-cols-3 gap-1.5 mb-3 text-[10px] bg-gray-50 p-2 rounded-lg text-center">
                  <div>
                    <span className="text-gray-400 block">Order Date</span>
                    <strong className="text-gray-800">2026-09-30</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Payment</span>
                    <strong className="text-gray-800">Mobile Money</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Delivery</span>
                    <strong className="text-green-600">Delivered</strong>
                  </div>
                </div>

                <div className="border-t pt-3 mb-3">
                  <h3 className="font-bold text-gray-800 mb-2">Items in this Order (from Cart)</h3>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-1">
                    {cartItems.length > 0 ? (
                      cartItems.map((item, idx) => (
                        <div key={item.productId} className="flex items-center justify-between gap-2 border-b border-gray-50 pb-2">
                          <div className="flex items-center gap-2">
                            <img src={item.image} alt="" className="h-8 w-8 rounded-lg object-cover" />
                            <div>
                              <p className="font-semibold text-gray-800">{item.name}</p>
                              <p className="text-[10px] text-gray-400">Qty: {item.qty} · Size: {item.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-pink-600">${(item.price * item.qty).toFixed(2)}</span>
                            <button onClick={() => handleRemoveItem(item.productId)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={12}/></button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4 italic">No items added to cart yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-3 space-y-1.5 mt-2">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Discount</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-gray-900 border-t pt-2">
                  <span>Total Amount</span>
                  <span className="text-pink-600">${subtotal.toFixed(2)}</span>
                </div>

                {invoiceSent && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-2.5 text-[11px] leading-4 text-green-700 text-center font-medium">
                    ✅ Order information sent to invoice! The order details have been successfully delivered to the invoice page.
                  </div>
                )}

                <button 
                  onClick={handleSendPayment}
                  className="w-full mt-2 rounded-xl bg-pink-600 py-3 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer text-xs"
                >
                  Send Payment
                </button>
              </div>
            </aside>

          </div>

          <footer className="py-4 text-center mt-auto">
            <p className="text-[10px] text-gray-400">© 2026 COLLECTION PRO • Style • Elegance • You</p>
          </footer>
        </main>
      </div>
    </div>
  );
}