import React from "react";
import "../courses.css";

const coursesData = [
  {
    title: "Introduction to Programming",
    description:
      "I will teach you the basics of programming.and how to build your first application from scratch.",
    author: "John Doe",
    price: "$49.99",
  },
  {
    title: "Course 2",
    description: "Advanced web development techniques.",
    author: "Jane Smith",
    price: "$79.99",
  },
  {
    title: "Course 3",
    description: "Mastering React.js.",
    author: "Alice Johnson",
    price: "$99.99",
  },
  {
    title: "Introduction to Programming",
    description:
      "I will teach you the basics of programming.and how to build your first application from scratch.",
    author: "John Doe",
    price: "$49.99",
  },
  {
    title: "Introduction to Programming",
    description:
      "I will teach you the basics of programming.and how to build your first application from scratch.",
    author: "John Doe",
    price: "$49.99",
  },
  {
    title: "Introduction to Programming",
    description:
      "I will teach you the basics of programming.and how to build your first application from scratch.",
    author: "John Doe",
    price: "$49.99",
  },
];

const Courses = () => {
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
      <button className="course-add">Add a course</button>
      <div className="coursescontainer">
        {coursesData.map((course, index) => (
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
