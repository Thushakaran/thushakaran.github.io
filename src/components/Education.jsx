import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBookOpen, FiMonitor, FiBook } from "react-icons/fi";

const EDUCATION_DATA = [
  {
    icon: FiBookOpen,
    title: "B.Sc. (Hons) in Software Engineering",
    institution: "University of Kelaniya",
    details: "Current GPA: 3.2938",
    gradient: "linear-gradient(135deg, #4f46e5, #9333ea)",
  },
  {
    icon: FiMonitor,
    title: "Diploma in Information Technology",
    institution: "ESOFT Metro Campus",
    details: "Foundational software development, databases, and IT systems",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
  {
    icon: FiBook,
    title: "G.C.E. Advanced Level Examination - 2021",
    institution: "Jaffna College",
    details:
      "Combined Mathematics: A · Physics: B · Chemistry: B · Z-Score: 1.6422",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
  },
];

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-content"
      >
        <h1>Education</h1>
        <div className="education-grid">
          {EDUCATION_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="education-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <div
                  className="education-icon"
                  style={{ background: item.gradient }}
                >
                  <Icon aria-hidden="true" />
                </div>
                <div className="education-content">
                  <h3>{item.title}</h3>
                  <p className="institution">{item.institution}</p>
                  {item.details && (
                    <p className="details tabular-nums">{item.details}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
