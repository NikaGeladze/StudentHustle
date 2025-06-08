"use client";

import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";
import "../mainbody.css";

function Home() {
  const features = [
    {
      title: "Connecting students for smarter hustles",
      description:
        "StudentHustle is a dynamic platform designed to empower students by helping them connect, collaborate, and grow together through shared knowledge and experiences.",
      icon: Users,
      color: "#3b82f6",
    },
    {
      title: "Student marketplace for everything you need",
      description:
        "StudentHustle creates a marketplace built by students, for students. It offers a wide range of resources, courses, and opportunities to enhance your learning journey.",
      icon: BookOpen,
      color: "#10b981",
    },
    {
      title: "More than a platform, it's a movement",
      description:
        "At its core, StudentHustle is more than just a platform — it's a movement toward student-led entrepreneurship, skill-sharing, and resourcefulness in education.",
      icon: TrendingUp,
      color: "#f59e0b",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content:
        "StudentHustle helped me learn web development from amazing instructors. The community is incredibly supportive!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Business Major",
      content:
        "The courses here are practical and taught by real experts. I've gained skills that directly apply to my career goals.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Design Student",
      content:
        "As both a student and instructor, I love how StudentHustle empowers us to share knowledge and grow together.",
      rating: 5,
      avatar: "ER",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">StudentHustle</span>
            </h1>
            <p className="hero-subtitle">
              Deepen your knowledge and support fellow students by discovering
              amazing courses taught by passionate educators
            </p>
            <div className="hero-actions">
              <NavLink to="/courses" className="cta-button primary">
                <BookOpen size={20} />
                Explore Courses
                <ArrowRight size={16} />
              </NavLink>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-avatar">👨‍💻</div>
                <div>
                  <h4>Learn from your fellow Students</h4>
                  <p>Join thousands of students</p>
                </div>
              </div>
              {/* Removed course progress percentage and progress bar */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2
            className="section-title"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Why Choose StudentHustle?
          </h2>
          <p className="section-subtitle">
            Discover what makes our platform the perfect place for student
            learning and growth
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div
                className="feature-icon"
                style={{
                  backgroundColor: `${feature.color}15`,
                  color: feature.color,
                }}
              >
                <feature.icon size={28} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2
            className="section-title"
            style={{ display: "flex", justifyContent: "center" }}
          >
            What Our Students Say
          </h2>
          <p className="section-subtitle">
            Real stories from real students who've transformed their learning
            journey
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of students who are already advancing their skills
            and building their future
          </p>
          <div className="cta-features">
            <div className="cta-feature">
              <CheckCircle size={20} color="#10b981" />
              <span>Access to premium courses</span>
            </div>
            <div className="cta-feature">
              <CheckCircle size={20} color="#10b981" />
              <span>Learn from the experienced</span>
            </div>
            <div className="cta-feature">
              <CheckCircle size={20} color="#10b981" />
              <span>Join a supportive community</span>
            </div>
          </div>
          <NavLink to="/courses" className="cta-button primary large">
            <BookOpen size={20} />
            Start Learning Today
            <ArrowRight size={16} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Home;
