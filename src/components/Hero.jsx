import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiExternalLink, FiArrowDown } from "react-icons/fi";

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Full-Stack Developer",
    "Software Engineer",
    "Backend Developer",
    "Problem Solver",
  ];

  useEffect(() => {
    const typeWriter = () => {
      const currentFullText = texts[textIndex];

      if (isDeleting) {
        setCurrentText((prev) => {
          const newText = currentFullText.substring(0, prev.length - 1);
          if (newText === "") {
            setIsDeleting(false);
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            return "";
          }
          return newText;
        });
      } else {
        setCurrentText((prev) => {
          const newText = currentFullText.substring(0, prev.length + 1);
          if (newText === currentFullText) {
            setIsDeleting(true);
          }
          return newText;
        });
      }
    };

    const speed = isDeleting ? 150 : 200;
    const timer = setTimeout(typeWriter, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, texts]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Floating elements animation
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="home" className="hero">
      {/* Background floating elements */}
      <motion.div
        className="floating-element floating-element-1"
        variants={floatingVariants}
        animate="float"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60px",
          height: "60px",
          background: "var(--gradient-primary)",
          borderRadius: "50%",
          opacity: 0.1,
          filter: "blur(2px)",
        }}
      />
      <motion.div
        className="floating-element floating-element-2"
        variants={floatingVariants}
        animate="float"
        style={{
          position: "absolute",
          top: "60%",
          right: "15%",
          width: "40px",
          height: "40px",
          background: "var(--gradient-secondary)",
          borderRadius: "50%",
          opacity: 0.1,
          filter: "blur(2px)",
        }}
        transition={{ delay: 1 }}
      />
      <motion.div
        className="floating-element floating-element-3"
        variants={floatingVariants}
        animate="float"
        style={{
          position: "absolute",
          top: "30%",
          right: "30%",
          width: "80px",
          height: "80px",
          background: "var(--gradient-accent)",
          borderRadius: "50%",
          opacity: 0.05,
          filter: "blur(3px)",
        }}
        transition={{ delay: 2 }}
      />

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi, I'm{" "}
            <span className="highlight">Balasubramaniyam Thushakaran</span>
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            I'm a <span className="typing">{currentText}</span>
            <motion.span
              className="cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Passionate Full-Stack Software Engineer with a strong focus on
            backend development, proficient in Spring Boot and Node.js. I build
            scalable, user-friendly applications using modern web technologies
            to solve real-world problems.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => scrollToSection("projects")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FiExternalLink />
              </motion.div>
              View My Work
            </motion.button>

            <motion.button
              className="btn btn-outline"
              onClick={() => scrollToSection("contact")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get In Touch
            </motion.button>

            <motion.a
              href="/resume.pdf"
              className="btn btn-outline"
              download
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(102, 126, 234, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiDownload />
              </motion.div>
              Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="stat"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="stat-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                5+
              </motion.span>
              <span className="stat-label">Projects</span>
            </motion.div>

            <motion.div
              className="stat"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="stat-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
              >
                8+
              </motion.span>
              <span className="stat-label">Technologies</span>
            </motion.div>

            <motion.div
              className="stat"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="stat-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
              >
                1+
              </motion.span>
              <span className="stat-label">Years Experience</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
        >
          <motion.div
            className="hero-profile-container"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src="/images/me_2.png"
              alt="Thushakaran's Profile"
              className="hero-profile"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 1,
                type: "spring",
                stiffness: 200,
              }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x400/667eea/ffffff?text=TB";
              }}
            />
            <motion.div
              className="profile-glow"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated rings around profile */}
            <motion.div
              className="profile-ring-1"
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                right: "-20px",
                bottom: "-20px",
                border: "2px solid var(--primary-color)",
                borderRadius: "50%",
                opacity: 0.3,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            <motion.div
              className="profile-ring-2"
              style={{
                position: "absolute",
                top: "-35px",
                left: "-35px",
                right: "-35px",
                bottom: "-35px",
                border: "1px solid var(--secondary-color)",
                borderRadius: "50%",
                opacity: 0.2,
              }}
              animate={{
                rotate: -360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
