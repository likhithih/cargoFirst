import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const JobList = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs`, {
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
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      alert('Error deleting job');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-sm text-gray-500">Company: {job.company}</p>
            <p className="text-sm text-gray-500">Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
            <button
              onClick={() => handleDelete(job._id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
