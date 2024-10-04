import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/staff.png'; // Adjust the path based on your folder structure

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Heading - Moved towards the corner */}
          <div className="flex items-center ml-30"> {/* Added margin-left to move it towards the corner */}
            <img src={logo} alt="Logo" className="w-12 h-8 mr-4" /> 

            <h1 className="text-3xl font-bold">EmployeeHub</h1>
          </div>

          {/* Navigation Links */}
          <div>
            <Link to="/" className="mr-4 hover:underline">Home</Link>
            <Link to="/register" className="mr-4 hover:underline">Register</Link>
            <Link to="/employees" className="hover:underline">Employee List</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Employee Management System. Asanda Madondo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
