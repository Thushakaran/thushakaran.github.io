import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiGithub,
  FiMaximize2,
  FiX,
  FiCalendar,
  FiZap,
  FiShoppingCart,
  FiCoffee,
  FiDroplet,
  FiCheckCircle,
} from "react-icons/fi";

const CATEGORIES = ["All", "Spring Boot", "MERN / Node.js", "PHP & Web"];

const PROJECTS_DATA = [
  {
    id: "booking-system",
    title: "Online Application Booking System",
    category: "Spring Boot",
    stackSummary: "Full-Stack · Spring Boot & React",
    icon: FiCalendar,
    iconColor: "#4f46e5",
    image: "/images/online_application_booking.png",
    github:
      "https://github.com/Thushakaran/online_appointment_booking_system",
    summary:
      "Appointment scheduling and service booking platform with role-based access, real-time slot validation, and JWT-secured REST endpoints.",
    highlights: [
      "Designed RESTful APIs in Spring Boot backed by a normalized MySQL schema",
      "Implemented JWT authentication and role-based route protection for users and admins",
      "Built responsive booking and slot-management views in React and Tailwind CSS",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Spring Boot",
      "MySQL",
      "JWT Auth",
      "REST API",
    ],
  },
  {
    id: "fuel-quota",
    title: "Fuel Quota Management System",
    category: "Spring Boot",
    stackSummary: "Web & Mobile · Spring Boot, React & React Native",
    icon: FiZap,
    iconColor: "#d97706",
    image: "/images/fuel_quota.png",
    github: "https://github.com/Thushakaran/Fuel-Quota-Management-System",
    summary:
      "Cross-platform fuel distribution system enabling QR-based vehicle quota verification for stations alongside centralized admin quota tracking.",
    highlights: [
      "Built QR code generation and mobile scanning workflows connecting React Native and Spring Boot",
      "Enforced weekly vehicle quota limits and transaction logging in MySQL",
      "Delivered a web dashboard for fuel station operators and administrators",
    ],
    technologies: [
      "Spring Boot",
      "React",
      "React Native",
      "MySQL",
      "QR Code",
      "JWT Auth",
    ],
  },
  {
    id: "mern-ecommerce",
    title: "MERN E-Commerce Platform",
    category: "MERN / Node.js",
    stackSummary: "Full-Stack · MongoDB, Express, React & Node.js",
    icon: FiShoppingCart,
    iconColor: "#ea580c",
    image: "/images/mern_ecommerce.png",
    github: "https://github.com/Thushakaran/e-commerce",
    summary:
      "End-to-end online storefront featuring catalog browsing, cart state management, order tracking, and an authenticated admin inventory panel.",
    highlights: [
      "Engineered Express.js REST APIs with Mongoose models for products, users, and orders",
      "Secured user sessions and admin endpoints using stateless JWT authentication",
      "Built a responsive React storefront with dynamic filtering and cart persistence",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "JWT Auth"],
  },
  {
    id: "food-ordering",
    title: "Online Food Ordering System",
    category: "Spring Boot",
    stackSummary: "Full-Stack · Spring Boot, React & MySQL",
    icon: FiCoffee,
    iconColor: "#ca8a04",
    image: "/images/food_ordering.jpg",
    github: "https://github.com/Thushakaran/Online-Food-Ordering-System",
    summary:
      "Restaurant ordering application allowing customers to browse menus, customize orders, and track preparation status in real time.",
    highlights: [
      "Implemented Spring Boot backend services for menu management and order lifecycle updates",
      "Added JWT-secured customer checkout and kitchen/admin order queues",
      "Designed a clean multi-view UI using React and Bootstrap",
    ],
    technologies: ["React", "Spring Boot", "MySQL", "Bootstrap", "JWT Auth"],
  },
  {
    id: "blood-donation",
    title: "Blood Donation Management System",
    category: "PHP & Web",
    stackSummary: "Web App · PHP, JavaScript & MySQL",
    icon: FiDroplet,
    iconColor: "#dc2626",
    image: "/images/blood_donation.png",
    github: "https://github.com/Thushakaran/blood_donation_project",
    summary:
      "Donor registry and blood bank coordination portal matching donor blood types with hospital availability and upcoming donation drives.",
    highlights: [
      "Built server-side PHP handlers for donor registration, blood group search, and request approvals",
      "Structured relational MySQL tables for donors, stock levels, and camp schedules",
      "Created accessible forms and interactive client-side validation in JavaScript",
    ],
    technologies: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-content"
      >
        <h1>My Projects</h1>
        <p className="section-description">
          Selected full-stack and backend projects spanning Spring Boot, Node.js,
          React, and PHP. Select a project to inspect architecture highlights.
        </p>

        <div
          className="project-filters"
          role="tablist"
          aria-label="Filter projects by stack"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`filter-tab ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            const hasImageError = failedImages[project.id];

            return (
              <motion.article
                key={project.id}
                layout
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <button
                  type="button"
                  className="project-image-trigger"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <div className="project-image">
                    {hasImageError ? (
                      <div className="project-image-fallback">
                        <Icon
                          style={{ color: project.iconColor }}
                          aria-hidden="true"
                        />
                        <span>{project.title}</span>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(project.id)}
                      />
                    )}
                    <div className="project-overlay">
                      <span className="project-overlay-label">
                        <FiMaximize2 aria-hidden="true" />
                        Inspect Case Study
                      </span>
                    </div>
                  </div>
                </button>

                <div className="project-content">
                  <p className="project-meta">{project.stackSummary}</p>
                  <h3>
                    <Icon
                      style={{ color: project.iconColor, flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    <span>{project.title}</span>
                  </h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-tech-line">
                    {project.technologies.join(" · ")}
                  </p>
                  <div className="project-actions">
                    <button
                      type="button"
                      className="project-action-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      <FiMaximize2 aria-hidden="true" />
                      Case Study
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-link"
                    >
                      <FiGithub aria-hidden="true" />
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="project-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <FiX />
              </button>

              <div className="project-modal-media">
                {failedImages[selectedProject.id] ? (
                  <div className="project-image-fallback">
                    <selectedProject.icon
                      style={{ color: selectedProject.iconColor }}
                      aria-hidden="true"
                    />
                    <span>{selectedProject.title}</span>
                  </div>
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(selectedProject.id)}
                  />
                )}
              </div>

              <div className="project-modal-body">
                <p className="project-meta">{selectedProject.stackSummary}</p>
                <h2 id="project-modal-title">{selectedProject.title}</h2>
                <p className="project-modal-summary">
                  {selectedProject.summary}
                </p>

                <div className="project-modal-section">
                  <h3>Key Engineering Highlights</h3>
                  <ul className="project-highlights-list">
                    {selectedProject.highlights.map((highlight) => (
                      <li key={highlight}>
                        <FiCheckCircle aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-modal-section">
                  <h3>Technologies Used</h3>
                  <div className="skill-tags">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="skill-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-modal-footer">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FiGithub aria-hidden="true" />
                    View Repository on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
