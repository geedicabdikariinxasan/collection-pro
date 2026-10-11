import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import Products from "./Pages/Products";
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders"; 
import Invoice from "./Pages/Invoice";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
       <Route path="/products" element={<Products />} />
       <Route path="/customers" element={<Customers />} />
       <Route path="/customers" element={<Customers />} />
       <Route path="/orders" element={<Orders />} />
       <Route path="/invoices" element={<Invoice />} />
    </Routes>
  );
}