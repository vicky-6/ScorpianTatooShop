import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const AppointmentHero = () => {
  return (
    <Container fluid className="py-4 bg-light overflow-hidden">
      <Row className="align-items-center flex-wrap-reverse py-5">
        {/* Left Content */}
        <Col
          xs={12}
          md={6}
          className="text-center text-md-start px-4 pt-4 mb-4 mb-md-0"
        >
          <h1 className="display-4 fw-bold mb-4 text-primary">
            Get Inked & Save Big!
          </h1>
          <p className="lead mb-4">
            Book now &amp; get 20% OFF on your tattoo with a prior deposit.
          </p>
          <Button variant="primary" size="lg">
            BOOK NOW
          </Button>
        </Col>

        {/* Right Image & Overlay Icons */}
        <Col
          xs={12}
          md={6}
          className="position-relative d-flex justify-content-center"
        >
          {/* Main Image */}
          <Image
            src="/offer.JPG"
            alt="Offer"
            fluid
            className="rounded shadow"
            style={{ maxWidth: '400px' }}
          />

          {/* Overlay Icons */}
          <div
            className="position-absolute d-flex flex-column gap-3"
            style={{
              top: '10%',
              right: '0',
            }}
          >
            {/* Example Icon Button */}
            <Button
              variant="light"
              className="rounded-circle shadow"
              style={{ padding: '10px', minWidth: '50px' }}
            >
              <i
                className="bi bi-arrow-through-heart"
                style={{ fontSize: '1.5rem', color: '#007bff' }}
              ></i>
            </Button>

            {/* Add more icons as needed */}
            <Button
              variant="light"
              className="rounded-circle shadow"
              style={{ padding: '10px', minWidth: '50px' }}
            >
              <i
                className="bi bi-star"
                style={{ fontSize: '1.5rem', color: '#007bff' }}
              ></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentHero;
