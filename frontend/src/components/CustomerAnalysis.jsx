import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', applications: 400 },
  { name: 'Feb', applications: 300 },
  { name: 'Mar', applications: 200 },
  { name: 'Apr', applications: 278 },
  { name: 'May', applications: 189 },
  { name: 'Jun', applications: 239 },
];

const CustomerAnalysis = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applications" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerAnalysis;
