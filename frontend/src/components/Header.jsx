import React from 'react';
import { FaComments, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex justify-between items-center" style={{ height: '64px' }}>
      {/* Logo Section */}
      <Link to="/">
      <div className="flex gap-3 items-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-xl">
           Chatster
        </h1>
        <div className="mt-2 flex items-center justify-center">
          <svg
            className="h-16 w-16 p-2 rounded-full bg-white border-4 border-blue-600 shadow-lg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H6l-4 4v-4H2a2 2 0 01-2-2V6a2 2 0 012-2z"
              fill="#4A90E2"
            />
            <path
              d="M6 10h12M6 14h8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      </Link>

      {/* Right Section with Icons */}
      <div className="flex gap-4">
      <Link to="/chat" className="text-white text-2xl">
        <button className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition duration-200">
          <FaComments className="text-white text-2xl" />
          
        </button>
        </Link>
        <Link to={"/account"} className="text-white text-2xl">
        <button className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition duration-200">
          <FaUserCircle className="text-white text-2xl" />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
