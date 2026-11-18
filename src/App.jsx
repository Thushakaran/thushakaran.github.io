import { useState, useEffect, useRef } from "react";
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
  FiBriefcase,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "experience", label: "Experience", icon: FiBriefcase },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "education", label: "Education", icon: FiBookOpen },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "contact", label: "Contact", icon: FiMail },
];

const SECTIONS = NAV_ITEMS.map((item) => item.id);

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem("portfolio-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [theme, setTheme] = useState(getInitialTheme);
  const [avatarError, setAvatarError] = useState(false);

  const sidebarRef = useRef(null);
  const menuBtnRef = useRef(null);
  const isMenuOpenRef = useRef(isMobileMenuOpen);

  useEffect(() => {
    isMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  // Apply theme attribute and persist preference
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Handle body scroll when sidebar is open on mobile
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

  // Track scroll progress and active section
  useEffect(() => {
    let ticking = false;

    const updateOnScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(percent);

      if (isMenuOpenRef.current) {
        setIsMobileMenuOpen(false);
      }

      const currentSection = SECTIONS.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleOutsideClick = (e) => {
      const clickedSidebar = sidebarRef.current?.contains(e.target);
      const clickedBtn = menuBtnRef.current?.contains(e.target);
      if (!clickedSidebar && !clickedBtn) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMobileMenuOpen]);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Subtle Ambient Background */}
      <div className="animated-bg" aria-hidden="true" />

      {/* Mobile Menu Button */}
      <button
        ref={menuBtnRef}
        type="button"
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        className={`sidebar ${isMobileMenuOpen ? "sidebar-open" : ""}`}
        initial={false}
        animate={{ x: isMobile ? (isMobileMenuOpen ? 0 : -280) : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        aria-label="Primary navigation"
      >
        <div className="profile-section">
          <div className="profile-pic-container">
            {avatarError ? (
              <div className="profile-pic profile-pic-fallback" aria-label="Balasubramaniyam Thushakaran">
                BT
              </div>
            ) : (
              <img
                src="/images/me.png"
                alt="Balasubramaniyam Thushakaran"
                className="profile-pic"
                referrerPolicy="no-referrer"
                onError={() => setAvatarError(true)}
              />
            )}
          </div>
          <h2>
            Balasubramaniyam
            <br />
            Thushakaran
          </h2>
          <p className="profile-role">Software Engineer</p>
        </div>

        <nav className="main-nav">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`nav-link ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <div className="social-links">
            <a
              href="https://github.com/Thushakaran"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              title="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/thushakaran/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              title="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href="/resume.pdf"
              download
              aria-label="Download resume PDF"
              title="Download Resume"
            >
              <FiDownload />
            </a>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="main-content-wrapper">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Projects />
          <Contact />
        </div>

        <footer className="site-footer">
          <p className="footer-copy">
            © {new Date().getFullYear()} Balasubramaniyam Thushakaran. All rights reserved.
          </p>
          <div className="footer-links">
            <a
              href="https://github.com/Thushakaran"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.linkedin.com/in/thushakaran/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a href="/resume.pdf" download>
              Resume
            </a>
          </div>
        </footer>
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
