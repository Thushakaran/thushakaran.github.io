import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiDatabase, FiTool, FiLayers } from "react-icons/fi";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillsData = [
    {
      icon: FiCode,
      title: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
    },
    {
      icon: FiDatabase,
      title: "Backend",
      skills: [
        "Java",
        "Spring Boot",
        "Node.js",
        "Express",
        "MySQL",
        "PHP",
        "MongoDB",
      ],
    },
    {
      icon: FiLayers,
      title: "Enterprise & Workflow",
      skills: [
        "JobRouter",
        "Workflow Automation",
        "Business Process Management (BPM)",
        "Form Design",
        "JobRouter PHP",
        "Database Integration",
      ],
    },
    {
      icon: FiTool,
      title: "Tools & IDEs",
      skills: ["GitHub", "Postman", "IntelliJ", "VS Code"],
    },
  ];

  return (
    <section id="skills" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        <h1>Technical Skills</h1>
        <div className="skills-grid">
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ perspective: 1000 }}
              >
                <div className="skill-icon">
                  <Icon />
                </div>
                <h3>{category.title}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.2 + skillIndex * 0.1,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
