import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const HomeHeroSection = () => {
  const images = [
    "/images/tattoo-0.jpg",
    "/images/tattoo-1.jpg",
    "/images/tattoo-2.jpg",
    "/images/tattoo-3.jpg",
    "/images/tattoo-4.jpg",
    "/images/tattoo-5.jpg",
    "/images/tattoo-6.jpg",
    "/images/tattoo-7.jpg",
  ];

  useEffect(() => {
    const cards = document.querySelectorAll(".tattoo-card");
    let angle = 0;

    const rotate = () => {
      cards.forEach((card, i) => {
        const theta = (360 / cards.length) * i + angle;
        const rad = (theta * Math.PI) / 180;
        const x = Math.cos(rad) * 250;
        const y = Math.sin(rad) * 250;
        card.style.transform = `translate(${x}px, ${y}px) rotateY(${theta}deg)`;
      });
      angle += 0.4; // speed
      requestAnimationFrame(rotate);
    };

    rotate();
  }, []);

  const styles = {
    heroSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "50px 80px",
      minHeight: "100vh",
      backgroundColor: "#fff",
      overflow: "hidden",
    },
    left: {
      flex: "0 0 70%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      perspective: "1200px",
    },
    carousel: {
      position: "relative",
      width: "500px",
      height: "500px",
      transformStyle: "preserve-3d",
    },
    imageCard: {
      position: "absolute",
      top: "50%",
      left: "30%",
      width: "240px",
      height: "380px",
      transform: "translate(-50%, -50%)",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      objectFit: "cover",
      transition: "transform 0.6s ease",
    },
    right: {
      flex: "0 0 30%",
      paddingLeft: "40px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#000",
    },
    description: {
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "25px",
      color: "#444",
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
    },
  };

  return (
    <section style={styles.heroSection}>
      {/* Left Side - 360° Scroll Carousel */}
      <div style={styles.left}>
        <div style={styles.carousel}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`tattoo-${i}`}
              className="tattoo-card"
              style={styles.imageCard}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Content */}
      <div style={styles.right}>
        <h2 style={styles.heading}>Get Your Dream Tattoo Personalised</h2>
        <p style={styles.description}>
          Transform your concept into art with a free tattoo consultation. Let
          our skilled artists craft a personalised tattoo for you!
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