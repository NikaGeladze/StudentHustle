"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Calendar,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
  Star,
  DollarSign,
  Users,
} from "lucide-react"
import "../profile.css"

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user || {})
  const [enrollments, setEnrollments] = useState([])
  const [createdCourses, setCreatedCourses] = useState([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (user) {
      // Load user's enrollments
      const allEnrollments = JSON.parse(localStorage.getItem("enrollments")) || []
      const userEnrollments = allEnrollments.filter((enrollment) => enrollment.userId === user.email)
      setEnrollments(userEnrollments)

      // Load user's created courses
      const allCourses = JSON.parse(localStorage.getItem("courses")) || []
      const userCourses = allCourses.filter((course) => course.email === user.email)
      setCreatedCourses(userCourses)
    }
  }, [user])

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setUser(null)
      localStorage.removeItem("user")
      navigate("/")
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser(user)
    }
    setIsEditing(!isEditing)
  }

  const handleSaveProfile = () => {
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || []
    const updatedUsers = users.map((u) => (u.email === user.email ? editedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("user", JSON.stringify(editedUser))

    setUser(editedUser)
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  const calculateTotalEarnings = () => {
    return createdCourses.reduce((total, course) => {
      const price = Number.parseFloat(course.price.replace("$", ""))
      const enrollments = course.enrollments || 0
      return total + price * enrollments
    }, 0)
  }

  const getJoinDate = () => {
    return user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "Recently"
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "created", label: "Created Courses", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Please sign in to view your profile</h2>
          <button onClick={() => navigate("/signin")} className="signin-btn">
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-info">
            <div className="profile-avatar">
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </div>
            <div className="profile-details">
              <h1 className="profile-name">
                {user.name} {user.surname}
              </h1>
              <p className="profile-email">{user.email}</p>
              <div className="profile-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Joined {getJoinDate()}</span>
                </div>
                <div className="meta-item">
                  <Award size={16} />
                  <span>{enrollments.length} Courses Enrolled</span>
                </div>
                <div className="meta-item">
                  <BookOpen size={16} />
                  <span>{createdCourses.length} Courses Created</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="action-btn secondary" onClick={handleEditToggle}>
              <Edit3 size={16} />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button className="action-btn danger" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-tab">
              <div className="stats-cards">
                <div className="stat-card">
                  <div className="stat-icon enrolled">
                    <BookOpen size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{enrollments.length}</h3>
                    <p>Courses Enrolled</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon created">
                    <Award size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{createdCourses.length}</h3>
                    <p>Courses Created</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon earnings">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>${calculateTotalEarnings().toFixed(2)}</h3>
                    <p>Total Earnings</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon rating">
                    <Star size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>5.0</h3>
                    <p>Average Rating</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {enrollments.slice(0, 3).map((enrollment, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        <BookOpen size={16} />
                      </div>
                      <div className="activity-content">
                        <p>
                          <strong>Enrolled in:</strong> {enrollment.courseTitle}
                        </p>
                        <span className="activity-date">{new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {enrollments.length === 0 && (
                    <p className="no-activity">No recent activity. Start by enrolling in a course!</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="courses-tab">
              <h3>Enrolled Courses ({enrollments.length})</h3>
              <div className="courses-grid">
                {enrollments.map((enrollment, index) => (
                  <div key={index} className="course-card">
                    <div className="course-header">
                      <h4>{enrollment.courseTitle}</h4>
                      <span className="course-price">{enrollment.price}</span>
                    </div>
                    <p className="course-instructor">by {enrollment.instructor}</p>
                    <div className="course-footer">
                      <div className="course-date">
                        <Calendar size={14} />
                        <span>Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                      </div>
                      <button className="continue-btn">Continue Learning</button>
                    </div>
                  </div>
                ))}
                {enrollments.length === 0 && (
                  <div className="empty-state">
                    <BookOpen size={48} />
                    <h4>No courses enrolled yet</h4>
                    <p>Explore our course catalog and start your learning journey!</p>
                    <button onClick={() => navigate("/courses")} className="explore-btn">
                      Explore Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "created" && (
            <div className="created-tab">
              <h3>Created Courses ({createdCourses.length})</h3>
              <div className="courses-grid">
                {createdCourses.map((course, index) => (
                  <div key={index} className="course-card">
                    <div className="course-header">
                      <h4>{course.title}</h4>
                      <span className="course-price">{course.price}</span>
                    </div>
                    <p className="course-description">{course.description.substring(0, 100)}...</p>
                    <div className="course-stats">
                      <div className="stat">
                        <Users size={14} />
                        <span>{course.enrollments || 0} students</span>
                      </div>
                      <div className="stat">
                        <DollarSign size={14} />
                        <span>
                          ${(Number.parseFloat(course.price.replace("$", "")) * (course.enrollments || 0)).toFixed(2)}{" "}
                          earned
                        </span>
                      </div>
                    </div>
                    <div className="course-footer">
                      <button onClick={() => navigate(`/courses/${index}`)} className="view-btn">
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
                {createdCourses.length === 0 && (
                  <div className="empty-state">
                    <Award size={48} />
                    <h4>No courses created yet</h4>
                    <p>Share your knowledge and start teaching others!</p>
                    <button onClick={() => navigate("/courses")} className="create-btn">
                      Create Course
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-tab">
              <h3>Profile Settings</h3>
              <div className="settings-form">
                <div className="form-section">
                  <h4>Personal Information</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      {isEditing ? (
                        <input type="text" name="name" value={editedUser.name || ""} onChange={handleInputChange} />
                      ) : (
                        <p className="form-value">{user.name}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="surname"
                          value={editedUser.surname || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="form-value">{user.surname}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <p className="form-value">{user.email}</p>
                      <small>Email cannot be changed</small>
                    </div>
                    <div className="form-group">
                      <label>Username</label>
                      <p className="form-value">{user.username}</p>
                      <small>Username is auto-generated</small>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="form-actions">
                      <button className="save-btn" onClick={handleSaveProfile}>
                        <Save size={16} />
                        Save Changes
                      </button>
                      <button className="cancel-btn" onClick={handleEditToggle}>
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
