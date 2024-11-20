import React from "react";

const Dashboard = ({ user }) => {
  if (!user) {
    return <h2>Please log in to access the dashboard.</h2>;
  }

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      {user.role === "super-admin" && (
        <>
          <h3>Super Admin Features</h3>
          <ul>
            <li>Add General Admin</li>
            <li>Remove Admin Rights</li>
          </ul>
        </>
      )}
      {user.role === "general-admin" && (
        <>
          <h3>General Admin Features</h3>
          <ul>
            <li>Manage Employees</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
