import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomNavbar.css";

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className="custom-navbar"
      fixed="top"
    >
      <Container>
        {/* Logo + Name */}
        <Navbar.Brand as={Link} to="/" className="brand-text">
          🦂 <span className="brand-name">Scorpian Tattoo Studio</span>
        </Navbar.Brand>

        {/* Toggle button */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/appointment"
              onClick={() => setExpanded(false)}
            >
              Appointment
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/academy"
              onClick={() => setExpanded(false)}
            >
              Academy
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/prices"
              onClick={() => setExpanded(false)}
            >
              Prices
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              onClick={() => setExpanded(false)}
            >
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;