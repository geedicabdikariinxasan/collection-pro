import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 1. Qeex API URL-ka (Vercel Environment Variable ama Render Live URL)
const API_URL = import.meta.env?.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://collection-pro-backend.onrender.com";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // 2. Halkan waxaa la isticmaalay API_URL oo loo beddelay Render Backend
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
        role,
      });

      setIsError(false);
      setMessage(response.data.message + " 🎉 Waa la soo galay!");

      // Keydi xogta user-ka localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/Admin-Dashboard");
        } else {
          alert(`Soo dhowow ${response.data.user.fullName}! Roolkaagu waa ${role}`);
        }
      }, 1500);

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Email-ka ama Password-ka waa qaldan yihiin!");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center p-3 overflow-hidden relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=90')"
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      {/* Message Alert */}
      {message && (
        <div className={`absolute top-6 z-50 animate-bounce rounded-xl px-5 py-2.5 text-white shadow-xl text-center font-bold text-sm ${isError ? 'bg-red-600' : 'bg-pink-600'}`}>
          {message}
        </div>
      )}

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[360px] rounded-2xl border border-white/80 bg-white/95 px-6 py-5 shadow-2xl">
        
        {/* Logo */}
        <div className="mb-3 text-center">
          <div className="flex flex-col items-center justify-center mb-0.5">
            <span className="text-pink-600 text-sm">👑</span>
            <div className="text-2xl text-pink-600 -mt-1">👗</div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-gray-900">COLLECTION</span>{" "}
            <span className="text-pink-600">PRO</span>
          </h1>

          <p className="text-[9px] tracking-widest text-gray-500 font-semibold">
            WOMEN'S FASHION & CLOTHING
          </p>

          <div className="text-pink-500 text-[9px]">♥</div>
        </div>

        {/* Welcome */}
        <div className="mb-3 text-center">
          <h2 className="text-base font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-[10px] text-gray-500">
            Sign in to continue to Collection PRO
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          
          {/* Email */}
          <div className="mb-2.5">
            <label className="mb-0.5 block text-[10px] font-bold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center rounded-lg border border-pink-200 bg-white px-2.5 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100">
              <Mail size={15} className="text-pink-500 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent py-1.5 text-xs font-bold text-gray-700 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2.5">
            <label className="mb-0.5 block text-[10px] font-bold text-gray-700">
              Password
            </label>
            <div className="flex items-center rounded-lg border border-pink-200 bg-white px-2.5 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100">
              <Lock size={15} className="text-pink-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent py-1.5 text-xs font-bold text-gray-700 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-pink-600 ml-2"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="mb-3.5">
            <label className="mb-0.5 block text-[10px] font-bold text-gray-700">
              Role
            </label>
            <div className="flex items-center rounded-lg border border-pink-200 bg-white px-2.5 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100">
              <User size={15} className="text-pink-500 mr-2" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-transparent py-1.5 text-xs font-bold text-gray-700 outline-none cursor-pointer"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="CASHIER">CASHIER</option>
                <option value="CUSTOMER">CUSTOMER</option>
              </select>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-pink-600 py-2 text-xs font-semibold text-white shadow-md shadow-pink-200 transition hover:bg-pink-700"
          >
            Login
          </button>
        </form>

        {/* Create Account Link */}
        <p className="mt-3 text-center text-[10px] text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-bold text-pink-600 hover:underline cursor-pointer"
          >
            Create Account
          </button>
        </p>

        {/* Footer */}
        <div className="mt-3 border-t border-pink-100 pt-2 text-center">
          <p className="text-[9px] tracking-widest text-gray-400 font-semibold">
            COLLECTION PRO
          </p>
          <p className="text-[9px] text-gray-400">
            Style • Elegance • You
          </p>
        </div>
      </div>
    </div>
  );
}