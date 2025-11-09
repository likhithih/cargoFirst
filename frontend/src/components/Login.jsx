import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupImage from "../assets/signup.jpg";
import loginImage from "../assets/login.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, email, password);
        toast.success("Registered successfully!");
      } else {
        await login(email, password);
        toast.success("Logged in successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="py-10 px-4 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 items-center gap-8">

          {/* === Image Section === */}
          <div
            className={`relative w-full max-lg:w-4/5 mx-auto transition-transform duration-700 ease-in-out transform
              ${isRegister ? "lg:order-first lg:-translate-x-2" : "lg:order-last lg:translate-x-2"}
            `}
          >
            <img
              src={isRegister ? signupImage : loginImage}
              alt={isRegister ? "signup visual" : "login visual"}
              className="w-full rounded-2xl shadow-lg object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* === Form Card === */}
          <div
            className={`border border-slate-200 bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-lg mx-auto transform transition-all duration-700 hover:shadow-2xl hover:scale-[1.02]
              ${isRegister ? "lg:order-last lg:translate-x-2" : "lg:order-first lg:-translate-x-2"}
            `}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-8">
                <h1 className="text-slate-900 text-3xl font-semibold transition-all duration-500">
                  {isRegister ? "Create Account" : "Sign in"}
                </h1>
                <p className="text-slate-600 text-[15px] mt-3 leading-relaxed">
                  {isRegister
                    ? "Join us today and start your journey with us. It only takes a minute!"
                    : "Sign in to your account and explore a world of possibilities."}
                </p>
              </div>

              {/* Username Field */}
              {isRegister && (
                <div className="relative">
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Username
                  </label>
                  <FaUser className="absolute left-3 top-1/2 translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter username"
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email
                </label>
                  <FaEnvelope className="absolute left-3 top-1/2 translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email"
                  className="w-full text-sm text-slate-900 border border-slate-300 pl-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <FaLock className="absolute left-3 top-1/2 translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full text-sm text-slate-900 border border-slate-300 pl-10 pr-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  {isRegister ? "Register" : "Sign In"}
                </button>
              </div>

              {/* Switch form link */}
              <p className="text-sm text-center text-slate-600 mt-4">
                {isRegister ? (
                  <>
                    Already have an account?
                    <span
                      onClick={() => setIsRegister(false)}
                      className="text-blue-600 font-medium hover:underline cursor-pointer ml-1"
                    >
                      Login here
                    </span>
                  </>
                ) : (
                  <>
                    Don’t have an account?
                    <span
                      onClick={() => setIsRegister(true)}
                      className="text-blue-600 font-medium hover:underline cursor-pointer ml-1"
                    >
                      Register here
                    </span>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
