import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative w-96 h-auto rounded-2xl p-0.5 bg-white/70 backdrop-blur-lg text-gray-800 overflow-hidden shadow-xl cursor-pointer transition-transform hover:-translate-y-1"
      >
        {/* Dynamic glow effect */}
        {visible && (
          <div
            className="pointer-events-none blur-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 w-64 h-64 absolute z-0 transition-opacity duration-300"
            style={{ top: position.y - 128, left: position.x - 128 }}
          />
        )}

        <div className="relative z-10 bg-white rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          {/* Avatar */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-md my-4 border-4 border-indigo-200"
          />

          <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
            {user?.username || "Loading..."}
          </h2>
          <p className="text-sm text-indigo-500 font-medium mb-6 flex items-center justify-center gap-2">
            <FaEnvelope className="text-indigo-400" />
            {user?.email || "Fetching email..."}
          </p>

          {/* Profile Details */}
          {user ? (
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <FaUser className="text-blue-500 text-xl" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-base font-semibold text-gray-800">
                    {user.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <FaEnvelope className="text-blue-500 text-xl" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mt-6 animate-pulse">Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
