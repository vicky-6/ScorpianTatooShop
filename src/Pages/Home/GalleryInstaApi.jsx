import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import styled, { keyframes, css } from "styled-components";
import axios from "axios";

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

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 768 ? 2 : 4
  );
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(false);

  // Your Instagram long-lived access token
  const ACCESS_TOKEN =
    "EAATL6F7ZCtAoBPSKKeLDaMeyZBsk1UBoSlUc2dZCcEp9x5UnCCq8QKrznGM5kHWctbp06imVhsPaEPiHakwhFZC72wA8NZAvuf0e5UvovnlQYE3ZAK4SokiPEHO9nDSF6mZBylCIWK0FbzqCDdZANhmR1LCGrEbWgAVLAH9kWYnVOVLxbZBAR8i1B91V92vyS3rg04XoZAtP2JAGAF8NoOKmeTOXe8mLnimqK2QTTvPncoR58lzC1blDsJZA8DCzCZC1GYCffPVYZCjPZA6sLi";

  // Fetch Instagram media
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${ACCESS_TOKEN}`
        );
        // Filter only videos
        const videoData = response.data.data.filter(
          (item) => item.media_type === "VIDEO"
        );
        setVideos(videoData);
      } catch (err) {
        console.error("Failed to fetch Instagram videos", err);
      }
    };

    fetchVideos();
  }, []);

  const handleMore = () => {
    const increment = window.innerWidth < 768 ? 2 : 2;
    setVisibleCount((prev) => Math.min(prev + increment, videos.length));
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
    <GalleryWrapper>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Heading>Our Instagram Gallery</Heading>
        </div>
        <Row>
          {videos.slice(0, visibleCount).map((video, index) => (
            <Col xs={12} md={6} key={video.id}>
              <VideoCard isVisible={true} index={index} onClick={() => handlePlay(video.media_url)}>
                <video src={video.media_url} muted autoPlay loop playsInline preload="metadata" />
              </VideoCard>
            </Col>
          ))}
        </Row>

        {visibleCount < videos.length && (
          <div className="text-center mt-4">
            <Button variant="dark" onClick={handleMore}>
              More
            </Button>
          </div>
        )}

        {/* Video Modal */}
        <StyledModal show={!!selectedVideo} onHide={handleClose} centered size="lg">
          <span className="close-btn" onClick={handleClose}>
            ×
          </span>
          <Modal.Body>
            {error ? (
              <h4 style={{ color: "white", textAlign: "center" }}>
                Something went wrong
              </h4>
            ) : (
              <video src={selectedVideo} controls autoPlay onError={() => setError(true)} />
            )}
          </Modal.Body>
        </StyledModal>
      </Container>
    </GalleryWrapper>
  );
};

export default Gallery;
