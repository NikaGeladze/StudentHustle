import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../courses.css";

const initialCourses = [
  {
    title: "Introduction to Programming",
    description:
      "I will teach you the basics of programming and how to build your first application from scratch.",
    author: "John Doe",
    price: "$49.99",
  },
  {
    title: "Advanced Web Development",
    description: "Learn advanced web development techniques.",
    author: "Jane Smith",
    price: "$79.99",
  },
  {
    title: "Mastering React.js",
    description: "Become a React.js expert.",
    author: "Alice Johnson",
    price: "$99.99",
  },
];

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Load courses from local storage on component mount
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  // Save courses to local storage whenever the courses state changes
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = () => {
    if (newCourse.title.length <= 1) {
      setError("Course name must be more than 1 letter.");
      return;
    }
    if (newCourse.price <= 0) {
      setError("Price must be a positive number.");
      return;
    }
    const updatedCourses = [
      ...courses,
      {
        ...newCourse,
        price: `$${newCourse.price}`,
        author: `${user.name} ${user.surname}`,
      },
    ];
    setCourses(updatedCourses);
    setNewCourse({ title: "", description: "", price: "" });
    setIsModalOpen(false);
    setError("");
  };

  const handleCancel = () => {
    setNewCourse({ title: "", description: "", price: "" });
    setIsModalOpen(false);
    setError("");
  };

  const handleAddCourseClick = () => {
    if (!user) {
      // Redirect to the sign-up page if the user is not signed in
      navigate("/signup");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="maincontainer">
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "rgb(248, 213, 213)",
        }}
      >
        Explore and see all the available courses below
      </h1>
      <button className="course-add" onClick={handleAddCourseClick}>
        Add a course
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a New Course</h2>
            {error && <p className="error">{error}</p>}
            <label>
              Course Name:
              <input
                type="text"
                name="title"
                value={newCourse.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={newCourse.price}
                onChange={handleInputChange}
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddCourse}>Add</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="coursescontainer">
        {courses.map((course, index) => (
          <div className="course" key={index}>
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">{course.description}</p>
            <div className="course-bottom">
              <p>
                <strong className="course-price">{course.price}</strong>
              </p>
              <p className="course-author">{course.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
