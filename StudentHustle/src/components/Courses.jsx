"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Plus, Filter, BookOpen, User, DollarSign, Clock } from "lucide-react"
import "../courses.css"

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    category: "programming",
    customCategory: "",
    difficulty: "beginner",
    duration: "",
    introVideo: null,
  })
  const [error, setError] = useState("")
  const [showCustomCategory, setShowCustomCategory] = useState(false)
  const navigate = useNavigate()

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "data-science", label: "Data Science" },
    { value: "languages", label: "Languages" },
  ]

  const difficulties = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ]

  // Load courses from local storage on component mount
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || []
    setCourses(storedCourses)
    setFilteredCourses(storedCourses)
  }, [])

  // Save courses to local storage whenever the courses state changes
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
  }, [courses])

  // Filter and sort courses
  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number.parseFloat(a.price.replace("$", "")) - Number.parseFloat(b.price.replace("$", ""))
        case "price-high":
          return Number.parseFloat(b.price.replace("$", "")) - Number.parseFloat(a.price.replace("$", ""))
        case "title":
          return a.title.localeCompare(b.title)
        default: // newest
          return courses.indexOf(b) - courses.indexOf(a)
      }
    })

    setFilteredCourses(filtered)
  }, [courses, searchTerm, selectedCategory, sortBy])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse({ ...newCourse, [name]: value })
    if (name === "category") {
      setShowCustomCategory(value === "other")
      if (value !== "other") {
        setNewCourse((prev) => ({ ...prev, customCategory: "" }))
      }
    }
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith("video/")) {
        if (file.size <= 50 * 1024 * 1024) {
          // 50MB limit
          const videoUrl = URL.createObjectURL(file)
          setNewCourse({ ...newCourse, introVideo: videoUrl })
        } else {
          setError("Video file must be less than 50MB.")
        }
      } else {
        setError("Please select a valid video file.")
      }
    }
  }

  const handleAddCourse = () => {
    if (newCourse.title.length <= 1) {
      setError("Course name must be more than 1 character.")
      return
    }
    if (Number(newCourse.price) < 0) {
      setError("Price cannot be negative.")
      return
    }
    if (!newCourse.duration) {
      setError("Please specify course duration.")
      return
    }

    const categoryValue =
      newCourse.category === "other" && newCourse.customCategory
        ? newCourse.customCategory
        : newCourse.category

    const updatedCourses = [
      ...courses,
      {
        ...newCourse,
        category: categoryValue,
        price: `$${newCourse.price}`,
        author: `${user.name} ${user.surname}`,
        email: user.email,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      },
    ]
    setCourses(updatedCourses)
    setNewCourse({
      title: "",
      description: "",
      price: "",
      category: "programming",
      customCategory: "",
      difficulty: "beginner",
      duration: "",
      introVideo: null,
    })
    setIsModalOpen(false)
    setError("")
  }

  const handleCancel = () => {
    setNewCourse({
      title: "",
      description: "",
      price: "",
      category: "programming",
      customCategory: "",
      difficulty: "beginner",
      duration: "",
      introVideo: null,
    })
    setIsModalOpen(false)
    setError("")
  }

  const handleAddCourseClick = () => {
    if (!user) {
      navigate("/signup")
    } else {
      setIsModalOpen(true)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "#10b981"
      case "intermediate":
        return "#f59e0b"
      case "advanced":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "programming":
        return "💻"
      case "design":
        return "🎨"
      case "business":
        return "💼"
      case "marketing":
        return "📈"
      case "data-science":
        return "📊"
      case "languages":
        return "🌍"
      default:
        return "📚"
    }
  }

  return (
    <div className="courses-main-container">
      <div className="courses-header">
        <div className="courses-header-content">
          <h1 className="courses-title">Discover Amazing Courses</h1>
          <p className="courses-subtitle">
            Learn from industry experts and advance your skills with our comprehensive course library
          </p>
        </div>

        <button className="add-course-btn" onClick={handleAddCourseClick}>
          <Plus size={20} />
          Create Course
        </button>
      </div>

      <div className="courses-controls">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search courses, instructors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="newest">Newest First</option>
              <option value="title">Title A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-stats">
        <span className="courses-count">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Course</h2>
              <button className="modal-close" onClick={handleCancel}>
                ×
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="modal-form">
              <div className="form-group">
                <label>Course Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={newCourse.category}
                    onChange={handleInputChange}
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                    <option value="other">Other (Add Custom)</option>
                  </select>
                  {showCustomCategory && (
                    <input
                      type="text"
                      name="customCategory"
                      value={newCourse.customCategory}
                      onChange={handleInputChange}
                      placeholder="Enter custom category"
                      style={{ marginTop: "0.5rem" }}
                      required
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>Difficulty *</label>
                  <select name="difficulty" value={newCourse.difficulty} onChange={handleInputChange}>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={newCourse.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  {String(newCourse.price).trim() === "0" && (
                    <div style={{ color: "#10b981", marginTop: "0.5rem", fontWeight: 500 }}>
                      This course is <strong>Free</strong>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={newCourse.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 4 weeks, 20 hours"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  placeholder="Describe what students will learn in this course..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Intro Video * (Max 50MB)</label>
                <input type="file" accept="video/*" onChange={handleVideoChange} className="video-input" />
                {newCourse.introVideo && (
                  <div className="video-preview">
                    <video src={newCourse.introVideo} controls className="preview-video" />
                    <button
                      type="button"
                      className="remove-video-btn"
                      onClick={() => setNewCourse({ ...newCourse, introVideo: null })}
                    >
                      Remove Video
                    </button>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleAddCourse}>
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="courses-grid">
        {filteredCourses.length === 0 ? (
          <div className="no-courses">
            <BookOpen size={48} />
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters, or be the first to create a course!</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              className="course-card"
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className="course-card-header">
                <div className="course-category">
                  <span className="category-icon">{getCategoryIcon(course.category)}</span>
                  <span className="category-text">
                    {categories.find((cat) => cat.value === course.category)?.label || "General"}
                  </span>
                </div>
                <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(course.difficulty) }}>
                  {course.difficulty || "Beginner"}
                </div>
              </div>

              <div className="course-card-content">
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-description">
                  {course.description.length > 120 ? `${course.description.substring(0, 120)}...` : course.description}
                </p>
              </div>

              <div className="course-card-meta">
                <div className="course-meta-item">
                  <User size={16} />
                  <span>{course.author}</span>
                </div>
                {course.duration && (
                  <div className="course-meta-item">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                )}
              </div>

              <div className="course-card-footer">
                <div className="course-price">
                  <DollarSign size={18} />
                  <span className="price-amount">
                    {Number(course.price.replace("$", "")) === 0 ? "Free" : course.price}
                  </span>
                </div>
                <button className="course-view-btn">View Course</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Courses
