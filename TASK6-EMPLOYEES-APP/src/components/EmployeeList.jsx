import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from './firebaseConfig'; // Ensure firebaseConfig is properly imported

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState(''); // State to store the search query
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State for filtered employees
  const [editEmployee, setEditEmployee] = useState(null); // State to store the employee being edited
  const db = getFirestore(app);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        const employeeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeList);
        setFilteredEmployees(employeeList); // Initially, show all employees
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [db]);

  useEffect(() => {
    // Filter employees based on searchId
    if (searchId) {
      setFilteredEmployees(
        employees.filter((employee) => employee.idNumber === searchId)
      );
    } else {
      setFilteredEmployees(employees); // If searchId is empty, show all employees
    }
  }, [searchId, employees]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'employees', id));
      setEmployees(employees.filter((employee) => employee.id !== id));
      setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value); // Update searchId state with input value
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee); // Set the employee data to edit
  };

  const handleEditChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value }); // Update the edit form state
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editEmployee) return;

    try {
      const employeeRef = doc(db, 'employees', editEmployee.id);
      await updateDoc(employeeRef, {
        name: editEmployee.name,
        email: editEmployee.email,
        phone: editEmployee.phone,
        position: editEmployee.position,
      });

      // Update the employees and filteredEmployees state with the new data
      setEmployees(
        employees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
      );
      setFilteredEmployees(
        filteredEmployees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
      );
      setEditEmployee(null); // Close the edit form
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Employees List</h2>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID number"
          value={searchId}
          onChange={handleSearchChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Edit Form Modal */}
      {editEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Employee</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editEmployee.name}
                  onChange={handleEditChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editEmployee.email}
                  onChange={handleEditChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editEmployee.phone}
                  onChange={handleEditChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Position</label>
                <input
                  type="text"
                  name="position"
                  value={editEmployee.position}
                  onChange={handleEditChange}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditEmployee(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredEmployees.map((employee) => (
    <div key={employee.id} className="border p-4 rounded-md shadow-sm bg-gray-100">
      {employee.picture ? (
        <img
          src={employee.picture} // Display Base64 string as image
          alt={`${employee.name}'s profile`}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-center">{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>ID Number: {employee.idNumber}</p>
      <p>Phone: {employee.phone}</p>
      <p>Position: {employee.position}</p>
      <div className="mt-4 flex space-x-2"> {/* Add flex and space-x-2 to create space between buttons */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => handleEditClick(employee)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={() => handleDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default EmployeesList;
