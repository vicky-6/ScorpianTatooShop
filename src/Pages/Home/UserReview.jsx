import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const UsersReview = () => {
  const stats = [
    { value: "4.8★", label: "Google Rating" },
    { value: "1000+", label: "Google Reviews" },
    { value: "14", label: "Years Experience" },
  ];

  const reviews = [
    {
      name: "Shayan Sharma",
      date: "2023-05-24",
      text: "I really loved the work of my artist Nikhil. He is an amazing artist. Thank you N.A Tattoo for this experience 😍",
      rating: 5,
      avatar: "S",
    },
    {
      name: "Atul Baghotiya",
      date: "2023-05-22",
      text: "One of the best tattoo studios in Delhi-NCR. Experienced and friendly staff. Got my full arm tattoo from artist Nikhil (5/5 stars). Must visit!",
      rating: 5,
      avatar: "A",
    },
    {
      name: "Prabhudatt Agrawal",
      date: "2023-05-15",
      text: "Excellent place and the prices were affordable as well.",
      rating: 5,
      avatar: "P",
    },
    {
      name: "Umang Pathak",
      date: "2023-05-11",
      text: "Great artists, friendly ambience.",
      rating: 5,
      avatar: "U",
    },
  ];

  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Track screen size to switch between mobile/desktop behavior
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Decide how many reviews to show
  const visibleReviews =
    isMobile && !showMore ? reviews.slice(0, 2) : reviews;

  return (
    <Container fluid className="py-5 bg-white text-center">
      <h2 className="fw-bold mb-5">CLIENT REVIEWS</h2>

      {/* Stats Section */}
      <Row className="justify-content-center mb-5">
        {stats.map((s, i) => (
          <Col xs={12} md={4} key={i} className="mb-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <h3 className="fw-bold">{s.value}</h3>
              <p className="text-muted">{s.label}</p>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Reviews Section */}
      <Row className="g-4 justify-content-center">
        {visibleReviews.map((review, i) => (
          <Col xs={12} md={6} lg={3} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card className="shadow-sm h-100 border-0 rounded-4 text-start">
                <Card.Body>
                  {/* Header */}
                  <div className="d-flex align-items-center mb-3">
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#111",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <strong>{review.name}</strong>
                      <div className="text-muted small">{review.date}</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-warning mb-2">
                    {[...Array(review.rating)].map((_, j) => (
                      <FaStar key={j} />
                    ))}
                  </div>

                  {/* Text */}
                  <Card.Text style={{ fontSize: "0.95rem", color: "#444" }}>
                    {review.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Show More Button for Mobile */}
      {isMobile && !showMore && (
        <div className="mt-4">
          <Button
            variant="outline-dark"
            onClick={() => setShowMore(true)}
            className="px-4 rounded-pill"
          >
            More...
          </Button>
        </div>
      )}

      {/* Footer Line */}
      <p className="mt-5 text-muted">
        Google rating score: <strong>4.8</strong> of 5, based on{" "}
        <strong>1010 reviews</strong>
      </p>
    </Container>
  );
};

export default UsersReview;
