import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-green-50 to-teal-100'}`}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={`relative w-96 h-auto rounded-2xl p-0.5 backdrop-blur-lg overflow-hidden shadow-xl cursor-pointer transition-transform hover:-translate-y-1 ${theme === 'dark' ? 'bg-gray-800/70 text-gray-100' : 'bg-white/70 text-gray-800'}`}
      >
        {/* Dynamic glow effect */}
        {visible && (
          <div
            className={`pointer-events-none blur-2xl w-64 h-64 absolute z-0 transition-opacity duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500' : 'bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500'}`}
            style={{ top: position.y - 128, left: position.x - 128 }}
          />
        )}

        <div className={`relative z-10 rounded-2xl p-8 flex flex-col items-center justify-center text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Avatar */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User Avatar"
            className={`w-24 h-24 rounded-full shadow-md my-4 border-4 ${theme === 'dark' ? 'border-gray-600' : 'border-teal-200'}`}
          />

          <h2 className={`text-3xl font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
            {user?.username || "Loading..."}
          </h2>
          <p className={`text-sm font-medium mb-6 flex items-center justify-center gap-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-teal-500'}`}>
            <FaEnvelope className={theme === 'dark' ? 'text-indigo-300' : 'text-teal-400'} />
            {user?.email || "Fetching email..."}
          </p>

          {/* Profile Details */}
          {user ? (
            <div className="space-y-4 w-full">
              <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-green-50 to-green-100'}`}>
                <FaUser className={`text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-green-500'}`} />
                <div className="text-left">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Username</p>
                  <p className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    {user.username}
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-green-50 to-green-100'}`}>
                <FaEnvelope className={`text-xl ${theme === 'dark' ? 'text-blue-400' : 'text-green-500'}`} />
                <div className="text-left">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                  <p className={`text-base font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className={`mt-6 animate-pulse ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
