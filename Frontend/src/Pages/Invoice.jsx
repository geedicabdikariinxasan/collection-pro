import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  FileText,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Boxes,
  Settings,
  User,
  Eye,
  X,
  Printer,
  Download,
  CheckCircle,
  Clock,
  Receipt,
  Wallet,
  LogOut,
  Menu,
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
    { label: "Logout", icon: LogOut, path: "/", isLogout: true },
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden"
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
                      ? "mt-3 bg-red-600/80 hover:bg-red-600 text-white font-bold shadow-sm"
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

function Header({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-4 md:px-6 backdrop-blur shadow-xs print:hidden">
      <div className="flex items-center gap-2.5 w-full max-w-[350px]">
        <button 
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search invoices..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
        </div>
      </div>

      <div className="ml-2 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer hidden sm:block">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">3</span>
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

function Badge({ children, type = "gray" }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
    pink: "bg-pink-100 text-pink-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return <span className={`inline-flex whitespace-nowrap items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${colors[type]}`}>{children}</span>;
}

function getStatusType(status) {
  if (status === "Paid" || status === "Delivered") return "green";
  if (status === "Unpaid" || status === "Pending") return "orange";
  if (status === "Processing") return "blue";
  return "pink";
}

function InvoiceDetails({ invoice, onClose, onMakePayment, onReceipt }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start justify-end bg-black/40 backdrop-blur-xs sm:bg-transparent sm:backdrop-blur-none print:hidden">
      <aside className="w-full sm:w-[330px] h-[85vh] sm:h-[calc(100vh-70px)] sm:top-[70px] bg-white rounded-t-2xl sm:rounded-none overflow-y-auto border-l border-gray-100 custom-scrollbar shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 bg-pink-50/50 sticky top-0 bg-white z-10">
            <h2 className="text-sm font-bold text-gray-900">Invoice Details</h2>
            <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-pink-50 hover:text-pink-600 cursor-pointer">
              <X size={17} />
            </button>
          </div>

          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <img 
                src={invoice.customerImage || "https://i.pravatar.cc/150?img=47"} 
                alt={invoice.customerName} 
                className="h-12 w-12 rounded-full object-cover ring-2 ring-pink-300 shadow-sm"
                onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=47"; }} 
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-gray-900 truncate">{invoice.customerName}</h3>
                <p className="text-[10px] text-gray-500 truncate">{invoice.customerEmail}</p>
                <p className="text-[10px] text-gray-500">{invoice.customerPhone}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-pink-100 px-2.5 py-1 font-bold text-pink-700 text-xs">{invoice.id}</span>
              <Badge type={getStatusType(invoice.status)}>{invoice.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg border border-gray-100 p-2 bg-gray-50">
                <span className="text-[9px] text-gray-400 block">Order Date</span>
                <strong className="text-gray-800">{invoice.date}</strong>
              </div>
              <div className="rounded-lg border border-gray-100 p-2 bg-gray-50">
                <span className="text-[9px] text-gray-400 block">Order ID</span>
                <strong className="text-pink-600">#{invoice.orderId}</strong>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100">
              <div className="bg-pink-50 px-3 py-2 font-bold text-gray-800 text-[11px]">Items in This Invoice</div>
              <div className="max-h-[120px] overflow-y-auto custom-scrollbar">
                {invoice.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between border-t border-gray-50 p-2">
                    <div className="flex items-center gap-2">
                      <img src={item.image || "https://images.unsplash.com/photo-1595777457583-95e059d581b8"} alt="" className="h-7 w-7 rounded object-cover" />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.qty} · ${item.price}</p>
                      </div>
                    </div>
                    <span className="font-bold text-pink-600">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between font-bold text-sm text-gray-900 border-t pt-2">
              <span>Total Amount</span>
              <span className="text-pink-600">${invoice.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t space-y-1.5 bg-gray-50 sticky bottom-0 z-10">
          {invoice.status !== "Paid" ? (
            <button onClick={() => onMakePayment(invoice)} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-3 font-bold text-white transition hover:bg-pink-700 cursor-pointer text-xs shadow-md">
              <Wallet size={15} /> Make Payment
            </button>
          ) : (
            <button onClick={() => onReceipt(invoice)} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 cursor-pointer text-xs shadow-md">
              <Receipt size={15} /> View Receipt
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

function PaymentModal({ invoice, onClose, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");

  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs print:hidden">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">Make Payment</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
        </div>
        <div className="mb-4 rounded-xl bg-pink-50 p-3 text-xs space-y-1">
          <p className="text-gray-500">Invoice: <strong className="text-gray-800">{invoice.id}</strong></p>
          <p className="text-gray-500">Customer: <strong className="text-gray-800">{invoice.customerName}</strong></p>
          <p className="text-xl font-bold text-pink-600 mt-1">${invoice.totalAmount?.toFixed(2)}</p>
        </div>

        {/* Payment Method ComboBox */}
        <div className="mb-4 text-xs">
          <label className="block font-bold text-gray-700 mb-1">Payment Method</label>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white p-2.5 outline-none focus:border-pink-400 cursor-pointer text-xs font-semibold"
          >
            <option value="Mobile Money">Mobile Money (Zaad / E-Dahab)</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button 
          onClick={() => onConfirm(invoice, paymentMethod)} 
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 font-bold text-white hover:bg-pink-700 cursor-pointer text-xs shadow-md"
        >
          <CheckCircle size={16} /> Payment Paid Successfully! ✅
        </button>
      </div>
    </div>
  );
}


function ReceiptLetterModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handleDownloadPDF = () => {
    const element = document.getElementById("pos-receipt-ticket");
    const options = {
      margin:       0,
      filename:     `Receipt-${invoice.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 3, useCORS: true },
      jsPDF:        { unit: 'mm', format: [80, 130], orientation: 'portrait' }
    };
    
    if (window.html2pdf) {
      window.html2pdf().from(element).set(options).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      
      {/* CSS-ka gaarka u ah Print-ka si uu uga saaro A4-ta weyn oo uu u daabaco rasiidhka dhuuban oo keliya */}
      <style>{`
        @media print {
          @page {
            size: 80mm 130mm;
            margin: 0;
          }
          body, html {
            width: 80mm;
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          body * {
            visibility: hidden !important;
          }
          #pos-receipt-ticket, #pos-receipt-ticket * {
            visibility: visible !important;
          }
          #pos-receipt-ticket {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 80mm !important;
            margin: 0 !important;
            padding: 8px !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
          }
          .no-print-area {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal-ka Dhexdiisa (Screen View): Wuxuu rasiidhka ka dhigayaa mid dhexda (Center) kaga yaal shaashadda */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="w-[280px] bg-white p-5 rounded-2xl shadow-2xl border border-gray-300 font-mono text-gray-900 relative text-[11px]" id="pos-receipt-ticket">
          
          {/* Header */}
          <div className="text-center mb-2">
            <div className="text-xl mb-0.5">👗</div>
            <h2 className="font-bold text-xs tracking-wide">COLLECTION PRO</h2>
            <p className="text-[9px]">Women's Fashion & Clothing</p>
            <p className="text-[9px]">+252 61 2345678</p>
          </div>

          <div className="border-t border-b border-dashed border-gray-400 py-1 my-1.5 text-[9px]">
            <p className="flex justify-between"><span>Date: {invoice.date}</span> <span>REC-{invoice.id}</span></p>
            <p className="truncate">Customer: {invoice.customerName}</p>
          </div>

          {/* Items Table */}
          <div className="space-y-1 my-2">
            <div className="flex justify-between font-bold border-b border-gray-400 pb-0.5 text-[10px]">
              <span>Description</span>
              <span>Price</span>
            </div>
            {invoice.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[10px]">
                <span className="truncate max-w-[150px]">{item.name} (x{item.qty})</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-dashed border-gray-400 pt-1 space-y-0.5 text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${invoice.totalAmount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-xs border-t border-gray-400 pt-0.5">
              <span>Total</span>
              <span>${invoice.totalAmount?.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer & Barcode */}
          <div className="border-t border-dashed border-gray-400 mt-2 pt-1 text-center text-[9px]">
            <p className="flex justify-between mb-1"><span>Payment</span> <span>{invoice.paymentMethod || "Mobile Money"}</span></p>
            <p className="font-bold mt-1">Thank you for your visit!</p>
            <p className="text-[8px] mb-2">Take care of your health & style!</p>
            
            <div className="tracking-widest font-bold text-[14px] text-black mt-2 select-none">
              ||||| | |||| ||| || |||||
            </div>
            <p className="text-[8px] text-gray-500 mt-0.5">5312797420721443</p>
          </div>

        </div>

        {/* Buttons (Print, PDF, Close) */}
        <div className="mt-4 flex gap-2 no-print-area w-full max-w-[280px]">
          <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-2.5 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer text-xs transition">
            <Printer size={14} /> Print
          </button>
          <button onClick={handleDownloadPDF} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 font-bold text-white shadow-md hover:bg-green-700 cursor-pointer text-xs transition">
            <Download size={14} /> PDF
          </button>
          <button onClick={onClose} className="rounded-xl border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer text-xs bg-white shadow-sm">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Invoice() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [search, setSearch] = useState("");
  const [paymentInvoice, setPaymentInvoice] = useState(null);
  const [receiptInvoice, setReceiptInvoice] = useState(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    
    const formattedInvoices = rawInvoices.map((inv, idx) => ({
      ...inv,
      originalIndex: idx,
      id: `INV-${String(idx + 1).padStart(3, "0")}`
    }));

    setInvoices(formattedInvoices);
  };

  const confirmPayment = (invoiceToPay, method) => {
    const updatedInvoice = { ...invoiceToPay, status: "Paid", paymentMethod: method };
    setPaymentInvoice(null);
    setReceiptInvoice(updatedInvoice);
  };

  const clearInvoiceAfterReceipt = () => {
    if (receiptInvoice && receiptInvoice.originalIndex !== undefined) {
      const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
      rawInvoices.splice(receiptInvoice.originalIndex, 1);
      localStorage.setItem("storeInvoices", JSON.stringify(rawInvoices));
    }
    
    setReceiptInvoice(null);
    setSelectedInvoice(null);
    loadInvoices();
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase();
    return (
      invoice.id.toLowerCase().includes(query) ||
      invoice.orderId.toLowerCase().includes(query) ||
      invoice.customerName.toLowerCase().includes(query)
    );
  });

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalUnpaid = invoices.filter(inv => inv.status !== "Paid").reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px] print:ml-0 print:h-auto print:overflow-visible">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-5 custom-scrollbar print:hidden">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
              <FileText size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Invoices Management</h1>
              <p className="text-xs text-gray-500">Manage orders, invoices, payments and receipts.</p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard title="Total Invoiced" amount={totalInvoiced} icon={<FileText size={20} />} />
            <SummaryCard title="Total Paid" amount={totalPaid} icon={<CheckCircle size={20} />} />
            <SummaryCard title="Outstanding" amount={totalUnpaid} icon={<Clock size={20} />} />
          </div>

          <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
            
            <section className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
              <div className="border-b border-gray-100 p-3">
                <div className="relative max-w-sm">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search invoices..."
                    className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-xs outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-xs">
                  <thead className="bg-pink-50/60 text-left text-gray-500">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Invoice No.</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice, index) => (
                        <tr key={invoice.id} className="hover:bg-pink-50/20">
                          <td className="px-4 py-2.5 text-gray-600">{index + 1}</td>
                          <td className="px-4 py-2.5 font-bold text-gray-900">{invoice.id}</td>
                          <td className="px-4 py-2.5">
                            <p className="font-semibold text-gray-800">{invoice.customerName}</p>
                            <p className="text-[10px] text-gray-400">{invoice.customerPhone}</p>
                          </td>
                          <td className="px-4 py-2.5 font-semibold text-pink-600">#{invoice.orderId}</td>
                          <td className="px-4 py-2.5 font-bold text-pink-600">${invoice.totalAmount?.toFixed(2)}</td>
                          <td className="px-4 py-2.5"><Badge type={getStatusType(invoice.status)}>{invoice.status}</Badge></td>
                          <td className="px-4 py-2.5 text-right">
                            <button
                              onClick={() => setSelectedInvoice(invoice)}
                              className="p-1.5 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 cursor-pointer font-semibold inline-flex items-center gap-1 text-xs"
                            >
                              <Eye size={12} /> View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-14 text-center text-gray-400">
                          <FileText size={38} className="mx-auto mb-2 text-gray-300" />
                          <p className="text-sm font-semibold">No invoices found</p>
                          <p className="text-xs text-gray-400 mt-0.5">Orders made in Orders page will show up here instantly.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <InvoiceDetails
              invoice={selectedInvoice}
              onClose={() => setSelectedInvoice(main => null)}
              onMakePayment={(invoice) => setPaymentInvoice(invoice)}
              onReceipt={(invoice) => setReceiptInvoice(invoice)}
            />
          </div>

          <footer className="py-4 text-center text-xs text-gray-400 mt-auto">
            © 2026 COLLECTION PRO • Style • Elegance • You
          </footer>
        </main>
      </div>

      <PaymentModal invoice={paymentInvoice} onClose={() => setPaymentInvoice(null)} onConfirm={confirmPayment} />
      <ReceiptLetterModal invoice={receiptInvoice} onClose={clearInvoiceAfterReceipt} />
    </div>
  );
}

function SummaryCard({ title, amount, icon }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-pink-100 bg-white p-4 shadow-xs">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="mt-1 text-xl font-bold text-gray-900">${amount?.toFixed(2)}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
        {icon}
      </div>
    </div>
  );
}