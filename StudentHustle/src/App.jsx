"use client"

import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header.jsx"
import Home from "./components/Home.jsx"
import Courses from "./components/Courses.jsx"
import SignIn from "./components/SignIn.jsx"
import SignUp from "./components/SignUp.jsx"
import Profile from "./components/Profile.jsx"
import CourseDetails from "./components/CourseDetails.jsx"

function App() {
  const [user, setUser] = useState(null)

  // Load user data from localStorage when the app initializes
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser) {
      setUser(storedUser)
    }

    // Ensure all courses have unique IDs
    const courses = JSON.parse(localStorage.getItem("courses")) || []
    const coursesWithIds = courses.map((course, index) => {
      if (!course.id) {
        return { ...course, id: `course_${Date.now()}_${index}` }
      }
      return course
    })

    if (JSON.stringify(coursesWithIds) !== JSON.stringify(courses)) {
      localStorage.setItem("courses", JSON.stringify(coursesWithIds))
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses user={user} />} />
        <Route path="/courses/:courseId" element={<CourseDetails user={user} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
