import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const JobForm = () => {
  const { token } = useAuth();
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
      console.error((error && error.response && error.response.data) || (error && error.message) || error);
      setToast({ show: true, message: (error && error.response && error.response.data && error.response.data.message) || "Error posting job", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 flex items-center justify-center p-4">
      {toast.show && (
        <div
          className={`fixed top-6 right-6 p-4 rounded-lg shadow-lg text-white transform transition-transform duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-8 text-center tracking-tight">
          Post a Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
              placeholder="Write a detailed job description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Date</label>
            <input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
              placeholder="Company hiring for this job"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Vacancies</label>
            <input
              type="number"
              name="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
              placeholder="How many positions available?"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg text-white transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed shadow-inner"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
