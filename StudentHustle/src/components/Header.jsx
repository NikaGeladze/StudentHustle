import { NavLink } from "react-router-dom";
import "../header.css";

const navLinkStyles = ({ isActive }) => {
  return {
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    color: isActive ? "blue" : "black",
  };
};

function Header() {
  return (
    <div className="header">
      <div className="hdleft">
        <NavLink
          to="/"
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "blue", // Always black, never blue
          }}
        >
          StudentHustle
        </NavLink>
      </div>
      <div className="hdright">
        <div
          className="header-courses"
          onClick={() => {
            console.log("Courses Clicked");
          }}
        >
          <NavLink to="/courses" style={navLinkStyles}>
            Courses
          </NavLink>
        </div>
        <div
          className="header-home"
          onClick={() => {
            console.log("Home Clicked");
          }}
        >
          <NavLink to="/" style={navLinkStyles}>
            Home
          </NavLink>
        </div>
        <div
          className="header-signin"
          onClick={() => {
            console.log("Home Clicked");
          }}
        >
          Sign in
        </div>
      </div>
    </div>
  );
}
export default Header;
