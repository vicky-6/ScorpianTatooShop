import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaGraduationCap,
  FaMicrochip,
  FaCertificate,
  FaCreditCard,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaGraduationCap size={40} color="#f39c12" />,
    title: "Complete Learning Experience",
    text: "Our tattoo courses combine hands-on practice with in-depth theory, ensuring you master every aspect of tattoo artistry from fundamentals to advanced.",
  },
  {
    icon: <FaMicrochip size={40} color="#f39c12" />,
    title: "Expert Mentors",
    text: "Learn directly from award-winning tattoo artists with years of real-world experience, guiding you with proven techniques and insider knowledge.",
  },
  {
    icon: <FaCertificate size={40} color="#f39c12" />,
    title: "Recognized Certification",
    text: "Earn a globally recognized tattoo certification that sets you apart and opens doors worldwide.",
  },
  {
    icon: <FaCreditCard size={40} color="#f39c12" />,
    title: "Easy Payment Options",
    text: "With flexible EMI and installment plans, we make world-class tattoo education affordable and accessible for everyone.",
  },
  {
    icon: <FaShieldAlt size={40} color="#f39c12" />,
    title: "Hygiene & Safety First",
    text: "We follow strict international hygiene standards, providing a clean, secure, and professional learning environment.",
  },
  {
    icon: <FaGlobe size={40} color="#f39c12" />,
    title: "Convention Opportunities",
    text: "Get opportunities for sponsorship at international conventions, helping you build networks and showcase your art globally.",
  },
];

const Features = () => {
  return (
    <section style={{ padding: "80px 0", backgroundColor: "#f0f0f0" }}>
      <Container>
        <Row className="gy-5">
          {features.map((feature, index) => (
            <Col
              key={index}
              lg={4}
              md={6}
              sm={12}
              className="text-center d-flex flex-column align-items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false, amount: 0.3 }} 
              >
                <div className="mb-3">{feature.icon}</div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p style={{ color: "#555", fontSize: "15px" }}>{feature.text}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
