import { NavLink } from "react-router-dom";

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
                Getting Started with React
              </a>
            </h3>
            <p class="post-preview">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              aliquam amet corrupti cum provident alias?
            </p>
          </div>
          <div class="post-card">
            <h3>
              <a href="/posts/2" data-discover="true">
                Understanding React Router
              </a>
            </h3>
            <p class="post-preview">
              React Router is the standard routing library for React
              applications. It enables you to create single...
            </p>
          </div>
          <div class="post-card">
            <h3>
              <a href="/posts/3" data-discover="true">
                State Management in React
              </a>
            </h3>
            <p class="post-preview">
              State management is crucial in React applications. You can use
              useState for local state and context ...
            </p>
          </div>
        </div>
      </div>
      <button className="home-button">
        <NavLink to="/courses" style={{ textDecoration: 'none', color: 'white' }}>
        Explore Courses
        </NavLink>
        </button>
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
