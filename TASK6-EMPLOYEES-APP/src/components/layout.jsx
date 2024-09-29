// src/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Employee Management System</h1>
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
          <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
