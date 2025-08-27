import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = [
    { name: "REALISTIC TATTOOS", image: "/tattoo1.jpg" },
    { name: "LORD SHIVA TATTOOS", image: "/tattoo2.jpg" },
    { name: "COLOR TATTOOS", image: "/tattoo3.jpg" },
    { name: "GEOMETRIC TATTOOS", image: "/tattoo4.jpg" },
    { name: "BLACK & GREY TATTOOS", image: "/tattoo1.jpg" },
    { name: "MINIMAL TATTOOS", image: "/tattoo2.jpg" },
    { name: "PORTRAIT TATTOOS", image: "/tattoo3.jpg" },
    { name: "TRIBAL TATTOOS", image: "/tattoo4.jpg" },
    { name: "WATERCOLOUR TATTOOS", image: "/tattoo1.jpg" },
    { name: "3D TATTOOS", image: "/tattoo2.jpg" },
    { name: "TEXT TATTOOS", image: "/tattoo3.jpg" },
    { name: "ANIMAL TATTOOS", image: "/tattoo4.jpg" },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [visibleCount, setVisibleCount] = useState(isMobile ? 4 : 8);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 4 : 8);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 4 : 8));
  };

  return (
    <>
      <Container fluid className="py-5 bg-white text-center">
        <h2 className="fw-bold mb-5">TATTOO CATEGORIES</h2>

        <Row className="g-4 justify-content-center">
          {categories.slice(0, visibleCount).map((cat, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 4) * 0.2, duration: 0.6 }}
              >
                <Card
                  className="category-card border-0 shadow-sm h-100 rounded-4 overflow-hidden"
                  style={{ cursor: "pointer" }}
                >
                  <div className="category-img-wrapper">
                    <Card.Img
                      src={cat.image}
                      alt={cat.name}
                      className="category-img"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <h6 className="fw-bold category-title">{cat.name}</h6>
                    <p className="text-muted small mb-0">
                      Explore our {cat.name.toLowerCase()} collection
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {visibleCount < categories.length && (
          <div className="mt-4">
            <Button
              variant="dark"
              onClick={handleLoadMore}
              className="px-4 py-2 rounded-pill"
            >
              More...
            </Button>
          </div>
        )}
      </Container>

      {/* CSS inside JSX */}
      <style jsx>{`
        .category-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .category-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
        }
        .category-img-wrapper {
          overflow: hidden;
          border-radius: 12px;
        }
        .category-img {
          height: 250px;
          width: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .category-card:hover .category-img {
          transform: scale(1.1);
        }
        .category-title {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
    </>
  );
};

export default Categories;
