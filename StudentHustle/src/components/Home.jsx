import { NavLink } from "react-router-dom";
import "../mainbody.css";

function Home() {
  return (
    <div className="home">
      <h1
        style={{
          fontSize: "3rem",
          color: "rgb(81, 255, 0)",
          fontWeight: "bold",
        }}
      >
        Welcome to StudentHustle!
      </h1>
      <p
        style={{
          fontSize: "2rem",
          color: "rgb(174, 255, 82)",
          fontWeight: "bold",
        }}
      >
        Deeper your knowladge and support your students by buying courses!
      </p>
      <div class="posts-list">
        <div class="posts-grid">
          <div class="post-card">
            <h3>
              <a href="/posts/1" data-discover="true">
                Connecting students for smarter hustles.
              </a>
            </h3>
            <p class="post-preview">
              StudentHustle is a dynamic platform designed to empower students
              by helping them connect, collaborate, and grow together.
            </p>
          </div>
          <div class="post-card">
            <h3>
              <a href="/posts/2" data-discover="true">
                Student marketplace for everything you need.
              </a>
            </h3>
            <p class="post-preview">
              StudentHustle creates a marketplace built by students, for
              students. It offers a wide range of resources and abilites
            </p>
          </div>
          <div class="post-card">
            <h3>
              <a href="/posts/3" data-discover="true">
                More just a platform, it's a movement.
              </a>
            </h3>
            <p class="post-preview">
              At its core, StudentHustle is more than just a platform — it's a
              movement. A movement toward student-led entrepreneurship,
              skill-sharing, and resourcefulness.
            </p>
          </div>
        </div>
      </div>
      <NavLink to="/courses" style={{ textDecoration: "none", color: "white" }}>
        <button className="home-button">Explore Courses</button>
      </NavLink>
    </div>
  );
}
export default Home;
<div class="posts-list">
  <div class="posts-grid">
    <div class="post-card">
      <h3>
        <a href="/posts/1" data-discover="true">
          Getting Started with React
        </a>
      </h3>
      <p class="post-preview">
        React is a powerful JavaScript library for building user interfaces. It
        allows you to create reusabl...
      </p>
      <div class="post-actions">
        <button class="read-more-btn">Read More</button>
      </div>
    </div>
    <div class="post-card">
      <h3>
        <a href="/posts/2" data-discover="true">
          Understanding React Router
        </a>
      </h3>
      <p class="post-preview">
        React Router is the standard routing library for React applications. It
        enables you to create single...
      </p>
      <div class="post-actions">
        <button class="read-more-btn">Read More</button>
      </div>
    </div>
    <div class="post-card">
      <h3>
        <a href="/posts/3" data-discover="true">
          State Management in React
        </a>
      </h3>
      <p class="post-preview">
        State management is crucial in React applications. You can use useState
        for local state and context ...
      </p>
      <div class="post-actions">
        <button class="read-more-btn">Read More</button>
      </div>
    </div>
  </div>
</div>;
