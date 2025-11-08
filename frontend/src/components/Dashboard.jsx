import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaTasks, FaUser, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import JobForm from "./JobForm";
import JobList from "./JobList";
import Profile from "./Profile";
import CustomerAnalysis from "./CustomerAnalysis";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("jobForm");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "jobForm":
        return <JobForm />;
      case "jobPosted":
        return <JobList />;
      case "profile":
        return <Profile />;
      case "customerAnalysis":
        return <CustomerAnalysis />;
      default:
        return <JobForm />;
    }
  };

  const sections = [
    { key: "jobForm", label: "Job Posting", icon: <FaClipboardList /> },
    { key: "jobPosted", label: "Job Posted", icon: <FaTasks /> },
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "customerAnalysis", label: "Customer Analysis", icon: <FaChartPie /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-r-xl sticky top-0 h-screen flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
        </div>
        <nav className="flex-1 mt-4 space-y-2 px-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 ${
                activeSection === section.key ? "bg-blue-100 text-blue-600 shadow-md" : ""
              }`}
            >
              {section.icon} {section.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full mt-6 px-4 py-3 rounded-lg text-red-500 font-medium hover:bg-red-100 hover:text-red-600 transition-all duration-300"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="transition-all duration-500 ease-in-out bg-white p-6 rounded-2xl shadow-md min-h-[80vh]">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
