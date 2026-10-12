import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

/*
  FIDDIN: rasiidka PDF-ka u soo dejinta waxay u baahan tahay:
      npm i html2pdf.js
*/

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

      <aside
        className={`fixed left-0 top-0 h-screen w-[250px] bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative justify-between">
          <div>
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 text-white lg:hidden p-1 cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            <div className="border-b border-white/10 px-5 py-4 text-center flex flex-col items-center justify-center">
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl shadow-md">
                👗
              </div>
              <h1 className="font-serif text-lg font-bold tracking-wider whitespace-nowrap">
                COLLECTION PRO
              </h1>
              <p className="text-[7px] tracking-[2px] text-pink-100 uppercase">
                WOMEN'S FASHION & CLOTHING
              </p>
            </div>

            <nav className="px-3 py-3 space-y-1">
              <p className="mb-1 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-pink-200">
                Main Menu
              </p>
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
            <p className="font-serif text-[10px] italic text-pink-100">
              Style • Elegance • You
            </p>
            <p className="text-[7px] text-pink-300">© 2026 COLLECTION PRO</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ setMobileOpen, search, setSearch }) {
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
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoices..."
            className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none"
          />
        </div>
      </div>

      <div className="ml-2 flex items-center gap-3">
        <button className="relative rounded-full p-2 text-gray-500 hover:bg-pink-50 cursor-pointer hidden sm:block">
          <Bell size={18} />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <div className="h-6 w-px bg-gray-200 hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-bold text-xs">
            A
          </div>
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
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${colors[type]}`}
    >
      {children}
    </span>
  );
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
      <aside className="w-full sm:w-[330px] h-[85vh] sm:h-[calc(100vh-70px)] sm:mt-[70px] bg-white rounded-t-2xl sm:rounded-none overflow-y-auto border-l border-gray-100 custom-scrollbar shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sticky top-0 bg-white z-10">
            <h2 className="text-sm font-bold text-gray-900">Invoice Details</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-pink-50 hover:text-pink-600 cursor-pointer"
            >
              <X size={17} />
            </button>
          </div>

          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <img
                src={invoice.customerImage || "https://i.pravatar.cc/150?img=47"}
                alt={invoice.customerName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-pink-300 shadow-sm"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?img=47";
                }}
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-gray-900 truncate">
                  {invoice.customerName}
                </h3>
                <p className="text-[10px] text-gray-500 truncate">
                  {invoice.customerEmail}
                </p>
                <p className="text-[10px] text-gray-500">{invoice.customerPhone}</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-pink-100 px-2.5 py-1 font-bold text-pink-700 text-xs">
                {invoice.id}
              </span>
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
              <div className="bg-pink-50 px-3 py-2 font-bold text-gray-800 text-[11px]">
                Items in This Invoice
              </div>
              <div className="max-h-[120px] overflow-y-auto custom-scrollbar">
                {invoice.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-t border-gray-50 p-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1595777457583-95e059d581b8"
                        }
                        alt=""
                        className="h-7 w-7 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-[10px] text-gray-400">
                          Qty: {item.qty} · ${item.price}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-pink-600">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
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
            <button
              onClick={() => onMakePayment(invoice)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-3 font-bold text-white transition hover:bg-pink-700 cursor-pointer text-xs shadow-md"
            >
              <Wallet size={15} /> Make Payment
            </button>
          ) : (
            <button
              onClick={() => onReceipt(invoice)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700 cursor-pointer text-xs shadow-md"
            >
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs print:hidden">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">Make Payment</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <div className="mb-4 rounded-xl bg-pink-50 p-3 text-xs">
          <p className="text-gray-500">
            Invoice: <strong className="text-gray-800">{invoice.id}</strong>
          </p>
          <p className="text-gray-500 mt-1">
            Customer: <strong className="text-gray-800">{invoice.customerName}</strong>
          </p>
          <p className="mt-2 text-xl font-bold text-pink-600">
            ${invoice.totalAmount?.toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => onConfirm(invoice)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 font-bold text-white hover:bg-pink-700 cursor-pointer text-xs shadow-md"
        >
          <CheckCircle size={16} /> Payment Paid Successfully! ✅
        </button>
      </div>
    </div>
  );
}

const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// HTML madax-banaan oo rasiidka oo keliya ah (ma tiirsana Tailwind ama @media print)
function buildReceiptHTML(invoice) {
  const items = invoice.items || [];
  const itemRows = items
    .map(
      (it) => `<tr>
        <td>${esc(it.name)}</td>
        <td class="c">${esc(it.qty)}</td>
        <td class="r">$${Number(it.price).toFixed(2)}</td>
        <td class="r b">$${(Number(it.price) * Number(it.qty)).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Receipt-${esc(invoice.id)}</title>
<style>
  @page { size: A4; margin: 12mm; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; margin: 0; padding: 16px; font-size: 13px; }
  .wrap { max-width: 640px; margin: 0 auto; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #111; padding-bottom: 10px; }
  .brand { font-size: 18px; font-weight: 800; font-family: Georgia, serif; }
  .sub { font-size: 9px; letter-spacing: 1.5px; color: #6b7280; text-transform: uppercase; }
  .right { text-align: right; font-size: 11px; color: #6b7280; }
  .right h1 { margin: 0 0 4px; font-size: 14px; color: #111; letter-spacing: 1px; }
  h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; margin: 18px 0 8px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; }
  .grid span { color: #6b7280; }
  table { width: 100%; border-collapse: collapse; border: 1px solid #d1d5db; }
  th, td { padding: 7px 8px; border-bottom: 1px solid #e5e7eb; text-align: left; }
  th { background: #f9fafb; }
  td.c, th.c { text-align: center; } td.r, th.r { text-align: right; } .b { font-weight: 700; }
  .k { background: #f9fafb; font-weight: 700; width: 34%; }
  .paid { background: #dcfce7; color: #15803d; font-weight: 700; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
  .amt { color: #db2777; font-weight: 800; font-size: 15px; }
  .sign { display: flex; justify-content: space-around; margin-top: 50px; text-align: center; font-size: 12px; color: #6b7280; }
  .sign div { border-top: 1px solid #9ca3af; padding-top: 4px; width: 140px; }
  .thanks { text-align: center; color: #9ca3af; font-size: 11px; margin-top: 24px; }
</style></head>
<body><div class="wrap">
  <div class="head">
    <div><div class="brand">👗 COLLECTION PRO</div><div class="sub">Women's Fashion &amp; Clothing</div></div>
    <div class="right"><h1>PAYMENT RECEIPT</h1>
      <div>Receipt No: <b>REC-${esc(invoice.id)}</b></div>
      <div>Date: <b>${esc(invoice.date)}</b></div></div>
  </div>

  <h3>Customer Information</h3>
  <div class="grid">
    <div><span>Full Name:</span> <b>${esc(invoice.customerName)}</b></div>
    <div><span>Phone:</span> <b>${esc(invoice.customerPhone || "N/A")}</b></div>
    <div><span>Email:</span> <b>${esc(invoice.customerEmail || "N/A")}</b></div>
    <div><span>Invoice No:</span> <b>${esc(invoice.id)}</b></div>
  </div>

  ${
    items.length
      ? `<h3>Items</h3><table><thead><tr><th>Item</th><th class="c">Qty</th><th class="r">Price</th><th class="r">Total</th></tr></thead><tbody>${itemRows}</tbody></table>`
      : ""
  }

  <h3>Payment Details</h3>
  <table><tbody>
    <tr><td class="k">Payment ID</td><td>PAY-${esc(invoice.id)}</td></tr>
    <tr><td class="k">Payment Date</td><td>${esc(invoice.paidDate || invoice.date)}</td></tr>
    <tr><td class="k">Payment Method</td><td>Mobile Money / Cash</td></tr>
    <tr><td class="k">Payment Status</td><td><span class="paid">Paid</span></td></tr>
    <tr><td class="k">Amount Paid</td><td class="amt">$${Number(invoice.totalAmount || 0).toFixed(2)}</td></tr>
  </tbody></table>

  <div class="sign"><div>Customer Signature</div><div>Authorized Signature</div></div>
  <p class="thanks">Mahadsanid! Thank you for shopping with COLLECTION PRO.</p>
</div>
<script>window.onload = function () { setTimeout(function () { window.print(); }, 400); };</script>
</body></html>`;
}

function ReceiptModal({ invoice, onClose }) {
  const [downloading, setDownloading] = useState(false);

  // Xir marka la riixo Escape
  useEffect(() => {
    if (!invoice) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [invoice, onClose]);

  if (!invoice) return null;

  const items = invoice.items || [];

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) {
      alert("Browser-ku daaqadda wuu xiray. Fadlan ogolow popups, ama isticmaal Download PDF.");
      return;
    }
    w.document.open();
    w.document.write(buildReceiptHTML(invoice));
    w.document.close();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("printable-receipt-card");
    if (!element) return;

    setDownloading(true);
    try {
      let html2pdf;
      try {
        html2pdf = (await import("html2pdf.js")).default;
      } catch {
        html2pdf = window.html2pdf; // haddii CDN script la isticmaalo
      }

      if (!html2pdf) {
        alert("html2pdf.js lama helin. Fadlan ku qor: npm i html2pdf.js");
        return;
      }

      await html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: `Receipt-${invoice.id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            windowWidth: 800,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all"] },
        })
        .save();
    } catch (err) {
      console.error(err);
      alert("PDF lama samayn karin. Fadlan isku day Print.");
    } finally {
      setDownloading(false);
    }
  };

  return createPortal(
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 12mm; }
          html, body { height: auto !important; overflow: visible !important; background: #fff !important; }
          body > *:not(#receipt-portal) { display: none !important; }
          #receipt-portal {
            position: static !important;
            display: block !important;
            overflow: visible !important;
            height: auto !important;
            padding: 0 !important;
            background: #fff !important;
            backdrop-filter: none !important;
          }
          #printable-receipt-card {
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print-area { display: none !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div
        id="receipt-portal"
        className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:p-6"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg my-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ===== Kaarka la daabacayo / la soo dejinayo ===== */}
          <div
            id="printable-receipt-card"
            className="w-full rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-200 text-gray-800"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="flex justify-between items-start border-b-2 border-gray-900 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-xl">
                  👗
                </div>
                <div>
                  <h2 className="font-serif text-lg font-extrabold tracking-wide text-gray-900">
                    COLLECTION PRO
                  </h2>
                  <p className="text-[8px] tracking-[1.5px] text-gray-500 uppercase font-semibold">
                    WOMEN'S FASHION & CLOTHING
                  </p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-sm font-black uppercase tracking-wider text-gray-900">
                  PAYMENT RECEIPT
                </h1>
                <p className="text-[11px] text-gray-500">
                  Receipt No: <strong>REC-{invoice.id}</strong>
                </p>
                <p className="text-[11px] text-gray-500">
                  Date: <strong>{invoice.date}</strong>
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                Customer Information
              </p>
              <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-xs">
                <p>
                  <span className="text-gray-500">Full Name:</span>{" "}
                  <strong className="text-gray-900">{invoice.customerName}</strong>
                </p>
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  <strong className="text-gray-900">{invoice.customerPhone || "N/A"}</strong>
                </p>
                <p className="break-all">
                  <span className="text-gray-500">Email:</span>{" "}
                  <strong className="text-gray-900">{invoice.customerEmail || "N/A"}</strong>
                </p>
                <p>
                  <span className="text-gray-500">Invoice No:</span>{" "}
                  <strong className="text-gray-900">{invoice.id}</strong>
                </p>
              </div>
            </div>

            {items.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                  Items
                </p>
                <table className="w-full text-xs border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50 text-left text-gray-700">
                      <th className="p-2 border-b border-gray-300">Item</th>
                      <th className="p-2 border-b border-gray-300 text-center">Qty</th>
                      <th className="p-2 border-b border-gray-300 text-right">Price</th>
                      <th className="p-2 border-b border-gray-300 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-200 last:border-b-0">
                        <td className="p-2 text-gray-900">{item.name}</td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-right">${Number(item.price).toFixed(2)}</td>
                        <td className="p-2 text-right font-semibold">
                          ${(item.price * item.qty).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">
                Payment Details
              </p>
              <table className="w-full text-xs border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 font-bold bg-gray-50 text-gray-700 w-1/3">Payment ID</td>
                    <td className="p-2 font-semibold text-gray-900">PAY-{invoice.id}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 font-bold bg-gray-50 text-gray-700">Payment Date</td>
                    <td className="p-2 text-gray-900">{invoice.paidDate || invoice.date}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 font-bold bg-gray-50 text-gray-700">Payment Method</td>
                    <td className="p-2 text-gray-900">Mobile Money / Cash</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 font-bold bg-gray-50 text-gray-700">Payment Status</td>
                    <td className="p-2">
                      <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold text-[10px]">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold bg-gray-50 text-gray-700">Amount Paid</td>
                    <td className="p-2 font-black text-pink-600 text-sm">
                      ${invoice.totalAmount?.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-10 text-center text-xs">
              <div>
                <div className="border-t border-gray-400 w-32 mx-auto" />
                <p className="text-gray-500 font-semibold mt-1">Customer Signature</p>
              </div>
              <div>
                <div className="border-t border-gray-400 w-32 mx-auto" />
                <p className="text-gray-500 font-semibold mt-1">Authorized Signature</p>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] text-gray-400">
              Mahadsanid! Thank you for shopping with COLLECTION PRO.
            </p>
          </div>

          {/* ===== Badhamada (kaarka dibadiisa — lama daabaco, lagama saarto PDF) ===== */}
          <div className="mt-3 flex flex-wrap gap-2 no-print-area">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-pink-600 py-2.5 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer text-xs"
            >
              <Printer size={15} /> Print
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 font-bold text-white shadow-md hover:bg-green-700 cursor-pointer text-xs disabled:opacity-60 disabled:cursor-wait"
            >
              <Download size={15} /> {downloading ? "Waa la samaynayaa..." : "Download PDF"}
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
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

  const readStored = () => {
    try {
      return JSON.parse(localStorage.getItem("storeInvoices") || "[]");
    } catch {
      return [];
    }
  };

  const loadInvoices = () => {
    const formatted = readStored().map((inv, idx) => ({
      ...inv,
      originalIndex: idx,
      id: `INV-${String(idx + 1).padStart(3, "0")}`,
    }));
    setInvoices(formatted);
    return formatted;
  };

  // Lacag bixinta: status-ka "Paid" waa la kaydiyaa (invoice-ka lama tirtirayo)
  const confirmPayment = (invoiceToPay) => {
    const raw = readStored();
    const paidDate = new Date().toLocaleDateString();
    if (raw[invoiceToPay.originalIndex]) {
      raw[invoiceToPay.originalIndex] = {
        ...raw[invoiceToPay.originalIndex],
        status: "Paid",
        paidDate,
      };
      localStorage.setItem("storeInvoices", JSON.stringify(raw));
    }

    const updated = loadInvoices();
    const paidInvoice = updated.find((i) => i.originalIndex === invoiceToPay.originalIndex);

    setPaymentInvoice(null);
    setSelectedInvoice(null);
    setReceiptInvoice(paidInvoice || { ...invoiceToPay, status: "Paid", paidDate });
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase();
    return (
      invoice.id.toLowerCase().includes(query) ||
      String(invoice.orderId ?? "").toLowerCase().includes(query) ||
      String(invoice.customerName ?? "").toLowerCase().includes(query)
    );
  });

  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalUnpaid = invoices
    .filter((inv) => inv.status !== "Paid")
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px]">
        <Header setMobileOpen={setMobileOpen} search={search} setSearch={setSearch} />

        <main className="flex-1 overflow-y-auto p-4 md:p-5 custom-scrollbar">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
              <FileText size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Invoices Management</h1>
              <p className="text-xs text-gray-500">
                Manage orders, invoices, payments and receipts.
              </p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard title="Total Invoiced" amount={totalInvoiced} icon={<FileText size={20} />} />
            <SummaryCard title="Total Paid" amount={totalPaid} icon={<CheckCircle size={20} />} />
            <SummaryCard title="Outstanding" amount={totalUnpaid} icon={<Clock size={20} />} />
          </div>

          <section className="min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
            <div className="border-b border-gray-100 p-3">
              <div className="relative max-w-sm">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
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
                        <td className="px-4 py-2.5 font-semibold text-pink-600">
                          #{invoice.orderId}
                        </td>
                        <td className="px-4 py-2.5 font-bold text-pink-600">
                          ${invoice.totalAmount?.toFixed(2)}
                        </td>
                        <td className="px-4 py-2.5">
                          <Badge type={getStatusType(invoice.status)}>{invoice.status}</Badge>
                        </td>
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
                        <p className="text-xs text-gray-400 mt-0.5">
                          Orders made in Orders page will show up here instantly.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="py-4 text-center text-xs text-gray-400 mt-auto">
            © 2026 COLLECTION PRO · Style · Elegance · You
          </footer>
        </main>
      </div>

      <InvoiceDetails
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onMakePayment={(invoice) => setPaymentInvoice(invoice)}
        onReceipt={(invoice) => setReceiptInvoice(invoice)}
      />

      <PaymentModal
        invoice={paymentInvoice}
        onClose={() => setPaymentInvoice(null)}
        onConfirm={confirmPayment}
      />
      <ReceiptModal invoice={receiptInvoice} onClose={() => setReceiptInvoice(null)} />
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