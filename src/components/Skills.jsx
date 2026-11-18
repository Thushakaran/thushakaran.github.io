import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCode, FiDatabase, FiTool, FiLayers } from "react-icons/fi";

const SKILLS_DATA = [
  {
    icon: FiCode,
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Redux",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    icon: FiDatabase,
    title: "Backend & Databases",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "PHP",
      "MySQL",
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
    skills: ["Git & GitHub", "Postman", "IntelliJ IDEA", "VS Code"],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-content"
      >
        <h1>Technical Skills</h1>
        <p className="section-description">
          Core technologies, backend frameworks, and enterprise automation tools
          I use to build scalable software.
        </p>
        <div className="skills-grid">
          {SKILLS_DATA.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="skill-header">
                  <div className="skill-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{category.title}</h3>
                </div>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
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
