import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaBuilding, FaPenFancy, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const JobForm = () => {
  const { token } = useAuth();
  const { theme } = useTheme();
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    company: "",
    vacancies: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "vacancies" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/jobs`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ show: true, message: "Job posted successfully!", type: "success" });
      setFormData({ title: "", description: "", lastDate: "", company: "", vacancies: "" });
    } catch (error) {
      setToast({
        show: true,
        message: error?.response?.data?.message || "Error posting job",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    }
  };

  return (
    <section
      className={`min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center justify-center transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-tr from-blue-50 to-blue-100"
      }`}
    >
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 p-4 rounded-lg shadow-lg text-white transform transition-transform duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <p
        className="text-center font-medium text-black px-10 py-2 rounded-full bg-pink-200 border border-pink-800 w-max mx-auto"
      >
        Job Form
      </p>
      <h3
        className={`text-3xl font-semibold text-center mx-auto mt-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Post a Job Opportunity
      </h3>
      <p
        className={`text-center mt-2 max-w-md mx-auto ${
          theme === "dark" ? "text-slate-300" : "text-black"
        }`}
      >
        Share your job opening and reach the right talent quickly.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto mt-16 w-full"
      >
        {/* Job Title */}
        <div>
          <p className={`mb-2 font-medium ${theme === "dark" ? "text-gray-200" : "text-black"}`}>Job Title</p>
          <div
            className={`flex items-center pl-3 rounded-lg overflow-hidden border ${
              theme === "dark" ? "border-gray-600 focus-within:border-pink-500" : "border-gray-400 focus-within:border-pink-500"
            }`}
          >
            <FaPenFancy
              className={`w-5 h-5 mr-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className={`w-full p-3 bg-transparent outline-none ${
                theme === "dark" ? "text-gray-100 placeholder-gray-400" : "text-black placeholder-gray-500"
              }`}
              required
            />
          </div>
        </div>

        {/* Company Name */}
        <div>
          <p className={`mb-2 font-medium ${theme === "dark" ? "text-gray-200" : "text-black"}`}>Company Name</p>
          <div
            className={`flex items-center pl-3 rounded-lg overflow-hidden border ${
              theme === "dark" ? "border-gray-600 focus-within:border-pink-500" : "border-gray-400 focus-within:border-pink-500"
            }`}
          >
            <FaBuilding
              className={`w-5 h-5 mr-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company hiring"
              className={`w-full p-3 bg-transparent outline-none ${
                theme === "dark" ? "text-gray-100 placeholder-gray-400" : "text-black placeholder-gray-500"
              }`}
              required
            />
          </div>
        </div>

        {/* Last Date */}
        <div>
          <p className={`mb-2 font-medium ${theme === "dark" ? "text-gray-200" : "text-black"}`}>Last Date</p>
          <div
            className={`flex items-center pl-3 rounded-lg overflow-hidden border ${
              theme === "dark" ? "border-gray-600 focus-within:border-pink-500" : "border-gray-400 focus-within:border-pink-500"
            }`}
          >
            <FaCalendarAlt
              className={`w-5 h-5 mr-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}
            />
            <input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              className={`w-full p-3 bg-transparent outline-none ${
                theme === "dark" ? "text-gray-100" : "text-black"
              }`}
              required
            />
          </div>
        </div>

        {/* Vacancies */}
        <div>
          <p className={`mb-2 font-medium ${theme === "dark" ? "text-gray-200" : "text-black"}`}>Number of Vacancies</p>
          <div
            className={`flex items-center pl-3 rounded-lg overflow-hidden border ${
              theme === "dark" ? "border-gray-600 focus-within:border-pink-500" : "border-gray-400 focus-within:border-pink-500"
            }`}
          >
            <FaClipboardList
              className={`w-5 h-5 mr-2 ${theme === "dark" ? "text-gray-300" : "text-black"}`}
            />
            <input
              type="number"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              placeholder="How many positions?"
              className={`w-full p-3 bg-transparent outline-none ${
                theme === "dark" ? "text-gray-100 placeholder-gray-400" : "text-black placeholder-gray-500"
              }`}
              required
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="sm:col-span-2">
          <p className={`mb-2 font-medium ${theme === "dark" ? "text-gray-200" : "text-black"}`}>Job Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            placeholder="Write a detailed job description..."
            className={`w-full p-3 bg-transparent outline-none rounded-lg overflow-hidden border focus:border-pink-500 resize-none ${
              theme === "dark" ? "border-gray-600 text-gray-100 placeholder-gray-400" : "border-gray-400 text-black placeholder-gray-500"
            }`}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 w-max flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-10 py-3 rounded-full mx-auto"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </section>
  );
};

export default JobForm;
