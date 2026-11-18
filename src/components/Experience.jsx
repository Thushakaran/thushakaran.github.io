import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const EXPERIENCE_DATA = [
  {
    company: "CODE BASYS (PVT) LTD",
    location: "Jaffna, Sri Lanka",
    roles: [
      {
        title: "Associate Software Engineer",
        period: "May 2026 - Present",
        description:
          "Developing and maintaining production software solutions with Core PHP and JavaScript, taking ownership of end-to-end feature delivery, database integrations, and complex enterprise workflow automation on the JobRouter platform.",
        highlights: [
          "Architecting multi-step approval workflows and custom form logic in JobRouter",
          "Building database-backed integrations and modular Core PHP backend scripts",
          "Collaborating across engineering sprints to deliver reliable production releases",
        ],
      },
      {
        title: "Intern Software Engineer",
        period: "Nov 2025 - Apr 2026",
        description:
          "Gained hands-on industry experience building software features with Core PHP and JavaScript while integrating automated business process solutions using JobRouter.",
        highlights: [
          "Implemented interactive client-side validation and dynamic workflow forms",
          "Configured JobRouter process steps, routing rules, and SQL data bindings",
        ],
      },
    ],
    gradient: "linear-gradient(135deg, #4f46e5, #06b6d4)",
  },
];

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-content"
      >
        <h1>Experience</h1>
        <div className="experience-container">
          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="experience-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="experience-top">
                <div
                  className="experience-icon"
                  style={{ background: exp.gradient }}
                >
                  <FiBriefcase aria-hidden="true" />
                </div>
                <div className="experience-header">
                  <h2>{exp.company}</h2>
                  <div className="experience-location">
                    <FiMapPin aria-hidden="true" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="experience-roles">
                {exp.roles.map((role) => (
                  <div className="role-item" key={role.title}>
                    <div className="role-timeline-dot" aria-hidden="true" />
                    <div className="role-heading-row">
                      <h3 className="role-title">{role.title}</h3>
                      <div className="role-period">
                        <FiCalendar aria-hidden="true" />
                        <span>{role.period}</span>
                      </div>
                    </div>
                    <p className="role-description">{role.description}</p>
                    {role.highlights && (
                      <ul className="role-highlights">
                        {role.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
