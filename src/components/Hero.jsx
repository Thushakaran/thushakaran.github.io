import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight } from "react-icons/fi";

const HERO_TITLES = [
  "Full-Stack Developer",
  "Software Engineer",
  "Backend Developer",
  "Workflow Automation Engineer",
];

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const currentFullText = HERO_TITLES[textIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1400);
      return () => clearTimeout(pauseTimer);
    }

    const speed = isDeleting ? 55 : 90;
    const timer = setTimeout(() => {
      if (isDeleting) {
        const nextText = currentFullText.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % HERO_TITLES.length);
        }
      } else {
        const nextText = currentFullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        if (nextText === currentFullText) {
          setIsPaused(true);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, textIndex]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-kicker">
            Associate Software Engineer · Jaffna, Sri Lanka
          </p>
          <h1>
            Hi, I&apos;m{" "}
            <span className="highlight">Balasubramaniyam Thushakaran</span>
          </h1>

          <h2 className="hero-subtitle">
            I&apos;m a <span className="typing">{currentText}</span>
            <span className="cursor" aria-hidden="true">
              |
            </span>
          </h2>

          <p className="hero-description">
            Full-Stack Software Engineer specializing in backend architecture
            with Spring Boot and Node.js, alongside enterprise workflow
            automation using Core PHP, JavaScript, and JobRouter. I build
            reliable, maintainable applications that solve real operational
            problems.
          </p>

          <div className="hero-cta">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
              <FiArrowRight aria-hidden="true" />
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </button>

            <a href="/resume.pdf" className="btn btn-outline" download>
              <FiDownload aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Full-Stack Projects</span>
            </div>

            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Technologies</span>
            </div>

            <div className="stat">
              <span className="stat-number">1+</span>
              <span className="stat-label">Years Industry Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-profile-container">
            {imageError ? (
              <div
                className="hero-profile hero-profile-fallback"
                aria-label="Balasubramaniyam Thushakaran"
              >
                BT
              </div>
            ) : (
              <img
                src="/images/me_2.png"
                alt="Balasubramaniyam Thushakaran"
                className="hero-profile"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            )}
            <div className="profile-glow" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
