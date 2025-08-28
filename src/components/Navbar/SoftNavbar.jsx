import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const CustomNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.9)"
          : "linear-gradient(90deg, #FF512F, #DD2476)",
        transition: "all 0.4s ease-in-out",
        boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.15)" : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            color: scrolled ? "#111" : "#fff",
            transition: "color 0.3s ease, text-shadow 0.3s ease",
            textShadow: scrolled ? "none" : "0px 2px 6px rgba(0,0,0,0.4)",
            letterSpacing: "1px",
          }}
        >
          🦂 Scorpian Tattoo Studio
        </Navbar.Brand>

        {/* Hamburger Toggle (mobile) */}
        <button
          onClick={() => setMenuOpen(true)}
          className="d-lg-none border-0 bg-transparent"
          style={{ fontSize: "1.8rem", color: scrolled ? "#111" : "#fff" }}
        >
          <FaBars />
        </button>

        {/* Desktop Menu */}
        <Nav
          className="ms-auto d-none d-lg-flex"
          style={{ fontWeight: "500" }}
        >
          <Nav.Link as={Link} to="/" style={{ color: scrolled ? "#111" : "#fff" }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/appointment" style={{ color: scrolled ? "#111" : "#fff" }}>
            Appointment
          </Nav.Link>
          <Nav.Link as={Link} to="/academy" style={{ color: scrolled ? "#111" : "#fff" }}>
            Academy
          </Nav.Link>
          <Nav.Link as={Link} to="/prices" style={{ color: scrolled ? "#111" : "#fff" }}>
            Prices
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" style={{ color: scrolled ? "#111" : "#fff" }}>
            Contact Us
          </Nav.Link>
        </Nav>

        {/* Mobile Slide Menu + Overlay */}
        {menuOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 9998,
              }}
            />

            {/* Side menu */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "70%",
                maxWidth: "300px",
                background: "#111",
                transition: "right 0.3s ease-in-out",
                zIndex: 9999,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
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
                  alignSelf: "flex-start",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>

              {/* Mobile Nav Links */}
              <Nav className="flex-column text-start mt-0 ps-2">
                <Nav.Link as={Link} to="/" onClick={() => setMenuOpen(false)} className="text-white">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/appointment" onClick={() => setMenuOpen(false)} className="text-white">
                  Appointment
                </Nav.Link>
                <Nav.Link as={Link} to="/academy" onClick={() => setMenuOpen(false)} className="text-white">
                  Academy
                </Nav.Link>
                <Nav.Link as={Link} to="/prices" onClick={() => setMenuOpen(false)} className="text-white">
                  Prices
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" onClick={() => setMenuOpen(false)} className="text-white">
                  Contact Us
                </Nav.Link>
              </Nav>
            </div>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
