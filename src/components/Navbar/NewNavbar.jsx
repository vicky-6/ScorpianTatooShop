import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const HomeHeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg(true); // black after scroll
      } else {
        setNavbarBg(false); // white at top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`shadow-sm ${navbarBg ? "bg-dark" : "bg-white"}`}
      >
        <Container>
          {/* Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              background: "linear-gradient(90deg, #FF512F, #DD2476)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <i>Scorpian Tattoo Studio</i> 
          </Navbar.Brand>

          {/* Hamburger toggle - only visible on mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="d-lg-none border-0 bg-transparent"
            style={{ fontSize: "1.8rem" }}
          >
            <FaBars color={navbarBg ? "white" : "black"} />
          </button>

          {/* Desktop nav */}
          <Nav className="ms-auto d-none d-lg-flex">
            <Nav.Link as={Link} to="/" className={navbarBg ? "text-white" : "text-dark"}>Home</Nav.Link>
            <Nav.Link as={Link} to="/category" className={navbarBg ? "text-white" : "text-dark"}>Tattoo Category</Nav.Link>
            <Nav.Link as={Link} to="/appointment" className={navbarBg ? "text-white" : "text-dark"}>Appointment</Nav.Link>
            <Nav.Link as={Link} to="/academy" className={navbarBg ? "text-white" : "text-dark"}>Academy</Nav.Link>
            <Nav.Link as={Link} to="/prices" className={navbarBg ? "text-white" : "text-dark"}>Prices</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile Slide Drawer */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: menuOpen ? 0 : "-100%",
          height: "100vh",
          width: "70%",
          background: "#000",
          transition: "right 0.3s ease-in-out",
          zIndex: 1050,
          padding: "1rem",
        }}
      >
        {/* X Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "2rem",
            color: "white",
            position: "absolute",
            top: "15px",
            left: "15px",
          }}
        >
          <FaTimes />
        </button>

        {/* Mobile Links */}
        <Nav className="flex-column text-start mt-5 ps-3">
          <Nav.Link as={Link} to="/" onClick={() => setMenuOpen(false)} className="text-white">Home</Nav.Link>
          <Nav.Link as={Link} to="/appointment" onClick={() => setMenuOpen(false)} className="text-white">Appointment</Nav.Link>
          <Nav.Link as={Link} to="/academy" onClick={() => setMenuOpen(false)} className="text-white">Academy</Nav.Link>
          <Nav.Link as={Link} to="/prices" onClick={() => setMenuOpen(false)} className="text-white">Prices</Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={() => setMenuOpen(false)} className="text-white">Contact Us</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default HomeHeroSection;
