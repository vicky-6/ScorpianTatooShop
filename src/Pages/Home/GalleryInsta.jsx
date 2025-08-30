import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import styled, { keyframes, css } from "styled-components";

// Sample Instagram embed URLs
const videoData = [
  { id: 1, url: "https://www.instagram.com/reel/DJwoEMXzR8H/embed" },
  { id: 2, url: "https://www.instagram.com/reel/DJwoEMXzR8H/embed" },
  { id: 3, url: "https://www.instagram.com/reel/DJwoEMXzR8H/embed" },
  { id: 4, url: "https://www.instagram.com/reel/DJwoEMXzR8H/embed" },
  { id: 5, url: "https://www.instagram.com/reel/DJwoEMXzR8H/embed" },
  { id: 6, url: "https://www.instagram.com/reel/DJwoEMXzR8H/embed" },
];

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const zoomIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const underlineGrow = keyframes`
  from { width: 0; }
  to { width: 100px; }
`;

// Styled Components
const GalleryWrapper = styled.div`
  background: #f7f7f7;
  padding: 3rem 1rem;
`;

const Heading = styled.h2`
  text-align: center;
  font-weight: bold;
  color: #000;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  animation: ${fadeInUp} 1s ease forwards;

  &::after {
    content: "";
    display: block;
    margin: 0.5rem auto 0;
    height: 3px;
    background: red;
    animation: ${underlineGrow} 1s ease forwards;
  }
`;

const VideoCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;

  opacity: 0;
  transform: translateY(40px);

  ${({ isVisible, index }) =>
    isVisible &&
    css`
      animation: ${fadeInUp} 0.4s ease forwards;
      animation-delay: ${index * 0.05}s;
    `}

  &:hover {
    transform: scale(1.05);
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: transparent;
    border: none;
    animation: ${zoomIn} 0.4s ease;
  }
  iframe {
    width: 100%;
    height: 480px;
    border-radius: 10px;
    background: #000;
  }
  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    z-index: 10;
  }
`;

const Gallery = () => {
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 768 ? 2 : 4
  );
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(false);
  const cardRefs = useRef({});
  const [visibleCards, setVisibleCards] = useState({});
  const galleryRef = useRef(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  // Observe gallery wrapper
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setGalleryVisible(true);
      },
      { threshold: 0.2 }
    );
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, []);

  // Observe each card whenever visibleCount changes
  useEffect(() => {
    if (!galleryVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          setVisibleCards((prev) => ({ ...prev, [id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.2 }
    );

    Object.values(cardRefs.current).forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      Object.values(cardRefs.current).forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [galleryVisible, visibleCount]);

  const handleMore = () => {
    const increment = window.innerWidth < 768 ? 2 : 2;
    setVisibleCount((prev) => Math.min(prev + increment, videoData.length));
  };

  const handlePlay = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setError(false);
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setError(false);
  };

  return (
    <GalleryWrapper ref={galleryRef}>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Heading>Our Instagram Gallery</Heading>
        </div>
        <Row>
          {videoData.slice(0, visibleCount).map((video, index) => (
            <Col xs={12} md={6} key={video.id}>
              <VideoCard
                ref={(el) => (cardRefs.current[video.id] = el)}
                data-id={video.id}
                isVisible={visibleCards[video.id]}
                index={index}
                onClick={() => handlePlay(video.url)}
              >
                <iframe
                  src={video.url}
                  width="400" // Adjust width as needed
                  height="480" // Adjust height as needed
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title={`insta-${video.id}`}
                />
              </VideoCard>
            </Col>
          ))}
        </Row>

        {visibleCount < videoData.length && (
          <div className="text-center mt-4">
            <Button variant="dark" onClick={handleMore}>
              More
            </Button>
          </div>
        )}

        {/* Instagram Modal */}
        <StyledModal
          show={!!selectedVideo}
          onHide={handleClose}
          centered
          size="lg"
        >
          <span className="close-btn" onClick={handleClose}>
            ×
          </span>
          <Modal.Body>
            {error ? (
              <h4 style={{ color: "white", textAlign: "center" }}>
                Went Wrong
              </h4>
            ) : (
              <iframe
                src={selectedVideo}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                title="insta-modal"
              ></iframe>
            )}
          </Modal.Body>
        </StyledModal>
      </Container>
    </GalleryWrapper>
  );
};

export default Gallery;
