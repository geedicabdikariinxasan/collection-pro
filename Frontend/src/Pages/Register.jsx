import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // U dir xogta Backend-ka
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        email,
        password,
        role,
      });

      setIsError(false);
      setMessage(response.data.message + " 🎉 Waa laguu celinayaa Login...");

      setTimeout(() => {
        navigate("/"); // Dib ugu laabo Login page-ka
      }, 2000);

    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Waa dhacay qalad, fadlan soo celi!");
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center p-3 overflow-hidden relative"
      style={{
        backgroundImage: "url('/store-bg.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      {/* Message Alert */}
      {message && (
        <div className={`absolute top-6 z-50 animate-bounce rounded-xl px-5 py-2.5 text-white shadow-xl text-center font-bold text-sm ${isError ? 'bg-red-600' : 'bg-pink-600'}`}>
          {message}
        </div>
      )}

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

        {/* Title */}
        <div className="mb-3 text-center">
          <h2 className="text-base font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-[10px] text-gray-500">
            Sign up to start shopping
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          
          {/* Full Name */}
          <div className="mb-2">
            <label className="mb-0.5 block text-[10px] font-bold text-gray-700">
              Full Name
            </label>
            <div className="flex items-center rounded-lg border border-pink-200 bg-white px-2.5 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100">
              <User size={15} className="text-pink-500 mr-2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-transparent py-1.5 text-xs font-bold text-gray-700 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-2">
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
          <div className="mb-2">
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
                placeholder="Create a password"
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
          <div className="mb-3">
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
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="CASHIER">CASHIER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-pink-600 py-2 text-xs font-semibold text-white shadow-md shadow-pink-200 transition hover:bg-pink-700"
          >
            Create Account
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-3 text-center text-[10px] text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-bold text-pink-600 hover:underline cursor-pointer"
          >
            Sign In
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