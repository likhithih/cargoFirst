import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaBuilding, FaPenFancy, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const JobForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    company: "",
  });

  const API_BASE = import.meta.env.VITE_BACKEND_URL; // <- dynamic backend URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/jobs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job posted successfully!");
      setFormData({ title: "", description: "", lastDate: "", company: "" });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div className="relative">
          <FaClipboardList className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            required
          />
        </div>

        {/* Description */}
        <div className="relative">
          <FaPenFancy className="absolute top-3 left-3 text-gray-400" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 resize-none"
            rows={4}
            required
          />
        </div>

        {/* Last Date */}
        <div className="relative">
          <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            name="lastDate"
            value={formData.lastDate}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            required
          />
        </div>

        {/* Company */}
        <div className="relative">
          <FaBuilding className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-xl hover:bg-blue-600 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default JobForm;
