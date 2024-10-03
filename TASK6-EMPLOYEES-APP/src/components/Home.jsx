import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/myBG.jpg'; // Adjust the path accordingly

const Home = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
    >
      <div className="bg-white bg-opacity-70 p-10 rounded-lg shadow-lg text-center mb-8">
        <h1 className="text-6xl font-bold mb-4 text-navy-800 drop-shadow-lg">
          Welcome to the Employee Management System
        </h1>
        <p className="text-2xl mb-8 text-navy-600 font-semibold">
          Efficiently manage employee information and stay organized.
        </p>
      </div>
      <Link to="/register">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </Link>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2024 Employee Management System</p>
      </footer>
    </div>
  );
};

export default Home;
