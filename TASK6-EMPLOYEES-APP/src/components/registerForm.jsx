// src/RegisterForm.js

import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    image: null,
    position: '',
    idNumber: '',
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear existing employees from local storage
    localStorage.removeItem('employees');
    
    const newData = {
      ...formData,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
    };

    // Store the new employee data
    localStorage.setItem('employees', JSON.stringify([newData]));

    // Update the state to show the new employee
    setSubmittedData([newData]);

    // Reset the form
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      image: null,
      position: '',
      idNumber: '',
    });
  };

  return (
    <div className="flex space-x-8 max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4">Register Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'surname', 'email', 'phone', 'position', 'idNumber'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h3 className="mt-8 text-lg font-semibold">Submitted Employees:</h3>
        <div className="space-y-4">
          {submittedData.map((data, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md">
              <p><strong>Name:</strong> {data.name} {data.surname}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Phone:</strong> {data.phone}</p>
              <p><strong>Position:</strong> {data.position}</p>
              <p><strong>ID Number:</strong> {data.idNumber}</p>
              {data.image && <img src={data.image} alt="Uploaded" className="w-32 h-32 object-cover mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
