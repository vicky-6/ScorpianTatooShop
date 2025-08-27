import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const HomeHeroSection = () => {
  const images = [
    "/HeroImage.png",
    "/tattoo2.jpg",
    "/tattoo3.jpg",
    "/tattoo4.jpg",
    "/tattoo1.jpg",
//     "/HeroImage.png",
//     "/HeroImage.png",
//     "/HeroImage.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Determine if it's mobile
  const isMobile = windowWidth < 768;

  const styles = {
    heroSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "70px 15px" : "70px 60px",
      minHeight: "100vh",
      backgroundColor: "#fff",
      overflow: "hidden",
      flexDirection: isMobile ? "column" : "row",
      textAlign: isMobile ? "center" : "left",
    },
    left: {
      flex: isMobile ? "1 1 auto" : "0 0 70%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: isMobile ? "20px" : 0,
      width: isMobile ? "100%" : "auto",
    },
    imageWrapper: {
      position: "relative",
      width: isMobile ? "100%" : "500px",
      height: isMobile ? "auto" : "500px",
      aspectRatio: isMobile ? "3/4" : "auto", // keeps proportion on mobile
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "16px",
      opacity: 0,
      transform: "rotateY(90deg)",
      transition: "opacity 1s ease, transform 1s ease",
    },
    imageActive: {
      opacity: 1,
      transform: "rotateY(0deg)",
    },
    right: {
      flex: isMobile ? "1 1 auto" : "0 0 30%",
      paddingLeft: isMobile ? "0" : "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: isMobile ? "center" : "left",
      width: isMobile ? "100%" : "auto",
    },
    heading: {
      fontSize: isMobile ? "1.6rem" : "2.2rem",
      fontWeight: "700",
      marginBottom: "15px",
      color: "#000",
    },
    description: {
      fontSize: isMobile ? "0.95rem" : "1rem",
      lineHeight: "1.6",
      marginBottom: "20px",
      color: "#444",
      padding: isMobile ? "0 10px" : "0",
    },
    button: {
      padding: "12px 28px",
      fontSize: "1rem",
      fontWeight: "600",
      background: "linear-gradient(90deg, #ff0057, #ff7e00)",
      border: "none",
      borderRadius: "6px",
      color: "#fff",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: isMobile ? "100%" : "fit-content",
      alignSelf: isMobile ? "center" : "flex-start",
    },
  };

  return (
    <section style={styles.heroSection}>
      {/* Left Side - Rotating Single Image */}
      <div style={styles.left}>
        <div style={styles.imageWrapper}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`tattoo-${i}`}
              style={{
                ...styles.image,
                ...(i === currentIndex ? styles.imageActive : {}),
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Content */}
      <div style={styles.right}>
        <h2 style={styles.heading}>Crafting Your Dream Tattoo, Your Way</h2>
        <p style={styles.description}>
          Transform your ideas into timeless tattoos. Free consultation, expert artistry, personalised just for you.
        </p>
        <Button
          style={styles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #ff7e00, #ff0057)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #ff0057, #ff7e00)")
          }
        >
          BOOK CONSULTATION – IT’S FREE
        </Button>
      </div>
    </section>
  );
};

export default HomeHeroSection;
