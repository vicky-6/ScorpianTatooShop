// CustomNavbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 2000;
          transition: background 0.35s ease, box-shadow 0.35s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-inner {
          width: 100%;
          max-width: 1200px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
        }
        .nav-soft {
          background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .nav-dark {
          background: #111;
          box-shadow: 0 6px 18px rgba(0,0,0,0.35);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
        }
        .brand .logo {
          font-size: 20px;
        }
        .brand .name {
          font-weight: 700;
          font-size: 18px;
          background: linear-gradient(45deg, #ff0057, #ff7b00, #00c3ff, #9c4dff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: _brandMove 6s ease infinite;
        }
        @keyframes _brandMove {
          0%{ background-position: 0% 50%}
          50%{ background-position:100% 50%}
          100%{ background-position:0% 50%}
        }

        .nav-links {
          display: flex;
          gap: 22px;
          align-items: center;
        }
        .nav-links a {
          text-decoration: none;
          color: #111;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.25s, transform 0.25s;
        }
        .nav-dark .nav-links a { color: #ddd; }
        .nav-links a:hover { color: #ff0057; transform: translateY(-2px); }

        /* Hamburger (mobile) */
        .hamburger {
          display: none;
          width: 28px;
          height: 20px;
          position: relative;
          cursor: pointer;
        }
        .hamburger span {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: #111;
          border-radius: 3px;
          transition: transform 0.25s, opacity 0.25s, background 0.25s;
        }
        .nav-dark .hamburger span { background: #fff; }
        .hamburger span:nth-child(1) { top: 0; }
        .hamburger span:nth-child(2) { top: 8.5px; }
        .hamburger span:nth-child(3) { top: 17px; }

        .hamburger.open span:nth-child(1) {
          transform: translateY(8.5px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-8.5px) rotate(-45deg);
        }

        /* Drawer */
        .drawer {
          position: fixed;
          top: 0;
          right: -320px;
          width: 320px;
          height: 100vh;
          background: #111;
          color: #fff;
          padding: 84px 20px 20px 20px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.5);
          transition: right 0.36s cubic-bezier(.2,.9,.3,1);
          z-index: 2100;
        }
        .drawer.open { right: 0; }
        .drawer .link { display:block; margin: 14px 0; color: #ddd; text-decoration:none; font-weight:600; }
        .drawer .link:hover { color: #ff7b00; }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 2050;
          opacity: 0;
          transition: opacity 0.25s;
        }

        /* Responsive rules */
        @media (max-width: 992px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
        }

        /* Prevent body scroll when drawer open */
        body.no-scroll { overflow: hidden; }
      `}</style>

      <div className={`nav-root ${scrolled ? "nav-dark" : "nav-soft"}`}>
        <div className="nav-inner">
          <Link to="/" className="brand" onClick={() => setIsOpen(false)}>
            <span className="logo">🦂</span>
            <span className="name">Scorpian Tattoo Studio</span>
          </Link>

          {/* desktop links */}
          <div className="nav-links" aria-hidden={isOpen}>
            <Link to="/">Home</Link>
            <Link to="/appointment">Appointment</Link>
            <Link to="/academy">Academy</Link>
            <Link to="/prices">Prices</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          {/* hamburger */}
          <div
            role="button"
            aria-label="Toggle menu"
            tabIndex={0}
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => {
              setIsOpen((v) => {
                const next = !v;
                document.body.classList.toggle("no-scroll", next);
                return next;
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsOpen((v) => {
                  const next = !v;
                  document.body.classList.toggle("no-scroll", next);
                  return next;
                });
              }
            }}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <Link to="/" className="link" onClick={() => { setIsOpen(false); document.body.classList.remove("no-scroll"); }}>Home</Link>
        <Link to="/appointment" className="link" onClick={() => { setIsOpen(false); document.body.classList.remove("no-scroll"); }}>Appointment</Link>
        <Link to="/academy" className="link" onClick={() => { setIsOpen(false); document.body.classList.remove("no-scroll"); }}>Academy</Link>
        <Link to="/prices" className="link" onClick={() => { setIsOpen(false); document.body.classList.remove("no-scroll"); }}>Prices</Link>
        <Link to="/contact" className="link" onClick={() => { setIsOpen(false); document.body.classList.remove("no-scroll"); }}>Contact Us</Link>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="overlay"
          onClick={() => {
            setIsOpen(false);
            document.body.classList.remove("no-scroll");
          }}
        />
      )}
    </>
  );
};

export default CustomNavbar;
