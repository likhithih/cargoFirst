import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaEdit, FaTrash, FaTimes, FaUser, FaClock, FaSun, FaMoon } from 'react-icons/fa';

const JobList = () => {
  const { token, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    lastDate: '',
    company: '',
    vacancies: '',
  });
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      alert('Error deleting job');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setSelectedJob(job);
    setEditForm({
      title: job.title,
      description: job.description,
      lastDate: job.lastDate.split('T')[0],
      company: job.company,
      vacancies: job.vacancies,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${API_BASE}/api/jobs/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
      setEditingJob(null);
      setSelectedJob(null);
      setEditForm({ title: '', description: '', lastDate: '', company: '', vacancies: '' });
    } catch (error) {
      alert('Error updating job');
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setEditForm({ title: '', description: '', lastDate: '', company: '', vacancies: '' });
  };

  const handleJobClick = (job) => setSelectedJob(job);
  const closeModal = () => setSelectedJob(null);

  const myJobs = jobs.filter((job) => user && job.postedBy && job.postedBy._id?.toString() === user.id);
  const otherJobs = jobs.filter((job) => !user || !job.postedBy || job.postedBy._id?.toString() !== user.id);

  // 🟣 Reusable glowing job card component
  const GlowingCard = ({ job, onClick, onEdit, onDelete }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
      const bounds = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={onClick}
        className={`relative w-full h-80 rounded-xl p-px backdrop-blur-md overflow-hidden shadow-lg cursor-pointer ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}
      >
        <div
          className={`pointer-events-none blur-3xl rounded-full size-60 absolute z-0 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${theme === 'dark' ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500' : 'bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500'}`}
          style={{ top: position.y - 120, left: position.x - 120 }}
        />
        <div className={`relative z-10 p-6 h-full w-full rounded-[11px] flex flex-col justify-between text-center ${theme === 'dark' ? 'bg-gray-900/75' : 'bg-white/75'}`}>
          <div>
            <h3 className={`text-2xl font-bold mb-2 truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{job.title}</h3>
            <p className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>Company: {job.company}</p>
            <p className={`text-sm mb-3 line-clamp-3 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>{job.description}</p>
            <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
            <div className={`flex items-center justify-center text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              <FaUser className="mr-1" /> {job.postedBy?.username || 'Unknown'}
            </div>
            <div className={`flex items-center justify-center text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              <FaClock className="mr-1" /> {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>
          {user && job.postedBy?._id?.toString() === user.id && (
            <div className="flex justify-center space-x-3 mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center text-sm transition"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(job._id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center text-sm transition"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`p-6 min-h-screen transition-all duration-500 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h2
          className={`text-3xl font-bold text-center ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}
        >
          All Jobs
        </h2>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
          }`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {myJobs.length > 0 && (
        <div className="mb-12">
          <h3
            className={`text-2xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`}
          >
            My Job Posts
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((job) => (
              <GlowingCard
                key={job._id}
                job={job}
                onClick={() => handleJobClick(job)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {otherJobs.length > 0 && (
        <div>
          <h3
            className={`text-2xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            All Other Job Posts
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherJobs.map((job) => (
              <GlowingCard
                key={job._id}
                job={job}
                onClick={() => handleJobClick(job)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedJob && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 px-4 ${
            theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'
          }`}
        >
          <div
            className={`p-6 rounded-3xl shadow-2xl max-w-md w-full relative transition-all duration-500 ${
              theme === 'dark' ? 'bg-gray-800 border border-gray-600' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-2xl font-semibold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                {selectedJob.title}
              </h3>
              <button
                onClick={closeModal}
                className={`hover:text-gray-700 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500'
                }`}
              >
                <FaTimes size={20} />
              </button>
            </div>

            {editingJob === selectedJob._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Description"
                />
                <input
                  type="date"
                  value={editForm.lastDate}
                  onChange={(e) => setEditForm({ ...editForm, lastDate: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-gray-100'
                      : 'border-gray-300'
                  }`}
                />
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Company"
                />
                <input
                  type="number"
                  value={editForm.vacancies}
                  onChange={(e) => setEditForm({ ...editForm, vacancies: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400'
                      : 'border-gray-300'
                  }`}
                  placeholder="Vacancies"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdate(selectedJob._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Description: {selectedJob.description}
                </p>
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Company: {selectedJob.company}
                </p>
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Job Title: {selectedJob.title}
                </p>
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Last Date: {new Date(selectedJob.lastDate).toLocaleDateString()}
                </p>
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Vacancies: {selectedJob.vacancies}
                </p>
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Posted by: {selectedJob.postedBy?.username || 'Unknown'}
                </p>
                <p className={`text-base font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Posted on: {new Date(selectedJob.createdAt).toLocaleDateString()}
                </p>
                {user && selectedJob.postedBy?._id?.toString() === user.id && (
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleEdit(selectedJob)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center transition"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(selectedJob._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center transition"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
