import { NavLink, useNavigate } from "react-router-dom";
import "../header.css";

const navLinkStyles = ({ isActive }) => {
  return {
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    color: isActive ? "cyan" : "white",
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
            color: "white",
          }}
        >
          Student<span style={{ color: "rgb(81, 255, 0)" }}>Hustle</span>
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
              src="/Images/profile.png" // Path to the profile photo
              alt="Profile"
              className="profile-photo"
              width={30}
              style={{ cursor: "pointer", marginTop: "7px" }}
            />
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/signin" style={navLinkStyles}>
              Sign In
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
