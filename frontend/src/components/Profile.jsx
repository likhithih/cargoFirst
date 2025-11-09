import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 transform hover:-translate-y-1">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-600 text-center tracking-tight">
          Profile
        </h2>
        {user ? (
          <div className="space-y-6">
            {/* Username */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <FaUser className="text-blue-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="text-lg font-semibold text-gray-800">{user.username}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
              <FaEnvelope className="text-blue-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
