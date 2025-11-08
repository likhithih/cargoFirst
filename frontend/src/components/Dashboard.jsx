import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import JobForm from './JobForm';
import JobList from './JobList';
import Profile from './Profile';
import CustomerAnalysis from './CustomerAnalysis';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('jobForm');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'jobForm':
        return <JobForm />;
      case 'jobPosted':
        return <JobList />;
      case 'profile':
        return <Profile />;
      case 'customerAnalysis':
        return <CustomerAnalysis />;
      default:
        return <JobForm />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveSection('jobForm')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${activeSection === 'jobForm' ? 'bg-gray-200' : ''}`}
          >
            Job Posting
          </button>
          <button
            onClick={() => setActiveSection('jobPosted')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${activeSection === 'jobPosted' ? 'bg-gray-200' : ''}`}
          >
            Job Posted
          </button>
          <button
            onClick={() => setActiveSection('profile')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${activeSection === 'profile' ? 'bg-gray-200' : ''}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection('customerAnalysis')}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${activeSection === 'customerAnalysis' ? 'bg-gray-200' : ''}`}
          >
            Customer Analysis
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-500"
          >
            Logout
          </button>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;
