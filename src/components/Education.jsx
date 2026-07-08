import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiBookOpen, FiMonitor, FiBook } from "react-icons/fi";

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const educationData = [
    {
      icon: FiBookOpen,
      title: "B.Sc. (Hons) in Software Engineering",
      institution: "University of Kelaniya",
      details: "Current GPA: 3.2938",
      gradient: "linear-gradient(135deg, #b16cea, #ff5e69)",
    },
    {
      icon: FiMonitor,
      title: "Diploma in Information Technology",
      institution: "ESOFT",
      details: "",
      gradient: "linear-gradient(135deg, #13f1fc, #0470dc)",
    },
    {
      icon: FiBook,
      title: "G.C.E. Advanced Level Examination - 2021",
      institution: "Jaffna College",
      details:
        "Combined Mathematics - A | Physics - B | Chemistry - B | Z-Score: 1.6422",
      gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
  ];

  return (
    <section id="education" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-content"
      >
        <h1>Education</h1>
        <div className="education-grid">
          {educationData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{ perspective: 1000 }}
              >
                <div
                  className="education-icon"
                  style={{ background: item.gradient }}
                >
                  <Icon />
                </div>
                <div className="education-content">
                  <h3>{item.title}</h3>
                  <p className="institution">{item.institution}</p>
                  {item.details && <p className="details">{item.details}</p>}
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
