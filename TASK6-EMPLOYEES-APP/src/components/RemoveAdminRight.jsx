import React, { useState } from "react";

const RemoveAdminRights = () => {
  const [email, setEmail] = useState("");

  const handleRemoveAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/remove-admin-rights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Admin rights removed successfully!");
      } else {
        alert("Failed to remove admin rights.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRemoveAdmin}>
      <h2>Remove Admin Rights</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin Email"
        required
      />
      <button type="submit">Remove Admin</button>
    </form>
  );
};

export default RemoveAdminRights;
