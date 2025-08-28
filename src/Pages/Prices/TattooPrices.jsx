import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

// Variants for staggered reveal
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.3 },
  }),
};

const TattooPrices = () => {
  const paragraphs = [
    "It is very hard to predict how much a tattoo will cost – the price always depends on 3 major factors: size of the tattoo, who is your tattoo artist and the complexity of the tattoo i.e details.",
    "At N A Tattoo Studio, we have a team of 9 artists with different pricing and expertise to suit your need. Assuming you want a basic minimal tattoo then you can choose any of our artists but if you are on a budget you can always prefer to choose an artist with 1-3 years of experience who does great basic work, and if you are looking for a super detailed piece then you also have the option to choose an experienced artist (over 5 years of experience).",
    "The quality of equipment remains the same with every artist and only the style of work or experience changes. We charge as per size for small tattoos and as per hours for large tattoos as this is best for the client and artist.",
  ];

  return (
    <Container className="my-5 p-5">
      <Row className="align-items-center">
        {/* Left Image - Only on large screens */}
        <Col lg={6} className="d-none d-lg-block">
          <motion.img
            src="/40removel.jpeg" // Replace with your own image
            alt="Tattoo Studio"
            className="img-fluid rounded-4 shadow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }} // 👈 runs every time
          />
        </Col>

        {/* Right Content */}
        <Col lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }} // 👈 re-triggers
          >
            <h3 className="fw-bold text-center text-lg-start mb-3">
              TATTOO PRICES
            </h3>
            <h5 className="fw-semibold mb-3">How much does a Tattoo Cost?</h5>
          </motion.div>

          {/* Staggered Paragraphs */}
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-muted"
              custom={i}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // 👈 triggers on every scroll
            >
              {text}
            </motion.p>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TattooPrices;
