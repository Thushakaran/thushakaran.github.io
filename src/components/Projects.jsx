import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiZap,
  FiShoppingCart,
  FiCoffee,
  FiDroplet,
} from "react-icons/fi";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectsData = [
    {
      title: "Online Application Booking System",
      icon: FiCalendar,
      iconColor: "#667eea",
      image: "/images/online_application_booking.png",
      github:
        "https://github.com/Thushakaran/online_appointment_booking_system",
      demo: "#",
      technologies: [
        "React",
        "Tailwind CSS",
        "Spring Boot",
        "MySQL",
        "JWT Auth",
        "REST API",
      ],
      fallbackImage:
        "https://via.placeholder.com/400x250/667eea/ffffff?text=Booking+System",
    },
    {
      title: "Fuel Quota Management System",
      icon: FiZap,
      iconColor: "#ff9800",
      image: "/images/fuel_quota.png",
      github: "https://github.com/Thushakaran/Fuel-Quota-Management-System",
      demo: "#",
      technologies: [
        "Spring Boot",
        "React",
        "React Native",
        "MySQL",
        "QR Code",
        "JWT Auth",
      ],
      fallbackImage:
        "https://via.placeholder.com/400x250/ff9800/ffffff?text=Fuel+Quota",
    },
    {
      title: "MERN E-Commerce Project",
      icon: FiShoppingCart,
      iconColor: "#f7a93c",
      image: "/images/mern_ecommerce.png",
      github: "https://github.com/Thushakaran/e-commerce",
      demo: "#",
      technologies: ["MongoDB", "Express", "React", "Node.js", "JWT Auth"],
      fallbackImage:
        "https://via.placeholder.com/400x250/f7a93c/ffffff?text=E-Commerce",
    },
    {
      title: "Online Food Ordering System",
      icon: FiCoffee,
      iconColor: "#f4d212",
      image: "/images/food_ordering.jpg",
      github: "https://github.com/Thushakaran/Online-Food-Ordering-System",
      demo: "#",
      technologies: ["React", "Spring Boot", "MySQL", "Bootstrap", "JWT Auth"],
      fallbackImage:
        "https://via.placeholder.com/400x250/f4d212/ffffff?text=Food+Ordering",
    },
    {
      title: "Blood Donation System",
      icon: FiDroplet,
      iconColor: "#d30707",
      image: "/images/blood_donation.png",
      github: "https://github.com/Thushakaran/blood_donation_project",
      demo: "#",
      technologies: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
      fallbackImage:
        "https://via.placeholder.com/400x250/d30707/ffffff?text=Blood+Donation",
    },
  ];

  return (
    <section id="projects" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        <h1>My Projects</h1>
        <div className="projects-grid">
          {projectsData.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ perspective: 1000 }}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.target.src = project.fallbackImage;
                    }}
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub />
                      </a>
                      <a
                        href={project.demo}
                        className="project-link"
                        title="Live Demo Coming Soon"
                      >
                        <FiExternalLink />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3>
                    <Icon
                      style={{ marginRight: "10px", color: project.iconColor }}
                    />
                    {project.title}
                  </h3>
                  <div className="tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
