import React from 'react';

const Header = () => (
  <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-lg font-semibold">Design Studio</h1>
    <div className="flex items-center space-x-4">
      <button className="bg-blue-500 px-4 py-2 rounded">Generate Code</button>
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="rounded-full"
      />
    </div>
  </div>
);
export default Header;
