import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

// Floating animation for cards
const float = keyframes`
  0%, 100% { transform: translateY(0px);}
  50% { transform: translateY(-12px);}
`;

// Fade in from bottom
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(30px);}
  100% { opacity: 1; transform: translateY(0);}
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

// Floating particle animation
const floatParticle = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0.6; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
  100% { transform: translateY(0) translateX(0); opacity: 0.6; }
`;

// Styled Components
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

const Particle = styled.div`
  position: absolute;
  width: ${(props) => props.size || "6px"};
  height: ${(props) => props.size || "6px"};
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  top: ${(props) => props.top || "50%"};
  left: ${(props) => props.left || "50%"};
  animation: ${floatParticle} ${(props) => props.duration || "6s"} ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
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
  animation: ${fadeInUp} 1s ease forwards;
  position: relative;
  z-index: 2;
`;

const ContactGrid = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
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
  animation: ${float} 3s ease-in-out infinite, ${fadeInUp} 1s ease forwards;

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

// Scroll animation hook
const useScrollAnimation = (ref) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.style.opacity = 1;
          ref.current.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
  }, [ref]);
};

const ContactUs = () => {
  const gridRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useScrollAnimation(gridRef);

  // Generate multiple particles
  const particles = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 6 + 4,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();

        // Draw line to mouse if close
        if (mouse.current.x && mouse.current.y) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 150})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
          }
        }
      });

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particles]);

  return (
    <ContactSection>
      {/* Canvas for connecting lines and interactive effect */}
      <Canvas ref={canvasRef} />

      {/* Floating particles */}
      {particles.map((p, index) => (
        <Particle
          key={index}
          size={`${p.size}px`}
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          duration={`${Math.random() * 6 + 4}s`}
          delay={`${Math.random() * 5}s`}
        />
      ))}

      <Title>Contact Us</Title>

      <ContactGrid
        ref={gridRef}
        style={{ opacity: 0, transform: "translateY(50px)", transition: "all 0.8s ease" }}
      >
        <ContactCard
          href="https://wa.me/your_number"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
          WhatsApp
        </ContactCard>

        <ContactCard
          href="https://instagram.com/your_username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
          Instagram
        </ContactCard>

        <ContactCard
          href="mailto:youremail@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope />
          Email
        </ContactCard>

        <ContactCard href="tel:+1234567890">
          <FaPhone />
          Call
        </ContactCard>
      </ContactGrid>
    </ContactSection>
  );
};

export default ContactUs;
