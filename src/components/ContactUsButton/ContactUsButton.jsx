import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaCommentDots } from "react-icons/fa";

const ContactUsButton = () => {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  // Detect screen size change
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on click outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".contact-container") && !isDesktop) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDesktop]);

  const styles = {
    container: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      zIndex: 9999,
    },
    mainButton: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#ff0057",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      transition: "transform 0.3s",
      fontSize: "1.5rem",
    },
    subButton: (index) => ({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#ff7b00",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
      cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      transform: open ? `translateY(0)` : `translateY(20px)`,
      opacity: open ? 1 : 0,
      transition: `all 0.3s ${0.05 * index}s ease`,
      fontSize: "1.2rem",
    }),
  };

  // Event handlers
  const handleMouseEnter = () => {
    if (isDesktop) setOpen(true);
  };
  const handleMouseLeave = () => {
    if (isDesktop) setOpen(false);
  };
  const handleClick = () => {
    if (!isDesktop) setOpen(!open);
  };

  return (
    <div
      className="contact-container"
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()} // prevent outside click close
    >
      {/* Sub Buttons */}
      <a
        href="https://wa.me/8248429488"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.subButton(0)}
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://www.instagram.com/vignesh_s_06/"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.subButton(1)}
      >
        <FaInstagram />
      </a>
      <a href="tel:+918248429488" style={styles.subButton(2)}>
        <FaPhoneAlt />
      </a>

      {/* Main Button */}
      <div style={styles.mainButton} onClick={handleClick}>
        <FaCommentDots />
      </div>
    </div>
  );
};

export default ContactUsButton;
