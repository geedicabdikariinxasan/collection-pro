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

            <div className="border-b border-white/10 px-4 py-3 text-center flex flex-col items-center justify-center shrink-0">
              <div className="mb-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl shadow-md">👗</div>
              <h1 className="font-serif text-sm font-bold tracking-wider whitespace-nowrap">COLLECTION PRO</h1>
              <p className="text-[6px] tracking-[1.5px] text-pink-100 uppercase">WOMEN'S FASHION & CLOTHING</p>
            </div>

            <nav className="px-2 py-1 space-y-0.5">
              <p className="mb-0.5 px-3 text-[7px] font-semibold uppercase tracking-[2px] text-pink-200">Main Menu</p>
              {links.map(({ label, icon: Icon, path, active }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMobileOpen(false);
                    if (path !== "#") navigate(path);
                    else alert(`Bogga "${label}" dhawaan ayaa la dhisayaa!`);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                    active ? "bg-pink-500 font-semibold shadow-md text-white" : "hover:bg-white/10 text-pink-50"
                  }`}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="px-3 py-2 text-center border-t border-white/10 bg-black/20 flex flex-col gap-1 shrink-0 my-1">
            <button onClick={() => navigate("/")} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-2 text-xs font-bold text-white hover:bg-red-600 transition cursor-pointer shadow-md">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
            <div>
              <p className="font-serif text-[9px] italic text-pink-100">Style • Elegance • You</p>
              <p className="text-[6px] text-pink-300">© 2026 COLLECTION PRO</p>
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-start justify-end bg-black/40 backdrop-blur-xs sm:bg-transparent sm:backdrop-blur-none">
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
              <span className="text-pink-600">${invoice.totalAmount.toFixed(2)}</span>
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
  if (!invoice) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">Make Payment</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
        </div>
        <div className="mb-4 rounded-xl bg-pink-50 p-3 text-xs">
          <p className="text-gray-500">Invoice: <strong className="text-gray-800">{invoice.id}</strong></p>
          <p className="text-gray-500 mt-1">Customer: <strong className="text-gray-800">{invoice.customerName}</strong></p>
          <p className="mt-2 text-xl font-bold text-pink-600">${invoice.totalAmount.toFixed(2)}</p>
        </div>
        <button 
          onClick={() => onConfirm(invoice.originalIndex)} 
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 font-bold text-white hover:bg-pink-700 cursor-pointer text-xs shadow-md"
        >
          <CheckCircle size={16} /> Payment Paid Successfully! ✅
        </button>
      </div>
    </div>
  );
}

function ReceiptModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handleDownloadPDF = () => {
    const element = document.getElementById("printable-receipt");
    const options = {
      margin:      0,
      filename:    `Receipt-${invoice.id}.pdf`,
      image:       { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    if (window.html2pdf) {
      window.html2pdf().from(element).set(options).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto print:bg-white print:p-0 print:block">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-300 relative text-gray-800 my-2 sm:my-4 print:shadow-none print:border-none print:w-full print:max-w-none print:m-0 print:p-0">
        
        <div id="printable-receipt" className="space-y-4 bg-white p-0 m-0">
          <div className="flex justify-between items-start border-b-2 border-gray-900 pb-3 pt-0 mt-0">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xl">
                👗
              </div>
              <div>
                <h2 className="font-serif text-lg font-extrabold tracking-wide">COLLECTION PRO</h2>
                <p className="text-[8px] tracking-[1.5px] text-gray-500 uppercase font-semibold">WOMEN'S FASHION & CLOTHING</p>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-sm font-black uppercase tracking-wider text-gray-900">PAYMENT RECEIPT</h1>
              <p className="text-[11px] text-gray-500">Receipt No: <strong>REC-{invoice.id}</strong></p>
              <p className="text-[11px] text-gray-500">Date: <strong>{invoice.date}</strong></p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">Customer Information</p>
            <div className="grid grid-cols-2 gap-y-1 text-xs">
              <p><span className="text-gray-500">Full Name:</span> <strong className="text-gray-900">{invoice.customerName}</strong></p>
              <p><span className="text-gray-500">Phone:</span> <strong className="text-gray-900">{invoice.customerPhone || "N/A"}</strong></p>
              <p><span className="text-gray-500">Email:</span> <strong className="text-gray-900">{invoice.customerEmail}</strong></p>
              <p><span className="text-gray-500">Invoice No:</span> <strong className="text-gray-900">{invoice.id}</strong></p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">Payment Details</p>
            <table className="w-full text-xs border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-bold bg-gray-50 text-gray-700 w-1/3">Payment ID</td>
                  <td className="p-2 font-semibold text-gray-900">PAY-{invoice.id}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-bold bg-gray-50 text-gray-700">Payment Date</td>
                  <td className="p-2 text-gray-900">{invoice.date}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-bold bg-gray-50 text-gray-700">Payment Method</td>
                  <td className="p-2 text-gray-900">Mobile Money / Cash</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 font-bold bg-gray-50 text-gray-700">Payment Status</td>
                  <td className="p-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold text-[10px]">Paid</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-gray-50 text-gray-700">Amount Paid</td>
                  <td className="p-2 font-black text-pink-600 text-sm">${invoice.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 text-center text-xs">
            <div>
              <div className="border-t border-gray-400 pt-1 w-32 mx-auto"></div>
              <p className="text-gray-500 font-semibold mt-0.5">Customer Signature</p>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-1 w-32 mx-auto"></div>
              <p className="text-gray-500 font-semibold mt-1">Authorized Signature</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 print:hidden">
          <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-2.5 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer text-xs">
            <Printer size={15} /> Print
          </button>
          <button onClick={handleDownloadPDF} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 font-bold text-white shadow-md hover:bg-green-700 cursor-pointer text-xs">
            <Download size={15} /> Download PDF
          </button>
          <button onClick={onClose} className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer text-xs">
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
    
    // Kaliya soo bandhig Invoices-ka aan weli la bixin (Unpaid/Pending), ama kuwa aan tirtirmin.
    // Haddii aad rabto in wixii Paid ah oo dhan ay meesha ka baxaan:
    const activeInvoices = rawInvoices.filter(inv => inv.status !== "Paid");

    const formattedInvoices = activeInvoices.map((inv, idx) => ({
      ...inv,
      originalIndex: rawInvoices.indexOf(inv), // Kaydi index-ka saxda ah
      id: `INV-${String(idx + 1).padStart(3, "0")}`
    }));

    setInvoices(formattedInvoices);
  };

  const confirmPayment = (originalIndex) => {
    const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    
    if (rawInvoices[originalIndex] !== undefined) {
      // Si loo tirtiro gebi ahaanba ama loo beddelo status-ka oo laga saaro liiska active-ka:
      rawInvoices.splice(originalIndex, 1);
      localStorage.setItem("storeInvoices", JSON.stringify(rawInvoices));
    }
    
    loadInvoices();
    setPaymentInvoice(null);
    setSelectedInvoice(null);
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
  const totalPaid = 0; // Maadaama kuwa paid-ka ah ay baxayaan
  const totalUnpaid = totalInvoiced;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px]">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-5 custom-scrollbar">
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
                          <td className="px-4 py-2.5 font-bold text-pink-600">${invoice.totalAmount.toFixed(2)}</td>
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
              onClose={() => setSelectedInvoice(null)}
              onMakePayment={(invoice) => setPaymentInvoice(invoice)}
              onReceipt={(invoice) => setReceiptInvoice(invoice)}
            />
          </div>

          <footer className="py-4 text-center text-xs text-gray-400 mt-auto">
            © 2026 COLLECTION PRO · Style · Elegance · You
          </footer>
        </main>
      </div>

      <PaymentModal invoice={paymentInvoice} onClose={() => setPaymentInvoice(null)} onConfirm={confirmPayment} />
      <ReceiptModal invoice={receiptInvoice} onClose={() => setReceiptInvoice(null)} />
    </div>
  );
}

function SummaryCard({ title, amount, icon }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-pink-100 bg-white p-4 shadow-xs">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="mt-1 text-xl font-bold text-gray-900">${amount.toFixed(2)}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
        {icon}
      </div>
    </div>
  );
}