import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiCopy,
  FiCheck,
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiDownload,
} from "react-icons/fi";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldjparr";
const EMAIL_ADDRESS = "thushakarant@gmail.com";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message ||
            "Unable to send message right now. Please email me directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error while sending message. Please email me directly."
      );
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback unavailable
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="section-content"
      >
        <h1>Contact Me</h1>
        <p className="section-description">
          Have a project, backend engineering role, or collaboration in mind?
          Send a message below or reach out directly.
        </p>

        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="form-input"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-input"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your role, project, or question..."
                rows="5"
                className="form-textarea"
                required
                disabled={status === "submitting"}
              />
            </div>

            {status === "success" && (
              <div className="form-feedback form-feedback-success" role="status">
                <FiCheckCircle aria-hidden="true" />
                <span>
                  Thanks for reaching out! Your message has been sent.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="form-feedback form-feedback-error" role="alert">
                <FiAlertCircle aria-hidden="true" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "submitting"}
            >
              <FiSend aria-hidden="true" />
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-item">
              <FiMail className="contact-icon" aria-hidden="true" />
              <div className="contact-item-body">
                <strong>Email</strong>
                <div className="contact-email-row">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="contact-link"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <FiCheck aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <FiPhone className="contact-icon" aria-hidden="true" />
              <div className="contact-item-body">
                <strong>Phone</strong>
                <a href="tel:+94762971306" className="contact-link">
                  +94762971306
                </a>
              </div>
            </div>

            <div className="contact-quick-links">
              <a
                href="https://github.com/Thushakaran"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-quick-link"
              >
                <FiGithub aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/thushakaran/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-quick-link"
              >
                <FiLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a
                href="/resume.pdf"
                download
                className="contact-quick-link"
              >
                <FiDownload aria-hidden="true" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
