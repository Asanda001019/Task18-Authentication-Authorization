// src/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <p className="mt-2">Follow us on social media: 
          <a href="#" className="text-blue-400 hover:underline mx-1">Facebook</a> |
          <a href="#" className="text-blue-400 hover:underline mx-1">Twitter</a> |
          <a href="#" className="text-blue-400 hover:underline mx-1">LinkedIn</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
