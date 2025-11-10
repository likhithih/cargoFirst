import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaEdit, FaTrash, FaTimes, FaUser, FaClock } from 'react-icons/fa';

const JobList = () => {
  const { token, user } = useAuth();
  const { theme } = useTheme();
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
      setJobs(jobs.filter(job => job._id !== id));
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
      setJobs(jobs.map(job => job._id === id ? res.data : job));
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

  const myJobs = jobs.filter(job => user && job.postedBy && job.postedBy._id?.toString() === user.id);
  const otherJobs = jobs.filter(job => !user || !job.postedBy || job.postedBy._id?.toString() !== user.id);

  return (
    <div className={`p-4 min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>All Jobs</h2>

      {myJobs.length > 0 && (
        <div className="mb-8">
          <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>My Job Posts</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map(job => (
              <div
                key={job._id}
                className={`p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600' : 'bg-white hover:bg-blue-50'}`}
                onClick={() => handleJobClick(job)}
              >
                <h3 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{job.title}</h3>
                <p className={`truncate mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{job.description}</p>
                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Company: {job.company}</p>
                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
                <div className={`flex items-center text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaUser className="mr-1" /> <span>Posted by: {job.postedBy?.username || 'Unknown'}</span>
                </div>
                <div className={`flex items-center text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaClock className="mr-1" /> <span>Posted on: {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(job); }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 flex items-center text-sm transition-colors duration-300"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(job._id); }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center text-sm transition-colors duration-300"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherJobs.length > 0 && (
        <div>
          <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>All Other Job Posts</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherJobs.map(job => (
              <div
                key={job._id}
                className={`p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border border-gray-600' : 'bg-white hover:bg-blue-50'}`}
                onClick={() => handleJobClick(job)}
              >
                <h3 className={`text-xl font-semibold mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{job.title}</h3>
                <p className={`truncate mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{job.description}</p>
                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Company: {job.company}</p>
                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
                <div className={`flex items-center text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaUser className="mr-1" /> <span>Posted by: {job.postedBy?.username || 'Unknown'}</span>
                </div>
                <div className={`flex items-center text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaClock className="mr-1" /> <span>Posted on: {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedJob && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 px-4 ${theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-black bg-opacity-50'}`}>
          <div className={`p-6 rounded-3xl shadow-2xl max-w-md w-full relative transition-all duration-500 ${theme === 'dark' ? 'bg-gray-800 border border-gray-600' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{selectedJob.title}</h3>
              <button onClick={closeModal} className={`hover:text-gray-700 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500'}`}>
                <FaTimes size={20} />
              </button>
            </div>

            {editingJob === selectedJob._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300'}`}
                  placeholder="Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300'}`}
                  placeholder="Description"
                />
                <input
                  type="date"
                  value={editForm.lastDate}
                  onChange={(e) => setEditForm({ ...editForm, lastDate: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300'}`}
                />
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300'}`}
                  placeholder="Company"
                />
                <input
                  type="number"
                  value={editForm.vacancies}
                  onChange={(e) => setEditForm({ ...editForm, vacancies: e.target.value })}
                  className={`w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition duration-300 ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300'}`}
                  placeholder="Vacancies"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdate(selectedJob._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className={`text-gray-600 ${theme === 'dark' ? 'text-gray-300' : ''}`}>{selectedJob.description}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Company: {selectedJob.company}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Last Date: {new Date(selectedJob.lastDate).toLocaleDateString()}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Vacancies: {selectedJob.vacancies}</p>
                <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaUser className="mr-1" /> Posted by: {selectedJob.postedBy?.username || 'Unknown'}
                </div>
                <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaClock className="mr-1" /> Posted on: {new Date(selectedJob.createdAt).toLocaleDateString()}
                </div>
                {user && selectedJob.postedBy?._id?.toString() === user.id && (
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleEdit(selectedJob)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center transition-colors duration-300"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(selectedJob._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center transition-colors duration-300"
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
