import React, { useState, useEffect, useMemo } from "react";
import {
  Search, Bell, ChevronDown, ChevronLeft, ChevronRight, FileText,
  LayoutDashboard, Package, Users, ShoppingCart, BarChart3, Boxes,
  Settings, User, Eye, X, Printer, Download, LogOut, Menu, Filter,
  TrendingUp, CreditCard, DollarSign, Calendar, FileSpreadsheet
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* =========================
   SIDEBAR & HEADER
========================= */

function Sidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const links = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { label: "Products", icon: Package, path: "/products" },
    { label: "Customers", icon: Users, path: "/customers" },
    { label: "Orders", icon: ShoppingCart, path: "/orders" },
    { label: "Sales", icon: BarChart3, path: "/sales", active: true },
    { label: "Invoices", icon: FileText, path: "/invoices" },
    { label: "Inventory", icon: Boxes, path: "/inventory" },
    { label: "Users", icon: User, path: "#" },
    { label: "Settings", icon: Settings, path: "#" },
  ];

  return (
    <>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden print:hidden" />}
      <aside className={`fixed left-0 top-0 h-screen w-[250px] overflow-hidden bg-gradient-to-b from-[#b00057] to-[#780039] text-white z-50 flex flex-col justify-between shadow-xl transition-transform duration-300 lg:translate-x-0 print:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="border-b border-white/10 px-5 py-4 text-center flex flex-col items-center justify-center">
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
          <div className="px-4 py-2.5 text-center border-t border-white/10 bg-black/10 flex flex-col gap-1.5">
            <button onClick={() => navigate("/")} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition cursor-pointer">
              <LogOut size={15} /><span>Logout</span>
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
        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer"><Menu size={22} /></button>
        <div className="relative w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Search sales..." className="w-full rounded-xl bg-gray-50 py-2 pl-10 pr-3 text-xs outline-none focus:ring-2 focus:ring-pink-200" />
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
        </div>
      </div>
    </header>
  );
}

/* =========================
   MAIN SALES PAGE
========================= */

export default function Sales() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);
  
  // Filters
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [methodFilter, setMethodFilter] = useState("All Payment Methods");
  
  const [page, setPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const fetchSales = () => {
      try {
        const rawInvoices = JSON.parse(localStorage.getItem("storeInvoices") || "[]");
        const paidInvoices = rawInvoices.filter(inv => inv.status === "Paid");
        
        const formattedSales = paidInvoices.map(inv => ({
          id: inv.orderId || `ORD-UNKNOWN`,
          invoiceId: inv.id || `INV-UNKNOWN`,
          date: inv.date || new Date().toISOString().split('T')[0],
          customer: inv.customerName || "Unknown Customer",
          productsCount: inv.items ? inv.items.reduce((sum, item) => sum + (item.qty || 0), 0) : 0,
          items: inv.items || [],
          amount: inv.totalAmount || 0,
          method: inv.paymentMethod || "Cash",
          status: "Paid"
        }));
        
        setSalesData(formattedSales);
      } catch (error) {
        console.error("Error loading sales data:", error);
        setSalesData([]);
      }
    };
    fetchSales();
  }, []);

  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      const safeId = sale.id || "";
      const safeCustomer = sale.customer || "";
      const safeMethod = sale.method || "";
      const safeDate = sale.date || "";

      const matchesSearch = safeId.toLowerCase().includes(search.toLowerCase()) || 
                            safeCustomer.toLowerCase().includes(search.toLowerCase());
                            
      const matchesMethod = methodFilter === "All Payment Methods" || safeMethod === methodFilter;
      const matchesStartDate = startDate && safeDate ? new Date(safeDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate && safeDate ? new Date(safeDate) <= new Date(endDate) : true;

      return matchesSearch && matchesMethod && matchesStartDate && matchesEndDate;
    });
  }, [salesData, search, methodFilter, startDate, endDate]);

  const totalSalesAmount = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalOrdersCount = filteredSales.length;
  const uniqueCustomersCount = new Set(filteredSales.map((sale) => sale.customer)).size;
  const avgOrderValue = totalOrdersCount > 0 ? totalSalesAmount / totalOrdersCount : 0;

  const paymentTotals = [
    { name: "Cash", color: "#db2777" },
    { name: "Mobile Money", color: "#fbcfe8" },
    { name: "Credit Card", color: "#f472b6" },
  ].map((methodObj) => {
    const keyword = methodObj.name.split(" ")[0]; 
    const total = filteredSales.filter(s => (s.method || "").includes(keyword)).reduce((sum, s) => sum + (s.amount || 0), 0);
    return { ...methodObj, total };
  });

  const paymentSum = paymentTotals.reduce((sum, item) => sum + item.total, 0);
  let currentAngle = 0;
  const donutGradient = paymentSum === 0 ? "#fdf2f8" : `conic-gradient(${paymentTotals.map((item) => {
    const percentage = (item.total / paymentSum) * 100;
    const start = currentAngle;
    currentAngle += percentage;
    return `${item.color} ${start}% ${currentAngle}%`;
  }).join(", ")})`;

  const salesByDate = {};
  filteredSales.forEach(sale => {
    const safeDate = sale.date || "Unknown";
    salesByDate[safeDate] = (salesByDate[safeDate] || 0) + sale.amount;
  });
  
  const sortedDates = Object.keys(salesByDate).sort();
  const chartData = sortedDates.slice(-5).map(date => ({
    label: date,
    amount: salesByDate[date]
  }));
  
  while (chartData.length > 0 && chartData.length < 5) {
    chartData.unshift({ label: "--", amount: 0 });
  }

  const maxSale = chartData.length > 0 ? Math.max(...chartData.map(item => item.amount), 1) : 1;

  const rowsPerPage = 7;
  const totalPages = Math.max(1, Math.ceil(filteredSales.length / rowsPerPage));
  const visibleSales = filteredSales.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // QODOBKA 1: Export CSV (Excel format)
  const handleExportCSV = () => {
    const headers = ["Date", "Order ID", "Customer", "Items", "Total Amount", "Payment Method"];
    const rows = filteredSales.map(sale => [
      sale.date,
      sale.id,
      `"${sale.customer}"`,
      sale.productsCount,
      sale.amount.toFixed(2),
      sale.method
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Sales-Report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // QODOBKA 2: Clean PDF Report (Table Excel oo kale ah)
  const handleExportPDF = () => {
    const element = document.getElementById("clean-printable-report");
    const options = {
      margin: 10,
      filename: `Sales-Report-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    if (window.html2pdf) {
      window.html2pdf().from(element).set(options).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffafd] flex">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* QODOBKA 2: CSS si warqad nadiif ah (Table ah) loo daabaco marka la Print-garaynayo */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #clean-printable-report, #clean-printable-report * { visibility: visible !important; }
          #clean-printable-report {
            position: absolute !important;
            left: 0 !important; top: 0 !important;
            width: 100% !important; margin: 0 !important; padding: 20px !important;
            background: white !important; display: block !important;
          }
          .print-hidden { display: none !important; }
        }
      `}</style>

      {/* WARQADDA EXCEL EE QARSOON EE LOOGU TALAGALAY PRINT / PDF KELIYA */}
      <div id="clean-printable-report" className="hidden print:block absolute top-0 left-0 w-full bg-white z-[999] text-gray-900 font-sans">
        <div className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black tracking-widest uppercase">COLLECTION PRO</h1>
            <p className="text-sm font-semibold text-gray-500">SALES REPORT (EXCEL FORMAT)</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Total Revenue:</strong> ${totalSalesAmount.toFixed(2)}</p>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-400 p-2 text-left">Date</th>
              <th className="border border-gray-400 p-2 text-left">Order ID</th>
              <th className="border border-gray-400 p-2 text-left">Customer Name</th>
              <th className="border border-gray-400 p-2 text-center">Items</th>
              <th className="border border-gray-400 p-2 text-left">Payment Method</th>
              <th className="border border-gray-400 p-2 text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(sale => (
              <tr key={sale.id}>
                <td className="border border-gray-400 p-2">{sale.date}</td>
                <td className="border border-gray-400 p-2 font-bold">{sale.id}</td>
                <td className="border border-gray-400 p-2">{sale.customer}</td>
                <td className="border border-gray-400 p-2 text-center">{sale.productsCount}</td>
                <td className="border border-gray-400 p-2">{sale.method}</td>
                <td className="border border-gray-400 p-2 text-right font-bold">${sale.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan="5" className="border border-gray-400 p-2 text-right font-black uppercase">Grand Total:</td>
              <td className="border border-gray-400 p-2 text-right font-black text-lg">${totalSalesAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* DASHBOARD-KA CAADIGA AH */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-[250px] print:hidden">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600 text-white shadow-md">
                <BarChart3 size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sales Report</h1>
                <p className="text-xs text-gray-500">Track your sales performance and revenue.</p>
              </div>
            </div>
            <div className="flex gap-2">
              {/* Batoonka Excel (CSV) */}
              <button onClick={handleExportCSV} className="flex items-center gap-1.5 rounded-lg border border-pink-200 px-3 py-2 text-xs font-semibold text-pink-700 hover:bg-pink-50 transition cursor-pointer">
                <FileSpreadsheet size={14} /> Export CSV (Excel)
              </button>
              {/* Batoonka PDF / Print */}
              <button onClick={handleExportPDF} className="flex items-center gap-1.5 rounded-lg bg-pink-600 px-3 py-2 text-xs font-semibold text-white shadow-md hover:bg-pink-700 transition cursor-pointer">
                <Printer size={14} /> Print Report
              </button>
            </div>
          </div>

          <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Sales" value={`$${totalSalesAmount.toFixed(2)}`} icon={<DollarSign size={20}/>} color="bg-pink-100 text-pink-600" />
            <StatCard title="Total Orders" value={totalOrdersCount} icon={<ShoppingCart size={20}/>} color="bg-fuchsia-100 text-fuchsia-600" />
            <StatCard title="Avg. Order Value" value={`$${avgOrderValue.toFixed(2)}`} icon={<TrendingUp size={20}/>} color="bg-rose-100 text-rose-600" />
            <StatCard title="Total Customers" value={uniqueCustomersCount} icon={<Users size={20}/>} color="bg-purple-100 text-purple-600" />
          </section>

          <div className="mb-5 rounded-xl border border-gray-100 bg-white p-3 shadow-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sales by Order ID or Customer..." className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-pink-400" />
              </div>

              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-[10px] text-gray-500 font-bold">From:</span>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent outline-none text-xs text-gray-700 cursor-pointer" />
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-[10px] text-gray-500 font-bold">To:</span>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent outline-none text-xs text-gray-700 cursor-pointer" />
              </div>

              <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none cursor-pointer min-w-[150px]">
                <option>All Payment Methods</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Mobile Money">Mobile Money</option>
              </select>

              <button onClick={() => { setSearch(""); setStartDate(""); setEndDate(""); setMethodFilter("All Payment Methods"); }} className="rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 cursor-pointer">
                Clear Filters
              </button>
            </div>
          </div>

          <section className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xs">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-pink-600"/> Sales Overview (Last 5 Active Days)</h2>
              <div className="flex h-48 items-end gap-2 border-b border-l border-gray-200 pl-2 pb-1 relative">
                 <div className="absolute w-full h-full flex flex-col justify-between pointer-events-none opacity-20">
                   <div className="border-t border-gray-400 w-full"></div>
                   <div className="border-t border-gray-400 w-full"></div>
                   <div className="border-t border-gray-400 w-full"></div>
                   <div className="border-t border-gray-400 w-full"></div>
                 </div>

                 {chartData.length > 0 ? chartData.map((item, idx) => (
                    <div key={idx} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end group">
                      <span className="mb-1 text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition">${item.amount.toFixed(0)}</span>
                      <div
                        className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-pink-600 to-pink-300 transition hover:from-pink-700 hover:to-pink-400 shadow-sm"
                        style={{ height: `${(item.amount / maxSale) * 90}%`, minHeight: item.amount > 0 ? '5%' : '0' }}
                      />
                      <span className="mt-2 text-[9px] text-gray-500 font-semibold">{item.label}</span>
                    </div>
                  )) : (
                    <div className="w-full text-center text-gray-400 text-xs py-10">No sales data available for chart.</div>
                  )}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-xs">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><CreditCard size={16} className="text-pink-600"/> Payment Methods</h2>
              <div className="flex flex-col sm:flex-row xl:flex-col items-center justify-center gap-5">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full shadow-inner" style={{ background: donutGradient }}>
                  <div className="flex h-[80px] w-[80px] flex-col items-center justify-center rounded-full bg-white text-center shadow-sm">
                    <span className="text-sm font-bold text-gray-900">${totalSalesAmount >= 1000 ? (totalSalesAmount/1000).toFixed(1)+'k' : totalSalesAmount.toFixed(0)}</span>
                    <span className="text-[8px] text-gray-500 uppercase">Sales</span>
                  </div>
                </div>
                <div className="w-full space-y-2.5">
                  {paymentTotals.map((item) => {
                    const pct = paymentSum > 0 ? (item.total / paymentSum) * 100 : 0;
                    return (
                      <div key={item.name}>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-gray-600 mb-1">
                          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}/> {item.name}</span>
                          <span>{pct.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }}/></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs">
            <div className="border-b border-gray-100 p-3 bg-pink-50/50">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2"><FileText size={16} className="text-pink-600"/> Sales Details</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs">
                <thead className="bg-white text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3 text-center">Items</th>
                    <th className="px-4 py-3">Total Amount</th>
                    <th className="px-4 py-3">Payment Method</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visibleSales.length > 0 ? (
                    visibleSales.map((sale, index) => (
                      <tr key={sale.id} className="hover:bg-pink-50/30 transition">
                        <td className="px-4 py-2.5 text-gray-500">{(page - 1) * rowsPerPage + index + 1}</td>
                        <td className="px-4 py-2.5 font-medium">{sale.date}</td>
                        <td className="px-4 py-2.5 font-bold text-pink-600">#{sale.id}</td>
                        <td className="px-4 py-2.5 font-bold text-gray-800">{sale.customer}</td>
                        <td className="px-4 py-2.5 text-center font-medium bg-gray-50 rounded-lg">{sale.productsCount} items</td>
                        <td className="px-4 py-2.5 font-black text-gray-900">${sale.amount.toFixed(2)}</td>
                        <td className="px-4 py-2.5 text-gray-600">{sale.method}</td>
                        <td className="px-4 py-2.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> {sale.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <button onClick={() => setSelectedSale(sale)} className="inline-flex items-center gap-1 rounded-lg border border-pink-200 px-2.5 py-1 text-[10px] font-bold text-pink-600 hover:bg-pink-50 cursor-pointer">
                            <Eye size={12} /> View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="py-12 text-center text-gray-400">
                        <ShoppingCart size={34} className="mx-auto mb-2 text-gray-300" />
                        <p className="font-semibold text-sm">No sales found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredSales.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-gray-50">
                <p className="text-[11px] text-gray-500">
                  Showing {visibleSales.length} of {filteredSales.length} sales
                </p>
                <div className="flex gap-1.5">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-1.5 border border-gray-200 rounded-lg bg-white disabled:opacity-50 cursor-pointer hover:bg-gray-50"><ChevronLeft size={14}/></button>
                  <span className="px-3 py-1.5 bg-pink-600 text-white font-bold rounded-lg text-xs">{page}</span>
                  <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-1.5 border border-gray-200 rounded-lg bg-white disabled:opacity-50 cursor-pointer hover:bg-gray-50"><ChevronRight size={14}/></button>
                </div>
              </div>
            )}
          </section>

          <footer className="py-4 text-center text-[10px] text-gray-400 mt-2">
            © 2026 COLLECTION PRO • Sales Report Generation
          </footer>
        </main>
      </div>

      {/* Sale Details Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs print:hidden">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <p className="text-[9px] font-bold text-pink-600 uppercase tracking-wider">Collection Pro</p>
                <h2 className="text-lg font-bold text-gray-900">Sale Details</h2>
              </div>
              <button onClick={() => setSelectedSale(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 cursor-pointer"><X size={18} /></button>
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Order ID</span><span className="font-bold text-pink-600">#{selectedSale.id}</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Invoice Ref</span><span className="font-semibold text-gray-800">{selectedSale.invoiceId}</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Date</span><span className="font-semibold text-gray-800">{selectedSale.date}</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Customer</span><span className="font-bold text-gray-900">{selectedSale.customer}</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Items Count</span><span className="font-semibold text-gray-800">{selectedSale.productsCount} items</span></div>
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Payment Method</span><span className="font-semibold text-gray-800">{selectedSale.method}</span></div>
            </div>

            <div className="bg-pink-50 p-4 rounded-xl flex justify-between items-center mb-5">
              <span className="font-bold text-gray-800 text-sm">Total Amount</span>
              <span className="text-xl font-black text-pink-600">${selectedSale.amount.toFixed(2)}</span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setSelectedSale(null); navigate("/invoices"); }} className="flex-1 rounded-xl border border-gray-300 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer text-xs">Go to Invoice</button>
              <button onClick={() => setSelectedSale(null)} className="flex-1 rounded-xl bg-pink-600 py-2.5 font-bold text-white shadow-md hover:bg-pink-700 cursor-pointer text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs flex items-center gap-3">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-gray-500 font-medium">{title}</p>
        <h3 className="text-xl font-black text-gray-900 leading-tight">{value}</h3>
      </div>
    </div>
  );
}