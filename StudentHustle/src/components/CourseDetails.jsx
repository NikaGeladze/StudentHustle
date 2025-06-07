import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../courseDetails.css";

const CourseDetails = ({ user }) => {
  const { courseId } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  // Retrieve courses from localStorage
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const course = courses[courseId]; // Find the course by its index

  const handleDeleteCourse = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updatedCourses = courses.filter(
        (_, index) => index !== parseInt(courseId)
      );
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      navigate("/courses"); // Redirect back to the courses list
    }
  };

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="single-course-container">
      <h1 className="single-course-title">{course.title}</h1>
      <p className="single-course-description">{course.description}</p>
      <p className="single-course-price">
        <strong>Price:</strong> {course.price}
      </p>
      <p className="single-course-author">
        <strong>Author:</strong> {course.author}
      </p>
      <p className="single-course-email">
        <strong>Email:</strong> {course.email}
      </p>
      {user &&
        `${user.name} ${user.surname}` === course.author &&
        user.email === course.email && (
          <button
            className="single-course-delete-button"
            onClick={handleDeleteCourse}
          >
            Delete Course
          </button>
        )}
      <button
        className="single-course-back-button"
        onClick={() => navigate("/courses")}
      >
        Back to Courses
      </button>
    </div>
  );
};

export default CourseDetails;
