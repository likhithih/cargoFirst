import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaBuilding, FaPenFancy, FaCalendarAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const JobForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    company: "",
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/jobs`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Show success toast
      setToast({ show: true, message: "Job posted successfully!", type: "success" });
      setFormData({ title: "", description: "", lastDate: "", company: "" });

      // Hide toast after 3 seconds
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      // Show error toast
      setToast({ show: true, message: error.response?.data?.message || "Error posting job", type: "error" });
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
  };

  const FloatingInput = ({ label, name, type = "text", icon: Icon, rows }) => (
    <div className="relative w-full">
      {Icon && <Icon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />}
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={rows || 4}
          className="peer w-full pl-12 pr-3 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 resize-none"
          placeholder=" "
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="peer w-full pl-12 pr-3 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300"
          placeholder=" "
          required
        />
      )}
      <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm pointer-events-none">
        {label}
      </label>
    </div>
  );

  return (
    <div className="relative max-w-lg mx-auto">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 flex items-center space-x-2 p-4 rounded-lg shadow-lg text-white transition-all duration-500
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} animate-slide-in`}
        >
          <FaCheckCircle className="w-5 h-5" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="bg-gradient-to-r from-white via-blue-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-8 text-center drop-shadow-md">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput label="Job Title" name="title" icon={FaClipboardList} />
          <FloatingInput label="Job Description" name="description" type="textarea" icon={FaPenFancy} rows={5} />
          <FloatingInput  name="lastDate" type="date" icon={FaCalendarAlt} />
          <FloatingInput label="Company Name" name="company" icon={FaBuilding} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            Post Job
          </button>
        </form>
      </div>

      {/* Toast animation keyframes */}
      <style>
        {`
          @keyframes slideIn {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default JobForm;
