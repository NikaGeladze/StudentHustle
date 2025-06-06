import { NavLink, useNavigate } from "react-router-dom";
import "../header.css";

const navLinkStyles = ({ isActive }) => {
  return {
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    color: isActive ? "blue" : "black",
  };
};

function Header({ user }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="header">
      <div className="hdleft">
        <NavLink
          to="/"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "blue",
          }}
        >
          StudentHustle
        </NavLink>
      </div>
      <div className="hdright">
        <div className="header-courses">
          <NavLink to="/courses" style={navLinkStyles}>
            Courses
          </NavLink>
        </div>
        <div className="header-home">
          <NavLink to="/" style={navLinkStyles}>
            Home
          </NavLink>
        </div>
        {user ? (
          <div className="header-profile" onClick={handleProfileClick}>
            <img
              src="./images/profile.jpg" // Path to the profile photo
              alt="Profile"
              className="profile-photo"
            />
          </div>
        ) : (
          <div>
            <NavLink to="/signup" style={navLinkStyles}>
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
