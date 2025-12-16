import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiCode,
  FiBookOpen,
  FiFolder,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiDownload,
} from "react-icons/fi";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  // Handle body scroll when sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);

      // Close mobile menu when scrolling
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "education",
        "projects",
        "contact",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: "home", label: "Home", icon: FiHome },
    { id: "about", label: "About", icon: FiUser },
    { id: "skills", label: "Skills", icon: FiCode },
    { id: "education", label: "Education", icon: FiBookOpen },
    { id: "projects", label: "Projects", icon: FiFolder },
    { id: "contact", label: "Contact", icon: FiMail },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  // Close sidebar when clicking outside
  const handleOutsideClick = (e) => {
    if (isMobileMenuOpen && !e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-btn')) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMenu />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isMobileMenuOpen ? "sidebar-open" : ""}`}
        initial={{ x: isMobile ? -280 : 0 }}
        animate={{ x: isMobile ? (isMobileMenuOpen ? 0 : -280) : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="profile-pic-container"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={`https://github.com/Thushakaran/thushakaran.github.io/blob/master/public/images/me.png`}
              alt="Thushakaran's Profile Picture"
              className="profile-pic"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150x150/667eea/ffffff?text=TB";
              }}
            />
            <motion.div
              className="profile-ring"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Balasubramaniyam
            <br />
            Thushakaran
          </motion.h2>
        </motion.div>

        <nav className="main-nav">
          <ul className="nav-list">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                >
                  <motion.button
                    className={`nav-link ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{
                      scale: 1.05,
                      x: 5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon />
                    </motion.div>
                    <span>{item.label}</span>
                  </motion.button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/Thushakaran"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              rotate: 5,
              boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/thushakaran/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              rotate: -5,
              boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiLinkedin />
          </motion.a>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="main-content"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
