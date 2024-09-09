import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReels, BsCameraReelsFill } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAccountCircleLine, RiAccountCircleFill } from "react-icons/ri";

const NavigationBar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className='fixed bottom-0 w-full bg-white py-3 shadow-md'>
      <div className="flex justify-around items-center">

        {/* Home Tab */}
        <Link 
          to="/" 
          className={`flex flex-col items-center text-2xl transition-transform duration-200 ${
            location.pathname === "/" ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <span>{location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
          <span className="text-sm mt-1">Home</span>
        </Link>

        {/* Reels Tab */}
        <Link 
          to="/reels" 
          className={`flex flex-col items-center text-2xl transition-transform duration-200 ${
            location.pathname === "/reels" ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <span>{location.pathname === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}</span>
          <span className="text-sm mt-1">Reels</span>
        </Link>

        {/* Search Tab */}
        <Link 
          to="/search" 
          className={`flex flex-col items-center text-2xl transition-transform duration-200 ${
            location.pathname === "/search" ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <span>{location.pathname === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}</span>
          <span className="text-sm mt-1">Search</span>
        </Link>

        {/* Chat Tab */}
        <Link 
          to="/chat" 
          className={`flex flex-col items-center text-2xl transition-transform duration-200 ${
            location.pathname === "/chat" ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <span>{location.pathname === "/chat" ? <IoChatbubbleEllipses /> : <IoChatbubbleEllipsesOutline />}</span>
          <span className="text-sm mt-1">Chat</span>
        </Link>

        {/* Account Tab */}
        <Link 
          to="/account" 
          className={`flex flex-col items-center text-2xl transition-transform duration-200 ${
            location.pathname === "/account" ? "text-blue-600 scale-110" : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <span>{location.pathname === "/account" ? <RiAccountCircleFill /> : <RiAccountCircleLine />}</span>
          <span className="text-sm mt-1">Account</span>
        </Link>

      </div>
    </div>
  );
}

export default NavigationBar;
