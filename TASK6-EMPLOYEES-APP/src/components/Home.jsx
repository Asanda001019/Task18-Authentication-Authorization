// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-6xl font-bold mb-4">Welcome to the Employee Management System</h1>
      <p className="text-xl mb-8">Efficiently manage employee information and stay organized.</p>
      <Link to="/register">
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-gray-200 transition duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
