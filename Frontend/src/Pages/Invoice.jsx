import React, { useState, useEffect } from "react";
import {
  Search, Bell, ChevronDown, FileText, LayoutDashboard, Package, Users,
  ShoppingCart, BarChart3, Boxes, Settings, User, Eye, X, Printer, Download,
  CheckCircle, Clock, Receipt, Wallet, Truck, LogOut, Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sidebar iyo Header waxaa la mid ah kuwii hore
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
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden" />}
      <aside className={`fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="border-b border-white/10 px-5 py-4 text-center">
            <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">👗</div>
            <h1 className="font-serif text-lg font-bold tracking-wider">COLLECTION PRO</h1>
          </div>
          <nav className="px-3 py-3 space-y-1">
            {links.map(({ label, icon: Icon, path, active }) => (
              <button key={label} onClick={() => { setMobileOpen(false); if(path!=="#") navigate(path); else alert("Dhawaan ayaanu ku darnaa!"); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition ${active ? "bg-pink-500 font-bold" : "hover:bg-white/10"}`}>
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
      <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2"><Menu size={20}/></button>
      <div className="relative w-full max-w-[350px]">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input placeholder="Search invoices..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none" />
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xs">A</div>
        <p className="text-xs font-bold">Admin</p>
      </div>
    </header>
  );
}

function ReceiptLetterModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handleDownloadPDF = () => {
    const element = document.getElementById("receipt-letter-card");
    const opt = {
      margin: 10,
      filename: `Receipt-${invoice.id}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    window.html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-white p-8 shadow-2xl border-2 border-pink-400 rounded-3xl" id="receipt-letter-card">
        <div className="flex justify-between border-b-2 border-pink-600 pb-4 mb-4">
           <div><h2 className="font-serif text-xl font-bold">COLLECTION PRO</h2><p className="text-[9px]">OFFICIAL RECEIPT</p></div>
           <div className="text-right text-xs">
             <p>Receipt: <strong>REC-{invoice.id}</strong></p>
             <p>Date: <strong>{invoice.date}</strong></p>
           </div>
        </div>
        <div className="text-xs space-y-2 mb-6">
            <p>Customer: <strong>{invoice.customerName}</strong></p>
            <p>Phone: <strong>{invoice.customerPhone}</strong></p>
        </div>
        <table className="w-full text-xs border border-gray-300">
            <thead className="bg-gray-100"><tr><th className="p-2 border">Item</th><th className="p-2 border">Qty</th><th className="p-2 border">Price</th></tr></thead>
            <tbody>
                {invoice.items.map((item, i) => (
                    <tr key={i}><td className="p-2 border">{item.name}</td><td className="p-2 border">{item.qty}</td><td className="p-2 border">${item.price}</td></tr>
                ))}
            </tbody>
        </table>
        <p className="text-lg font-bold text-pink-600 mt-4 text-right">Total: ${invoice.totalAmount.toFixed(2)}</p>
        
        <div className="mt-8 flex gap-3 print:hidden">
            <button onClick={() => window.print()} className="flex-1 bg-pink-600 py-3 text-white font-bold rounded-xl text-xs">Print</button>
            <button onClick={handleDownloadPDF} className="flex-1 bg-green-600 py-3 text-white font-bold rounded-xl text-xs">Download PDF</button>
            <button onClick={onClose} className="border px-6 py-3 rounded-xl font-bold text-xs">Close</button>
        </div>
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
    const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    const formatted = rawInvoices.map((inv, idx) => ({ ...inv, id: `INV-${String(idx + 1).padStart(3, "0")}` }));
    setInvoices(formatted.filter(inv => inv.status !== "Paid"));
  }, []);

  const confirmPayment = (invoiceId) => {
    const raw = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    const updated = raw.map(inv => (inv.orderId === selectedInvoice.orderId ? { ...inv, status: "Paid" } : inv));
    localStorage.setItem("storeInvoices", JSON.stringify(updated));
    alert("Payment Paid Successfully!");
    setReceiptInvoice(selectedInvoice);
    setSelectedInvoice(null);
    const updatedFormatted = updated.filter(inv => inv.status !== "Paid").map((inv, idx) => ({ ...inv, id: `INV-${String(idx + 1).padStart(3, "0")}` }));
    setInvoices(updatedFormatted);
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
                  <td className="p-4"><button onClick={() => setSelectedInvoice(inv)} className="border px-3 py-1 rounded-lg">View</button></td>
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