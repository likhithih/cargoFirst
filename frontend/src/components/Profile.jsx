import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Profile</h2>
      {user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <FaUser className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium text-gray-800">{user.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <FaEnvelope className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
