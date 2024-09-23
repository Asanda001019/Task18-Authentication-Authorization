// src/Home.js
import React from 'react';


const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 rounded-md shadow-md">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Employee Management System</h1>
      <p className="text-lg mb-6">Here you can register, edit, and manage employee information.</p>
    
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Get Started
        </button>
      
    </div>
  );
};

export default Home;
