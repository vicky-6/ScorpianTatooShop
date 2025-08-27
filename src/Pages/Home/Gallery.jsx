import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import styled, { keyframes, css } from "styled-components";

// Sample video data
const videoData = [
  { id: 1, url: "/video1.mp4" },
  { id: 2, url: "/video2.mp4" },
  { id: 3, url: "/video3.mp4" },
  { id: 4, url: "/video4.mp4" },
  { id: 5, url: "/video5.mp4" },
  { id: 6, url: "/video6.mp4" },
  { id: 7, url: "/video7.mp4" },
  { id: 8, url: "/video8.mp4" },
  { id: 9, url: "/video9.mp4" },
  { id: 10, url: "/video10.mp4" },
];

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); color: #ff0000; }
  100% { transform: scale(1); }
`;

const zoomIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
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
  animation: ${pulse} 2s infinite ease-in-out;
`;

const VideoCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s;

  opacity: 0;
  transform: translateY(40px);

  ${({ isVisible, index }) =>
    isVisible &&
    css`
      animation: ${fadeInUp} 0.8s ease forwards;
      animation-delay: ${index * 0.15}s;
    `}

  &:hover {
    transform: scale(1.05);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    /* Show first frame automatically */
    preload: "metadata";
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: red;
    opacity: 0.9;
    pointer-events: none;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: transparent;
    border: none;
    animation: ${zoomIn} 0.4s ease;
  }
  video {
    width: 100%;
    max-height: 80vh;
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
  const [visibleCount, setVisibleCount] = useState(window.innerWidth < 768 ? 4 : 8);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});
  const videoRefs = useRef([]);
  const cardRefs = useRef([]);
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

  // Observe each card
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

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [galleryVisible]);

  const handleMore = () => {
    const increment = window.innerWidth < 768 ? 4 : 8;
    setVisibleCount((prev) => prev + increment);
  };

  const handlePlay = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setError(false);
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setError(false);
  };

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(() => {});
      setPlayingVideos((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      setPlayingVideos((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <GalleryWrapper ref={galleryRef}>
      <Container>
        <Heading>Our Gallery</Heading>
        <Row>
          {videoData.slice(0, visibleCount).map((video, index) => (
            <Col xs={12} md={3} key={video.id}>
              <VideoCard
                ref={(el) => (cardRefs.current[index] = el)}
                data-id={video.id}
                isVisible={visibleCards[video.id]}
                index={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handlePlay(video.url)}
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  muted
                  playsInline
                  preload="metadata"  // show first frame
                >
                  <source src={video.url} type="video/mp4" />
                </video>
                {!playingVideos[index] && <span className="play-icon">›</span>}
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

        {/* Video Modal */}
        <StyledModal show={!!selectedVideo} onHide={handleClose} centered size="lg">
          <span className="close-btn" onClick={handleClose}>×</span>
          <Modal.Body>
            {error ? (
              <h4 style={{ color: "white", textAlign: "center" }}>Went Wrong</h4>
            ) : (
              <video controls autoPlay onError={() => setError(true)} onEnded={handleClose}>
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support video.
              </video>
            )}
          </Modal.Body>
        </StyledModal>
      </Container>
    </GalleryWrapper>
  );
};

export default Gallery;
