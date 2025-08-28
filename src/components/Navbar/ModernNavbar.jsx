import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react"; // modern icons

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const NavbarModern = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop / Tablet Navbar */}
      <Navbar expand="lg" className="py-3 shadow-sm bg-white sticky-top">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Logo */}
          <motion.a
            href="#"
            className="fw-bold fs-4 text-dark text-decoration-none"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            WaveyVig
          </motion.a>

          {/* Desktop Links */}
          <Nav className="d-none d-lg-flex gap-4">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-dark text-decoration-none fw-medium position-relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                style={{ cursor: "pointer" }}
              >
                {link.name}
                <motion.span
                  className="position-absolute start-0 bottom-0 w-100"
                  style={{ height: "2px", background: "#000" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </Nav>

          {/* Mobile Menu Toggle */}
          <div className="d-lg-none">
            <Menu size={28} onClick={() => setMenuOpen(true)} style={{ cursor: "pointer" }} />
          </div>
        </Container>
      </Navbar>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg p-4"
            style={{ width: "75%", zIndex: 1050 }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            {/* Close Button */}
            <div className="d-flex justify-content-end mb-4">
              <X size={28} onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }} />
            </div>

            {/* Links */}
            <Nav className="flex-column gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-dark text-decoration-none fw-semibold fs-5"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </Nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarModern;
