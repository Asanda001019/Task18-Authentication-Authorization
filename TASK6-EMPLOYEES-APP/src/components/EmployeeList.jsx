import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from './firebaseConfig'; // Ensure firebaseConfig is properly imported

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');  // State to store the search query
  const [filteredEmployees, setFilteredEmployees] = useState([]);  // State for filtered employees
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
      setFilteredEmployees(employees);  // If searchId is empty, show all employees
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
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
              onClick={() => handleDelete(employee.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
