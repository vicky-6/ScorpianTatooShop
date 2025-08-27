import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const CustomNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        background: menuOpen ? "#000" : "white",
        transition: "0.3s ease-in-out",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
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
          🦂 Scorpian Tattoo Studio
        </Navbar.Brand>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="d-lg-none border-0 bg-transparent"
          style={{ fontSize: "1.8rem" }}
        >
          <FaBars color="black" />
        </button>

        {/* Desktop Menu */}
        <Nav className="ms-auto d-none d-lg-flex">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/appointment">Appointment</Nav.Link>
          <Nav.Link as={Link} to="/academy">Academy</Nav.Link>
          <Nav.Link as={Link} to="/prices">Prices</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
        </Nav>

        {/* Mobile Slide Menu & Overlay */}
        {menuOpen && (
          <>
            {/* Overlay for clicking outside to close */}
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
              className="mobile-menu"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "70%",
                maxWidth: "300px",
                background: "#000",
                transition: "right 0.3s ease-in-out",
                zIndex: 9999,
                padding: "1rem",
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

              {/* Menu Links */}
              <Nav className="flex-column text-start mt-0 ps-3">
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-white"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/appointment"
                  onClick={() => setMenuOpen(false)}
                  className="text-white"
                >
                  Appointment
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/academy"
                  onClick={() => setMenuOpen(false)}
                  className="text-white"
                >
                  Academy
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/prices"
                  onClick={() => setMenuOpen(false)}
                  className="text-white"
                >
                  Prices
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="text-white"
                >
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