import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const loginImages = ["/login.jpg", "/form.jpg"];
const registerImages = ["/signup.jpg", "/log.jpg"];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { login, register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const currentImages = isRegister ? registerImages : loginImages;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, email, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center overflow-hidden px-4 transition-all duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-linear-to-br from-blue-50 via-white to-blue-100'}`}>
      <div className="py-10 px-4 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 items-center gap-8 transition-all duration-700 ease-in-out">
          {/* === Image Section === */}
          <div
            className={`relative transition-transform duration-700 ease-in-out transform ${
              isRegister
                ? "lg:order-first lg:-translate-x-2.5"
                : "lg:order-last lg:translate-x-2.5"
            }`}
          >
            <img
              src={(isRegister ? registerImages : loginImages)[currentImageIndex]}
              alt={isRegister ? "register visual" : "login visual"}
              className="w-full max-lg:w-4/5 mx-auto block rounded-xl shadow-lg object-cover transition-all duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* === Form Card === */}
          <div className={`rounded-2xl p-8 max-w-md w-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] mx-auto transform transition-all duration-500 hover:shadow-blue-200 hover:scale-[1.02] ${theme === 'dark' ? 'border border-gray-600 bg-gray-800/90 backdrop-blur-md' : 'border border-slate-200 bg-white/90 backdrop-blur-md'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-10">
                <h1 className={`text-3xl font-semibold transition-all duration-500 ${theme === 'dark' ? 'text-gray-100' : 'text-slate-900'}`}>
                  {isRegister ? "Create Account" : "Sign in"}
                </h1>
                <p className={`text-[15px] mt-3 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                  {isRegister
                    ? "Join us today and start your journey with us. It only takes a minute!"
                    : "Sign in to your account and explore a world of possibilities."}
                </p>
              </div>

              {/* Username Field */}
              {isRegister && (
                <div className="relative">
                  <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-200' : 'text-slate-900'}`}>
                    Username
                  </label>
                  <FaUser className={`absolute left-3 top-[38px] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter username"
                    className={`w-full text-sm border pl-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ${theme === 'dark' ? 'text-gray-100 border-gray-600 bg-gray-700 placeholder-gray-400' : 'text-slate-900 border-slate-300'}`}
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-200' : 'text-slate-900'}`}>
                  Email
                </label>
                <FaEnvelope className={`absolute left-3 top-[38px] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter email"
                  className={`w-full text-sm border pl-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ${theme === 'dark' ? 'text-gray-100 border-gray-600 bg-gray-700 placeholder-gray-400' : 'text-slate-900 border-slate-300'}`}
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-gray-200' : 'text-slate-900'}`}>
                  Password
                </label>
                <FaLock className={`absolute left-3 top-[38px] ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className={`w-full text-sm border pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ${theme === 'dark' ? 'text-gray-100 border-gray-600 bg-gray-700 placeholder-gray-400' : 'text-slate-900 border-slate-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-[38px] ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {isRegister ? "Register" : "Sign In"}
                </button>
              </div>

              <p className={`text-sm text-center mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                {isRegister ? (
                  <>
                    Already have an account?
                    <span
                      onClick={() => setIsRegister(false)}
                      className={`font-medium hover:underline cursor-pointer ml-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600'}`}
                    >
                      Login here
                    </span>
                  </>
                ) : (
                  <>
                    Don’t have an account?
                    <span
                      onClick={() => setIsRegister(true)}
                      className={`font-medium hover:underline cursor-pointer ml-1 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600'}`}
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
