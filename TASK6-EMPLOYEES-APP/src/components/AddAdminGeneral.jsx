import React, { useState } from "react";

const AddGeneralAdmin = () => {
  const [email, setEmail] = useState("");

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/add-general-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("General Admin added successfully!");
      } else {
        alert("Failed to add General Admin.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleAddAdmin}>
      <h2>Add General Admin</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="General Admin Email"
        required
      />
      <button type="submit">Add Admin</button>
    </form>
  );
};

export default AddGeneralAdmin;
