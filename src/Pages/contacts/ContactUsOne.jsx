import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

// Floating animation for cards
const float = keyframes`
  0%, 100% { transform: translateY(0px);}
  50% { transform: translateY(-12px);}
`;

// Fade in & spread from center
const spreadIn = keyframes`
  0% { opacity: 0; transform: scale(0.5) translateY(40px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

// Ripple effect on click
const ripple = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

// Glow/pulse effect for icons
const glowPulse = keyframes`
  0% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #4a90e2;}
  50% { text-shadow: 0 0 15px #fff, 0 0 30px #4a90e2, 0 0 50px #4a90e2;}
  100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #4a90e2;}
`;

// Animated gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ContactSection = styled.section`
  position: relative;
  padding: 120px 20px;
  text-align: center;
  color: #fff;
  overflow: hidden;
  background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6a00, #ff007a);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 60px;
  color: #fff;
  position: relative;
  z-index: 2;
`;

const ContactGrid = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: nowrap;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const ContactCard = styled.a`
  position: relative;
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
  width: 140px;
  height: 140px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  animation: ${spreadIn} 0.8s ease forwards, ${float} 3s ease-in-out infinite;
  opacity: 0;

  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
  &:nth-child(4) {
    animation-delay: 0.8s;
  }

  &:hover {
    transform: translateY(-15px) scale(1.15);
    box-shadow: 0 25px 50px rgba(255,255,255,0.6);
  }

  svg {
    font-size: 2.8rem;
    margin-bottom: 12px;
    transition: all 0.3s ease;
  }

  &:hover svg {
    animation: ${glowPulse} 1.5s infinite;
  }

  &:active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.2);
    border-radius: 25px;
    animation: ${ripple} 0.6s linear;
  }
`;

const ContactUs = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 6 + 4,
      color: "rgba(255,255,255,0.7)",
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ContactSection>
      <Canvas ref={canvasRef} />
      <Title>Contact Us</Title>

      <ContactGrid>
        <ContactCard href="https://wa.me/8248429488" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
          WhatsApp
        </ContactCard>

        <ContactCard href="https://instagram.com/vignesh_s_06" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
          Instagram
        </ContactCard>

        <ContactCard href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
          <FaMapMarkerAlt />
          Location
        </ContactCard>

        <ContactCard href="tel:+918248429488">
          <FaPhone />
          Call
        </ContactCard>
      </ContactGrid>
    </ContactSection>
  );
};

export default ContactUs;
