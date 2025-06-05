import "../style.css";
function Header() {
  return (
    <div className="header">
      <div className="hdleft">StudentHustle</div>
      <div className="hdright">
        <div
          className="header-courses"
          onClick={() => {
            console.log("Courses Clicked");
          }}
        >
          Courses
        </div>
        <div
          className="header-home"
          onClick={() => {
            console.log("Home Clicked");
          }}
        >
          Home
        </div>
      </div>
    </div>
  );
}
export default Header;
