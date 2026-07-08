import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experienceData = [
    {
      company: "CODE BASYS (PVT) LTD",
      location: "Jaffna, Sri Lanka",
      roles: [
        {
          title: "Associate Software Engineer",
          period: "May 2026 - Present",
          description:
            "Continuing to develop and maintain software solutions, utilizing Core PHP and JavaScript. Taking on more responsibilities in delivering robust features and automating complex workflows using the JobRouter platform.",
        },
        {
          title: "Intern Software Engineer",
          period: "Nov 2025 - Apr 2026",
          description:
            "Gained hands-on experience in software development with Core PHP and JavaScript. Integrated and developed workflow-based automation solutions using the JobRouter platform.",
        },
      ],
      gradient: "linear-gradient(135deg, #4f46e5, #06b6d4)",
    },
  ];

  return (
    <section id="experience" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        <h1>Experience</h1>
        <div className="experience-container">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.01 }}
              style={{ perspective: 1000 }}
            >
              <div
                className="experience-icon"
                style={{ background: exp.gradient }}
              >
                <FiBriefcase />
              </div>
              <div className="experience-header">
                <h2>{exp.company}</h2>
                <div className="experience-location">
                  <FiMapPin /> {exp.location}
                </div>
              </div>
              
              <div className="experience-roles">
                {exp.roles.map((role, roleIndex) => (
                  <div className="role-item" key={roleIndex}>
                    <div className="role-timeline-dot"></div>
                    <h3 className="role-title">{role.title}</h3>
                    <div className="role-period">
                      <FiCalendar /> {role.period}
                    </div>
                    <p className="role-description">{role.description}</p>
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
