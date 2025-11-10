import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaTasks,
  FaUser,
  FaChartPie,
  FaSignOutAlt,
  FaBars,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import JobForm from "./JobForm";
import JobList from "./JobList";
import Profile from "./Profile";
import CustomerAnalysis from "./CustomerAnalysis";

const Dashboard = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("jobForm");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const activeSectionData = sections.find((sec) => sec.key === activeSection);

  return (
    <div className={`flex min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-blue-100'} backdrop-blur-lg shadow-xl sticky top-0 h-screen flex flex-col rounded-r-2xl transition-all duration-300 border-r`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
          <h2
            className={`text-2xl font-extrabold transition-all duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 hidden"
            } ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
          >
            Dashboard
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`transition-colors p-2 rounded-lg ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'}`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 space-y-2 px-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`group relative flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300
                ${
                  activeSection === section.key
                    ? theme === 'dark'
                      ? "bg-gradient-to-r from-gray-700 to-gray-600 text-blue-300 shadow-md"
                      : "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 shadow-md"
                    : theme === 'dark'
                      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-300"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span
                className={`whitespace-nowrap transition-opacity duration-300 ${
                  sidebarOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {section.label}
              </span>
              {activeSection === section.key && (
                <span className={`absolute right-0 w-1 h-6 rounded-l-md ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></span>
              )}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full mt-8 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              theme === 'dark'
                ? 'text-red-400 hover:bg-red-900 hover:text-red-300'
                : 'text-red-500 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <FaSignOutAlt className="text-lg" />
            <span
              className={`transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              Logout
            </span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className={`flex items-center gap-3 mb-6 p-4 rounded-2xl shadow-md border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-blue-100'}`}>
          <div className={`text-2xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{activeSectionData?.icon}</div>
          <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            {activeSectionData?.label}
          </h1>
        </div>

        {/* Section Content */}
        <div className={`transition-all duration-500 ease-in-out p-6 rounded-2xl shadow-lg min-h-[75vh] border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-100'}`}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
