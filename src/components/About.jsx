import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiBriefcase,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiMail,
  FiLayers,
} from "react-icons/fi";

const BIO_DATA = [
  {
    icon: FiLayers,
    label: "Core Focus",
    value: "Backend APIs & Workflow Automation",
  },
  {
    icon: FiBriefcase,
    label: "Availability",
    value: "Open to Software Engineering Roles",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "Jaffna, Sri Lanka",
  },
  {
    icon: FiBookOpen,
    label: "Degree",
    value: "B.Sc. (Hons) in Software Engineering (Reading)",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+94762971306",
    isLink: true,
    href: "tel:+94762971306",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "thushakarant@gmail.com",
    isLink: true,
    href: "mailto:thushakarant@gmail.com",
  },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-content"
      >
        <h1>About Me</h1>
        <p className="section-description">
          I&apos;m Balasubramaniyam Thushakaran, an Associate Software Engineer
          and B.Sc. (Hons) Software Engineering undergraduate at the University of
          Kelaniya. I design scalable backend services with Spring Boot and
          Node.js, build responsive React interfaces, and automate business
          processes using Core PHP, JavaScript, and JobRouter.
        </p>

        <div className="bio-container">
          <h2 className="section-subtitle">Profile Snapshot</h2>
          <div className="bio-info-grid">
            {BIO_DATA.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="bio-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="bio-icon-wrapper">
                    <Icon className="bio-icon" aria-hidden="true" />
                  </div>
                  <div className="bio-details">
                    <span className="bio-label">{item.label}</span>
                    {item.isLink ? (
                      <a href={item.href} className="bio-value bio-link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="bio-value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
