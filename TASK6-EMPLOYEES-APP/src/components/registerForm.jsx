import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios to handle API requests

const RegisterEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    picture: null, // Store picture as a file
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setEmployee({ ...employee, picture: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('picture', employee.picture);
    formData.append('employee', JSON.stringify({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
    }));

    try {
      await axios.post('http://localhost:3001/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Employee Registered!');
      navigate('/employees');
    } catch (error) {
      console.error("Error registering employee:", error);
      alert("Error registering employee.");
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
            required
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
