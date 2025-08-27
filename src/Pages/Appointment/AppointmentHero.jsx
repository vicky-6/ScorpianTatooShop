import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const AppointmentHero = () => {
  return (
    <Container fluid className="py-5 bg-light">
      <Row className="align-items-center flex-wrap-reverse">
        {/* Left Content */}
        <Col md={6} className="text-center text-md-start px-4">
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

        {/* Right Image & Icons */}
        <Col md={6} className="position-relative d-flex justify-content-center mb-4 mb-md-0">
          {/* Main Image */}
          <Image
            src="https://images.unsplash.com/photo-1615651325174-2d4b7e7f2e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Mobile App"
            fluid
            className="rounded shadow"
            style={{ maxWidth: '400px' }}
          />

          {/* Overlay Icons */}
          <div
            className="position-absolute"
            style={{
              top: '10%',
              right: '-10%',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            {/* Example Icon Button */}
            <Button
              variant="light"
              className="rounded-circle shadow"
              style={{ padding: '10px', minWidth: '50px' }}
            >
              <i className="bi bi-arrow-through-heart" style={{ fontSize: '1.5rem', color: '#007bff' }}></i>
            </Button>
            {/* Add more icons as needed */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentHero;