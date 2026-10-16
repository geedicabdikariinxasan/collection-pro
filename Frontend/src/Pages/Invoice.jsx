import React, { useState, useEffect } from "react";
import {
  Search, Bell, ChevronDown, FileText, LayoutDashboard, Package, Users,
  ShoppingCart, BarChart3, Boxes, Settings, User, Eye, X, Printer, Download,
  CheckCircle, Clock, Receipt, Wallet, Truck, LogOut, Menu,
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
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden" />}
      <aside className={`fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="border-b border-white/10 px-5 py-4 text-center">
            <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
            <h1 className="font-serif text-lg font-bold tracking-wider">COLLECTION PRO</h1>
            <p className="text-[7px] tracking-[2px] text-pink-100 uppercase">WOMEN'S FASHION & CLOTHING</p>
          </div>
          <nav className="px-3 py-3 space-y-1">
            {links.map(({ label, icon: Icon, path, active, isLogout }) => (
              <button 
                key={label} 
                onClick={() => { 
                  setMobileOpen(false); 
                  if (isLogout) navigate("/");
                  else if (path !== "#") navigate(path); 
                  else alert("Dhawaan ayaanu ku darnaa!"); 
                }} 
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                  isLogout ? "mt-4 bg-red-600/80 hover:bg-red-600 text-white font-bold" :
                  active ? "bg-pink-500 font-bold text-white shadow-md" : "hover:bg-white/10 text-pink-50"
                }`}
              >
                <Icon size={16} /> <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

function Header({ setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur shadow-xs print:hidden">
      <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-700 rounded-xl cursor-pointer"><Menu size={20}/></button>
      <div className="relative w-full max-w-[350px]">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input placeholder="Search invoices..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xs">A</div>
        <p className="text-xs font-bold text-gray-800">Admin</p>
      </div>
    </header>
  );
}

function ReceiptLetterModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handleDownloadPDF = () => {
    const element = document.getElementById("receipt-letter-card");
    const opt = {
      margin:       2,
      filename:     `Receipt-${invoice.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().from(element).set(opt).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <style>{`
        @media print {
          body, html {
            height: 100% !important;
            overflow: hidden !important;
            background: white !important;
          }
          #receipt-letter-card {
            transform: scale(0.92);
            transform-origin: top center;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      <div className="w-full max-w-lg bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-200 text-gray-800 my-auto" id="receipt-letter-card">
        <div className="flex justify-between items-start border-b-2 border-gray-900 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-lg shadow-sm">
              👗
            </div>
            <div>
              <h2 className="font-serif text-sm font-extrabold tracking-wide text-gray-900">COLLECTION PRO</h2>
              <p className="text-[7px] tracking-[1px] text-gray-500 uppercase font-semibold">WOMEN'S FASHION & CLOTHING</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-[11px] font-black uppercase tracking-wider text-gray-900">PAYMENT RECEIPT</h1>
            <p className="text-[10px] text-gray-500">Receipt No: <strong>REC-{invoice.id}</strong></p>
            <p className="text-[10px] text-gray-500">Date: <strong>{invoice.date || "2026-10-16"}</strong></p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1">Customer Information</p>
          <div className="grid grid-cols-2 gap-y-0.5 text-[11px]">
            <p><span className="text-gray-500">Full Name:</span> <strong className="text-gray-900">{invoice.customerName}</strong></p>
            <p><span className="text-gray-500">Phone:</span> <strong className="text-gray-900">{invoice.customerPhone || "N/A"}</strong></p>
            <p><span className="text-gray-500">Invoice No:</span> <strong className="text-gray-900">{invoice.id}</strong></p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1">Payment Details</p>
          <table className="w-full text-[11px] border border-gray-300 rounded overflow-hidden">
            <thead className="bg-gray-50 text-gray-700 font-bold">
              <tr className="border-b border-gray-300">
                <th className="p-1.5 text-left">Item Name</th>
                <th className="p-1.5 text-center">Qty</th>
                <th className="p-1.5 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items && invoice.items.length > 0 ? (
                invoice.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="p-1.5 font-semibold text-gray-800">{item.name}</td>
                    <td className="p-1.5 text-center text-gray-600">{item.qty}</td>
                    <td className="p-1.5 text-right font-bold text-pink-600">${Number(item.price).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-200">
                  <td className="p-1.5 font-semibold text-gray-800">Order Payment</td>
                  <td className="p-1.5 text-center text-gray-600">1</td>
                  <td className="p-1.5 text-right font-bold text-pink-600">${Number(invoice.totalAmount || 0).toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center bg-pink-50/50 p-2 rounded-lg border border-pink-100 mb-4">
          <span className="text-xs font-bold text-gray-800">Total Amount Paid:</span>
          <span className="text-sm font-black text-pink-600">${Number(invoice.totalAmount || 0).toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2 text-center text-[11px]">
          <div>
            <div className="border-t border-gray-400 pt-1 w-24 mx-auto"></div>
            <p className="text-gray-500 font-semibold text-[10px] mt-0.5">Customer Signature</p>
          </div>
          <div>
            <div className="border-t border-gray-400 pt-1 w-24 mx-auto"></div>
            <p className="text-gray-500 font-semibold text-[10px] mt-0.5">Authorized Signature</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 w-full max-w-lg print:hidden">
        <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-2.5 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer text-xs">
          <Printer size={15} /> Print Receipt
        </button>
        <button onClick={handleDownloadPDF} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 font-bold text-white shadow-md hover:bg-green-700 cursor-pointer text-xs">
          <Download size={15} /> Download PDF
        </button>
        <button onClick={onClose} className="rounded-xl border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer text-xs bg-white shadow-sm">
          Close
        </button>
      </div>
    </div>
  );
}

export default function Invoice() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [receiptInvoice, setReceiptInvoice] = useState(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    const formatted = rawInvoices.map((inv, idx) => ({ ...inv, id: `INV-${String(idx + 1).padStart(3, "0")}` }));
    setInvoices(formatted.filter(inv => inv.status !== "Paid"));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-pink-50/20 flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col h-screen lg:ml-[250px]">
        <Header setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          <table className="w-full bg-white rounded-2xl shadow-sm border border-pink-100">
            <thead className="bg-pink-50 text-xs">
              <tr><th className="p-4">Invoice No</th><th className="p-4">Customer</th><th className="p-4">Amount</th><th className="p-4">Action</th></tr>
            </thead>
            <tbody className="text-xs">
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="p-4 font-bold">{inv.id}</td>
                  <td className="p-4">{inv.customerName}</td>
                  <td className="p-4 font-bold text-pink-600">${inv.totalAmount.toFixed(2)}</td>
                  <td className="p-4"><button onClick={() => setReceiptInvoice(inv)} className="border px-3 py-1 rounded-lg">View Receipt</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      {receiptInvoice && <ReceiptLetterModal invoice={receiptInvoice} onClose={() => setReceiptInvoice(null)} />}
    </div>
  );
}