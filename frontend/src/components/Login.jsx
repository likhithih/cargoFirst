import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden px-4">
      <div className="py-10 px-4 w-full max-w-6xl">
        <div
          className={`grid lg:grid-cols-2 items-center gap-8 transition-all duration-700 ease-in-out`}
        >
          {/* === Image Section === */}
          <div
            className={`relative transition-transform duration-700 ease-in-out transform ${
              isRegister
                ? "lg:order-first lg:translate-x-[-10px]"
                : "lg:order-last lg:translate-x-[10px]"
            }`}
          >
            <img
              src="https://readymadeui.com/login-image.webp"
              alt="login visual"
              className="w-full max-lg:w-4/5 mx-auto block rounded-xl shadow-lg object-cover transition-all duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* === Form Card === */}
          <div className="border border-slate-200 bg-white/90 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] mx-auto transform transition-all duration-500 hover:shadow-blue-200 hover:scale-[1.02]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-10">
                <h1 className="text-slate-900 text-3xl font-semibold transition-all duration-500">
                  {isRegister ? "Create Account" : "Sign in"}
                </h1>
                <p className="text-slate-600 text-[15px] mt-3 leading-relaxed">
                  {isRegister
                    ? "Join us today and start your journey with us. It only takes a minute!"
                    : "Sign in to your account and explore a world of possibilities."}
                </p>
              </div>

              {isRegister && (
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                    placeholder="Enter username"
                  />
                </div>
              )}

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm text-slate-900 border border-slate-300 pl-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-sm text-slate-900 border border-slate-300 pl-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                  placeholder="Enter password"
                />
              </div>

              {!isRegister && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {isRegister ? "Register" : "Sign In"}
                </button>
              </div>

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
