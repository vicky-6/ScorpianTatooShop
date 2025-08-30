import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Animations
const fadeInLeft = keyframes`
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const zoomInTilt = keyframes`
  0% { opacity: 0; transform: scale(0.8) rotate(-3deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
`;

const particleMove = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0.8; }
  50% { transform: translateY(-30px) translateX(15px); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0); opacity: 0.8; }
`;

// Styled Components
const BackgroundWrapper = styled.div`
  width: 100%;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  background-color: #a15757ff;
`;

const TextCol = styled(Col)`
  padding: 1rem 3rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  h5 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #000;
    font-weight: bold;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #000;
  }
  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #000;
    font-weight: bold;
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledImage = styled(Image)`
  max-width: 400px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease, box-shadow 0.5s ease;

  &:hover {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }
`;

const Particle = styled.div`
  position: absolute;
  width: ${(props) => props.size || "10px"};
  height: ${(props) => props.size || "10px"};
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  top: ${(props) => props.top || "0"};
  left: ${(props) => props.left || "0"};
  animation: ${particleMove} ${(props) => props.duration || "6s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const CeoTalk = () => {
  return (
    <BackgroundWrapper>
      <Row className="align-items-center flex-wrap-reverse pt-5" style={{ margin: 0 }}>
        {/* Left Text Content */}
        <TextCol md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h5>Hey!</h5>
            <h2>I AM NIRMAL.</h2>
            <p>
              With 15 years of tattooing and business expertise, I helped build
              and grow over 70+ students. In the constantly changing field of
              tattooing, it is my mission to provide you with the skills to master
              the art of tattooing and techniques that will drive your tattooing
              journey and business growth.
            </p>
          </motion.div>
        </TextCol>

        {/* Right Image */}
        <Col
          md={6}
          className="d-flex justify-content-center mb-4 mb-md-0"
          style={{ padding: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <StyledImageWrapper>
              <StyledImage src="/nirmalinsta.JPG" alt="Tattoo Artist" fluid />
              {/* Floating Particles */}
              <Particle top="10%" left="10%" size="8px" duration="5s" delay="0s" />
              <Particle top="30%" left="70%" size="12px" duration="6s" delay="1s" />
              <Particle top="60%" left="50%" size="6px" duration="4s" delay="0.5s" />
              <Particle top="80%" left="20%" size="10px" duration="7s" delay="0.2s" />
            </StyledImageWrapper>
          </motion.div>
        </Col>
      </Row>
    </BackgroundWrapper>
  );
};

export default CeoTalk;
