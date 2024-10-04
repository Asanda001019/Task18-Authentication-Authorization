import React, { useEffect, useState } from 'react';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    picture: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedEmployee(employees[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedEmployee({ ...editedEmployee, picture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = () => {
    const updatedEmployees = [...employees];
    updatedEmployees[editingIndex] = editedEmployee;
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEditingIndex(null);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.includes(searchQuery) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (employees.length === 0) {
    return <p>No employees found.</p>;
    
    
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Employees List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 mb-6 border rounded-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-100">
            {editingIndex === index ? (
              // Edit mode
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedEmployee.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-2 border rounded-md"
                />

                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editedEmployee.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-2 border rounded-md"
                />

                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedEmployee.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-2 border rounded-md"
                />

                <label className="block mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={editedEmployee.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-2 border rounded-md"
                />

                <label className="block mb-2">Upload Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 mb-4 border rounded-md"
                />

                <div className="flex justify-between">
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    onClick={() => setEditingIndex(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display mode
              <div>
                <img
                  src={employee.picture}
                  alt={`${employee.name}'s profile`}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-center">{employee.name}</h3>
                <p>Email: {employee.email}</p>
                <p>Phone: {employee.phone}</p>
                <p>Position: {employee.position}</p>

                <div className="flex justify-between mt-4">
                  <button
                    className="bg-yellow-500 text-white px-9 py-2 rounded-md hover:bg-yellow-600"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-9 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
