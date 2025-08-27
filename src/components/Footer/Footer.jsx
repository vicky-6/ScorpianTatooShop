import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const tattooCategories = [
    "Tribal",
    "Portrait",
    "Watercolor",
    "Geometric",
    "Minimalist",
    "Japanese",
    "Blackwork",
    "Realism",
  ];

  const artists = ["Aarav", "Meera", "Karan", "Riya", "Zayn"];

  // State to control which list is open on mobile
  const [openList, setOpenList] = useState(null);

  const toggleList = (listName) => {
    setOpenList(openList === listName ? null : listName);
  };

  // Styles
  const styles = {
    footer: {
      background: "#111",
      color: "#eee",
      padding: "2rem 0",
      marginTop: "2rem",
    },
    footerCol: {
      marginBottom: "1.5rem",
    },
    footerLogo: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#ff0057",
    },
    footerTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      fontWeight: "bold",
      color: "#ff7b00",
      cursor: "pointer",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      transition: "max-height 0.3s ease",
      overflow: "hidden",
    },
    listItem: {
      marginBottom: "0.5rem",
      transition: "color 0.3s",
      cursor: "pointer",
    },
    addressItem: {
      marginBottom: "0.5rem",
    },
    indicator: {
      marginLeft: "0.5rem",
    },
  };

  return (
    <footer style={styles.footer}>
      <Container>
        <Row>
          {/* Logo + Info */}
          <Col
            xs={12}
            lg={4}
            style={styles.footerCol}
          >
            <h5 style={styles.footerLogo}><i class="bi bi-arrow-through-heart"></i> Scorpian Tattoo</h5>

            {/* Mobile: collapsible */}
            <div className="d-lg-none">
              <div
                style={styles.footerTitle}
                onClick={() => toggleList("address")}
              >
                Address & Contact
                <span style={styles.indicator}>
                  {openList === "address" ? "-" : "+"}
                </span>
              </div>
              <ul
                style={{
                  ...styles.list,
                  maxHeight: openList === "address" ? "500px" : "0",
                }}
              >
                <li style={styles.addressItem}>Address: Near ZKM School, Bodinayakanur</li>
                <li style={styles.addressItem}>Contact: +91 82484 29488</li>
                <li style={styles.addressItem}>Timing: Mon-Sat (10am - 8pm)</li>
              </ul>
            </div>

            {/* Desktop: show always */}
            <div className="d-none d-lg-block">
              <p>Address: Near ZKM School, Bodinayakanur</p>
              <p>Contact: +91 82484 29488</p>
              <p>Timing: Mon-Sat (10am - 8pm)</p>
            </div>
          </Col>

          {/* Tattoo Categories */}
          <Col xs={12} lg={4} style={styles.footerCol}>
            <div
              style={styles.footerTitle}
              onClick={() => toggleList("categories")}
              className="d-lg-none"
            >
              Tattoo Categories
              <span style={styles.indicator}>
                {openList === "categories" ? "-" : "+"}
              </span>
            </div>
            <h6 style={{ ...styles.footerTitle, cursor: "default" }} className="d-none d-lg-block">
              Tattoo Categories
            </h6>
            <ul
              style={{
                ...styles.list,
                maxHeight: openList === "categories" ? "500px" : "0",
              }}
              className="d-lg-none"
            >
              {tattooCategories.map((cat, i) => (
                <li
                  key={i}
                  style={styles.listItem}
                  onMouseOver={(e) => (e.target.style.color = "#ff0057")}
                  onMouseOut={(e) => (e.target.style.color = "#eee")}
                >
                  {cat}
                </li>
              ))}
            </ul>
            <ul className="d-none d-lg-block" style={styles.list}>
              {tattooCategories.map((cat, i) => (
                <li
                  key={i}
                  style={styles.listItem}
                  onMouseOver={(e) => (e.target.style.color = "#ff0057")}
                  onMouseOut={(e) => (e.target.style.color = "#eee")}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </Col>

          {/* Artists */}
          <Col xs={12} lg={4} style={styles.footerCol}>
            <div
              style={styles.footerTitle}
              onClick={() => toggleList("artists")}
              className="d-lg-none"
            >
              Artists
              <span style={styles.indicator}>
                {openList === "artists" ? "-" : "+"}
              </span>
            </div>
            <h6 style={{ ...styles.footerTitle, cursor: "default" }} className="d-none d-lg-block">
              Artists
            </h6>
            <ul
              style={{
                ...styles.list,
                maxHeight: openList === "artists" ? "500px" : "0",
              }}
              className="d-lg-none"
            >
              {artists.map((artist, i) => (
                <li
                  key={i}
                  style={styles.listItem}
                  onMouseOver={(e) => (e.target.style.color = "#ff0057")}
                  onMouseOut={(e) => (e.target.style.color = "#eee")}
                >
                  {artist}
                </li>
              ))}
            </ul>
            <ul className="d-none d-lg-block" style={styles.list}>
              {artists.map((artist, i) => (
                <li
                  key={i}
                  style={styles.listItem}
                  onMouseOver={(e) => (e.target.style.color = "#ff0057")}
                  onMouseOut={(e) => (e.target.style.color = "#eee")}
                >
                  {artist}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
