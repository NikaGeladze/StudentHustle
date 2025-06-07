"use client"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Mail, Clock, BookOpen, DollarSign, Trash2, Star, Calendar, Award, Play } from "lucide-react"
import "../courseDetails.css"
import { useState, useEffect } from "react"

const CourseDetails = ({ user }) => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    console.log(`🔍 Looking for course with ID: "${courseId}"`)

    // Always get fresh data from localStorage
    const courses = JSON.parse(localStorage.getItem("courses")) || []
    console.log(`📦 Total courses in localStorage: ${courses.length}`)

    // Find course by exact ID match
    const foundCourse = courses.find((c) => c.id === courseId)

    if (foundCourse) {
      console.log(`✅ Found course: "${foundCourse.title}"`)
      console.log(`📋 Course details:`, {
        id: foundCourse.id,
        title: foundCourse.title,
        author: foundCourse.author,
        price: foundCourse.price,
      })
      setCourse(foundCourse)
    } else {
      console.log(`❌ Course not found with ID: "${courseId}"`)
      console.log(
        `📋 Available course IDs:`,
        courses.map((c) => ({ id: c.id, title: c.title })),
      )

      // For backward compatibility, try to find by index if courseId is a number
      const courseIndex = Number.parseInt(courseId)
      if (!isNaN(courseIndex) && courses[courseIndex]) {
        console.log(`🔄 Found course by index ${courseIndex}: "${courses[courseIndex].title}"`)
        setCourse(courses[courseIndex])
      } else {
        console.log(`❌ No course found by index either`)
        setCourse(null)
      }
    }
  }, [courseId])

  useEffect(() => {
    if (user && course) {
      const enrollments = JSON.parse(localStorage.getItem("enrollments")) || []
      const userEnrollment = enrollments.find(
        (enrollment) =>
          enrollment.userId === user.email && (enrollment.courseId === courseId || enrollment.courseId === course.id),
      )
      setIsEnrolled(!!userEnrollment)
    }
  }, [user, course, courseId])

  const handleDeleteCourse = () => {
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      const courses = JSON.parse(localStorage.getItem("courses")) || []

      // Filter out the course by ID
      const updatedCourses = courses.filter((c) => c.id !== course.id)

      localStorage.setItem("courses", JSON.stringify(updatedCourses))
      navigate("/courses")
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

  const formatDate = (dateString) => {
    if (!dateString) return "Recently"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleEnrollClick = () => {
    if (!user) {
      navigate("/signup")
      return
    }
    setShowPaymentModal(true)
  }

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) return
    } else if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) return
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 3) return
    }

    setPaymentData({ ...paymentData, [name]: formattedValue })
  }

  const processPayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Save enrollment data
    const enrollments = JSON.parse(localStorage.getItem("enrollments")) || []
    const newEnrollment = {
      userId: user.email,
      courseId: course.id,
      courseTitle: course.title,
      instructor: course.author,
      price: course.price,
      enrolledAt: new Date().toISOString(),
      transactionId: `txn_${Date.now()}`,
    }

    enrollments.push(newEnrollment)
    localStorage.setItem("enrollments", JSON.stringify(enrollments))

    // Update course enrollment count
    const courses = JSON.parse(localStorage.getItem("courses")) || []
    const updatedCourses = courses.map((c) => {
      if (c.id === course.id) {
        return {
          ...c,
          enrollments: (c.enrollments || 0) + 1,
        }
      }
      return c
    })

    localStorage.setItem("courses", JSON.stringify(updatedCourses))

    // Update local course state
    setCourse({
      ...course,
      enrollments: (course.enrollments || 0) + 1,
    })

    setIsEnrolled(true)
    setIsProcessing(false)
    setShowPaymentModal(false)
    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    })
  }

  const closePaymentModal = () => {
    setShowPaymentModal(false)
    setPaymentData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    })
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <div className="not-found-content">
          <BookOpen size={64} />
          <h2>Course Not Found</h2>
          <p>The course you're looking for doesn't exist or has been removed.</p>
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "1rem" }}>Course ID: {courseId}</p>
          <button className="back-to-courses-btn" onClick={() => navigate("/courses")}>
            <ArrowLeft size={20} />
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  const isOwner = user && `${user.name} ${user.surname}` === course.author && user.email === course.email

  return (
    <div className="course-details-container">
      {/* Debug Panel removed */}
      <div className="course-details-header">
        <button className="back-button" onClick={() => navigate("/courses")}>
          <ArrowLeft size={20} />
          Back to Courses
        </button>

        {isOwner && (
          <button className="delete-button" onClick={handleDeleteCourse}>
            <Trash2 size={18} />
            Delete Course
          </button>
        )}
      </div>

      <div className="course-hero">
        <div className="course-hero-content">
          <div className="course-badges">
            <div className="category-badge">
              <span className="category-icon">{getCategoryIcon(course.category)}</span>
              <span>{course.category?.replace("-", " ").toUpperCase() || "GENERAL"}</span>
            </div>
            <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(course.difficulty) }}>
              <Award size={16} />
              {course.difficulty || "Beginner"}
            </div>
          </div>

          <h1 className="course-title">{course.title}</h1>

          <div className="course-meta-info">
            <div className="meta-item">
              <User size={18} />
              <span>Instructor: {course.author}</span>
            </div>
            <div className="meta-item">
              <Calendar size={18} />
              <span>Created: {formatDate(course.createdAt)}</span>
            </div>
            {course.duration && (
              <div className="meta-item">
                <Clock size={18} />
                <span>Duration: {course.duration}</span>
              </div>
            )}
          </div>

          <div className="course-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <span className="rating-text">5.0 (New Course)</span>
          </div>
        </div>

        <div className="course-price-card">
          <div className="price-display">
            <DollarSign size={24} />
            <span className="price-amount">{course.price}</span>
          </div>
          {isEnrolled ? (
            <button className="enrolled-button" disabled>
              ✅ Enrolled
            </button>
          ) : (
            <button className="enroll-button" onClick={handleEnrollClick}>
              Enroll Now
            </button>
          )}
          <div className="price-note">
            <p>30-day money-back guarantee</p>
            <p>Full lifetime access</p>
          </div>
        </div>
      </div>

      {course.introVideo && (
        <div className="intro-video-section">
          <div className="video-container">
            <h3 className="video-title">
              <Play size={20} />
              Course Preview
            </h3>
            <div className="video-wrapper">
              <video
                src={course.introVideo}
                controls
                className="intro-video"
                poster="/placeholder.svg?height=400&width=700"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="video-description">
              Get a preview of what you'll learn in this course. This intro video gives you a taste of the instructor's
              teaching style and course content.
            </p>
          </div>
        </div>
      )}

      <div className="course-content">
        <div className="course-main">
          <section className="course-section">
            <h2 className="section-title">
              <BookOpen size={24} />
              Course Description
            </h2>
            <div className="course-description">
              <p>{course.description}</p>
            </div>
          </section>

          <section className="course-section">
            <h2 className="section-title">What You'll Learn</h2>
            <div className="learning-outcomes">
              <div className="outcome-item">
                <span className="outcome-icon">✓</span>
                <span>Master the fundamentals covered in this course</span>
              </div>
              <div className="outcome-item">
                <span className="outcome-icon">✓</span>
                <span>Apply practical skills to real-world projects</span>
              </div>
              <div className="outcome-item">
                <span className="outcome-icon">✓</span>
                <span>Build confidence in your abilities</span>
              </div>
              <div className="outcome-item">
                <span className="outcome-icon">✓</span>
                <span>Connect with a community of learners</span>
              </div>
            </div>
          </section>

          <section className="course-section">
            <h2 className="section-title">Course Requirements</h2>
            <div className="requirements">
              <div className="requirement-item">
                <span className="requirement-icon">•</span>
                <span>Basic computer skills and internet access</span>
              </div>
              <div className="requirement-item">
                <span className="requirement-icon">•</span>
                <span>Enthusiasm to learn and practice</span>
              </div>
              <div className="requirement-item">
                <span className="requirement-icon">•</span>
                <span>No prior experience required - we'll start from the basics</span>
              </div>
            </div>
          </section>
        </div>

        <div className="course-sidebar">
          <div className="instructor-card">
            <h3 className="instructor-title">
              <User size={20} />
              Meet Your Instructor
            </h3>
            <div className="instructor-info">
              <div className="instructor-avatar">
                {course.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="instructor-details">
                <h4 className="instructor-name">{course.author}</h4>
                <div className="instructor-contact">
                  <Mail size={16} />
                  <span>{course.email}</span>
                </div>
                <p className="instructor-bio">
                  Experienced educator passionate about sharing knowledge and helping students succeed.
                </p>
              </div>
            </div>
          </div>

          <div className="course-stats-card">
            <h3>Course Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{course.enrollments || 0}</span>
                <span className="stat-label">Students Enrolled</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5.0</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">New</span>
                <span className="stat-label">Course Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-header">
              <h2>Complete Your Purchase</h2>
              <button className="close-payment-btn" onClick={closePaymentModal}>
                ×
              </button>
            </div>

            <div className="payment-summary">
              <h3>{course.title}</h3>
              <p>Instructor: {course.author}</p>
              <div className="payment-total">
                <span>Total: {course.price}</span>
              </div>
            </div>

            <div className="payment-form">
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={paymentData.cardholderName}
                  onChange={handlePaymentInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentInputChange}
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentInputChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentInputChange}
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="payment-actions">
                <button className="cancel-payment-btn" onClick={closePaymentModal}>
                  Cancel
                </button>
                <button className="process-payment-btn" onClick={processPayment} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Pay ${course.price}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetails
