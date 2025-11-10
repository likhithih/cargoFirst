import React from "react";
import { useTheme } from "../context/ThemeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", applications: 520, interviews: 340, hires: 120 },
  { name: "Feb", applications: 430, interviews: 310, hires: 100 },
  { name: "Mar", applications: 610, interviews: 450, hires: 150 },
  { name: "Apr", applications: 480, interviews: 320, hires: 130 },
  { name: "May", applications: 700, interviews: 480, hires: 190 },
  { name: "Jun", applications: 590, interviews: 410, hires: 160 },
  { name: "Jul", applications: 640, interviews: 470, hires: 200 },
  { name: "Aug", applications: 560, interviews: 390, hires: 170 },
  { name: "Sep", applications: 730, interviews: 510, hires: 220 },
  { name: "Oct", applications: 680, interviews: 460, hires: 210 },
  { name: "Nov", applications: 500, interviews: 370, hires: 140 },
  { name: "Dec", applications: 620, interviews: 430, hires: 180 },
];

const CustomerAnalysis = () => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-3xl shadow-2xl p-8 border transform transition-all duration-300 hover:shadow-3xl ${
      theme === 'dark'
        ? 'bg-gray-900 border-gray-700'
        : 'bg-white border-gray-100'
    }`}>
      <div className="mb-6 text-center">
        <h2 className={`text-3xl font-extrabold tracking-tight ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          Customer Analysis Overview
        </h2>
        <p className={`mt-2 text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Monthly insights on job applications, interviews, and successful hires.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barGap={6}
          barCategoryGap="15%"
        >
          <defs>
            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#374151" : "#e5e7eb"} />
          <XAxis dataKey="name" tick={{ fill: theme === 'dark' ? "#d1d5db" : "#6b7280" }} />
          <YAxis tick={{ fill: theme === 'dark' ? "#d1d5db" : "#6b7280" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? "#1f2937" : "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              color: theme === 'dark' ? "#f9fafb" : "#000",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar
            dataKey="applications"
            fill="url(#colorApps)"
            radius={[6, 6, 0, 0]}
            animationDuration={1000}
          />
          <Bar
            dataKey="interviews"
            fill="url(#colorInterviews)"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
          <Bar
            dataKey="hires"
            fill="url(#colorHires)"
            radius={[6, 6, 0, 0]}
            animationDuration={1400}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerAnalysis;
