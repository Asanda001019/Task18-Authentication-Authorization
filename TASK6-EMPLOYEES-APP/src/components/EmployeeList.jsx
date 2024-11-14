import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedEmployee(employees[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('employee', JSON.stringify(editedEmployee));
      if (editedEmployee.picture) {
        formData.append('picture', editedEmployee.picture);
      }

      await axios.put(`http://localhost:3001/employees/${editedEmployee.id}`, formData);
      setEditingIndex(null);
      const response = await axios.get('http://localhost:3001/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.includes(searchQuery) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Employees List</h2>

      <input
        type="text"
        placeholder="Search employees..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 mb-6 border rounded-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <div key={employee.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
            {editingIndex === index ? (
              <div>
                {/* Edit Form */}
              </div>
            ) : (
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
                    onClick={() => handleDelete(employee.id)}
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
