import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const JobList = () => {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    lastDate: '',
    company: '',
  });

  // Use environment variable for backend URL
  const API_BASE = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      alert('Error deleting job');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job._id);
    setEditForm({
      title: job.title,
      description: job.description,
      lastDate: job.lastDate.split('T')[0], // Format for date input
      company: job.company,
    });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`${API_BASE}/api/jobs/${id}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.map(job => job._id === id ? res.data : job));
      setEditingJob(null);
      setEditForm({
        title: '',
        description: '',
        lastDate: '',
        company: '',
      });
    } catch (error) {
      alert('Error updating job');
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setEditForm({
      title: '',
      description: '',
      lastDate: '',
      company: '',
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Jobs</h2>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job._id} className="bg-white p-4 rounded shadow-md">
            {editingJob === job._id ? (
              <div>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Description"
                />
                <input
                  type="date"
                  value={editForm.lastDate}
                  onChange={(e) => setEditForm({ ...editForm, lastDate: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Company"
                />
                <button
                  onClick={() => handleUpdate(job._id)}
                  className="mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-sm text-gray-500">Company: {job.company}</p>
                <p className="text-sm text-gray-500">
                  Last Date: {new Date(job.lastDate).toLocaleDateString()}
                </p>
                {user && job.postedBy === user.id && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
