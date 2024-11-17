import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from './firebaseConfig'; // Ensure firebaseConfig is properly imported

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
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
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [db]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'employees', id));
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Employees List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
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
