import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import db from firebaseConfig.js

const RegisterEmployee = () => {
  const [employee, setEmployee] = useState({
    idNumber: '',  // Added field for ID number
    name: '',
    email: '',
    phone: '',
    position: '',
    picture: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Limit image size to 1MB
      const MAX_SIZE = 1048487; // 1MB in bytes
      if (file.size > MAX_SIZE) {
        alert('Image size is too large. Please upload an image smaller than 1MB.');
        return;
      }

      // Create an image element to resize it
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // Create a canvas element to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set new dimensions for the image
          const maxWidth = 500; // You can adjust this as needed
          const scaleFactor = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleFactor;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Get the resized image as a Base64 string
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8); // Set quality to 80% to further reduce size

          setEmployee({ ...employee, picture: resizedBase64 }); // Save the resized Base64 string
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = {
        idNumber: employee.idNumber, // Add ID number to employee data
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        picture: employee.picture, // Save Base64 string in Firestore
      };

      await addDoc(collection(db, 'employees'), employeeData);

      alert('Employee Registered!');
      navigate('/employees');
    } catch (error) {
      console.error('Error registering employee:', error);
      alert('Error registering employee.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register Employee</h2>
      <form onSubmit={handleSubmit}>
     
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />

        </div>
        <div className="mb-4">
          <label className="block mb-2">ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={employee.idNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
