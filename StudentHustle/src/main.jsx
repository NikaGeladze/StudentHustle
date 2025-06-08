import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Initialize sample data for courses and users
const initializeSampleData = () => {
  const sampleCourses = [
    {
      id: "course_1",
      title: "Introduction to Programming",
      description: "Learn the basics of programming with Python.",
      price: "$50",
      category: "programming",
      difficulty: "beginner",
      duration: "4 weeks",
      author: "Alice Johnson",
      email: "alice@example.com",
      createdAt: new Date().toISOString(),
      introVideo: null,
    },
    {
      id: "course_2",
      title: "Graphic Design Essentials",
      description: "Master the fundamentals of graphic design.",
      price: "$75",
      category: "design",
      difficulty: "intermediate",
      duration: "6 weeks",
      author: "Bob Smith",
      email: "bob@example.com",
      createdAt: new Date().toISOString(),
      introVideo: null,
    },
    {
      id: "course_3",
      title: "Business Strategies for Success",
      description: "Learn effective business strategies to grow your career.",
      price: "$100",
      category: "business",
      difficulty: "advanced",
      duration: "8 weeks",
      author: "Charlie Brown",
      email: "charlie@example.com",
      createdAt: new Date().toISOString(),
      introVideo: null,
    },
    {
      id: "course_4",
      title: "Digital Marketing  101",
      description: "Understand the basics of digital marketing.",
      price: "$40",
      category: "marketing",
      difficulty: "beginner",
      duration: "3 weeks",
      author: "Diana Prince",
      email: "diana@example.com",
      createdAt: new Date().toISOString(),
      introVideo: null,
    },
    {
      id: "course_5",
      title: "Data Science Fundamentals",
      description: "Explore the world of data science and analytics.",
      price: "$120",
      category: "data-science",
      difficulty: "advanced",
      duration: "10 weeks",
      author: "Eve Adams",
      email: "eve@example.com",
      createdAt: new Date().toISOString(),
      introVideo: null,
    },
  ];

  const sampleUsers = [
    {
      name: "Alice",
      surname: "Johnson",
      email: "alice@example.com",
      password: "password123",
      username: "alicejohnson",
      joinDate: new Date().toISOString(),
    },
    {
      name: "Bob",
      surname: "Smith",
      email: "bob@example.com",
      password: "password123",
      username: "bobsmith",
      joinDate: new Date().toISOString(),
    },
    {
      name: "Charlie",
      surname: "Brown",
      email: "charlie@example.com",
      password: "password123",
      username: "charliebrown",
      joinDate: new Date().toISOString(),
    },
    {
      name: "Diana",
      surname: "Prince",
      email: "diana@example.com",
      password: "password123",
      username: "dianaprince",
      joinDate: new Date().toISOString(),
    },
    {
      name: "Eve",
      surname: "Adams",
      email: "eve@example.com",
      password: "password123",
      username: "eveadams",
      joinDate: new Date().toISOString(),
    },
  ];

  localStorage.setItem("courses", JSON.stringify(sampleCourses));
  localStorage.setItem("users", JSON.stringify(sampleUsers));
};

// Run initialization only once
if (!localStorage.getItem("courses") || !localStorage.getItem("users")) {
  initializeSampleData();
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
