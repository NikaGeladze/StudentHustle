import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../courses.css";

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    video: null,
  });
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true); // Start upload
    setUploadProgress(0); // Reset progress

    const reader = new FileReader();
    reader.onload = () => {
      const base64Video = reader.result;

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setNewCourse({ ...newCourse, video: base64Video });
          setIsUploading(false); // Finish upload
        }
      }, 200); // Simulate progress every 200ms
    };

    reader.onerror = () => {
      setError("Failed to upload video. Please try again.");
      setIsUploading(false); // Reset upload state
    };

    reader.readAsDataURL(file);
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
        email: user.email, // Include the user's email
      },
    ];
    setCourses(updatedCourses);
    setNewCourse({ title: "", description: "", price: "", video: null });
    setIsModalOpen(false);
    setError("");
  };

  const handleCancel = () => {
    setNewCourse({ title: "", description: "", price: "", video: null });
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
            <label>
              Intro Video (Optional):
              <input type="file" accept="video/*" onChange={handleFileChange} />
            </label>
            {isUploading && (
              <p>Uploading video: {uploadProgress}% complete. Please wait...</p>
            )}
            <div className="modal-buttons">
              <button onClick={handleAddCourse} disabled={isUploading}>
                Add
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="coursescontainer">
        {courses.map((course, index) => (
          <div
            className="course"
            key={index}
            onClick={() => navigate(`/courses/${index}`)} // Navigate to CourseDetails page
          >
            <h2 className="course-title">{course.title}</h2>
            <p className="course-description">
              {course.description.length > 100
                ? `${course.description.substring(0, 100)}...`
                : course.description}
            </p>
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
