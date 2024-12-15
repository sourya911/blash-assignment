import React from 'react';
import { FaMusic, FaPlayCircle, FaCalendarAlt, FaUsers } from 'react-icons/fa'; 

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-900 text-white">
    <div className="p-4 text-2xl font-bold">Blaash</div>
    <nav>
      <ul>
        <li className="p-4 hover:bg-gray-800 flex items-center">
          <FaMusic className="mr-2" /> Playlist Manager
        </li>
        <li className="p-4 hover:bg-gray-800 flex items-center">
          <FaPlayCircle className="mr-2" /> One Click Post
        </li>
        <li className="p-4 hover:bg-gray-800 flex items-center">
          <FaCalendarAlt className="mr-2" /> Calendar
        </li>
        <li className="p-4 hover:bg-gray-800 flex items-center">
          <FaUsers className="mr-2" /> Hire Influencer
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
