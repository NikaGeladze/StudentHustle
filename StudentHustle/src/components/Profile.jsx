import React from "react";
import { useNavigate } from "react-router-dom";
import "../profile.css";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user data from state
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="profile-container">
      <h1>Profile Information</h1>
      <div className="profile-card">
        <p>
          <strong>Name:</strong> {user?.name || "N/A"}
        </p>
        <p>
          <strong>Surname:</strong> {user?.surname || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p>
          <strong>Username:</strong> {user?.username || "N/A"}
        </p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;