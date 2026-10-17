import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import Products from "./Pages/Products";
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import Invoice from "./Pages/Invoice";
import Inventory from "./Pages/Inventory";
import Sales from "./Pages/Sales"; // <-- Kudar kan

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/invoices" element={<Invoice />} />
      
      {/* Route-ka Inventory-ga */}
      <Route path="/inventory" element={<Inventory />} />
      {/* Halkan waxaan ku darnay link-ga khaldamay si uu isna toos ugu furo Inventory-ga */}
      <Route path="/Admin-Dashboard/inventory" element={<Inventory />} />
      <Route path="/sales" element={<Sales />} /> {/* <-- Iyo kudar kan */}
    </Routes>
  );
}