import React, { useState } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Toast,
  Form,
  Image,
  ToastContainer,
  Badge
} from 'react-bootstrap';
import {
  CheckCircleFill,
  CalendarEvent,
  GeoAltFill
} from 'react-bootstrap-icons';

const artists = [
  {
    id: 1,
    name: 'Arijit Singh',
    image: 'arjith.jpg',
    concertDate: '2025-07-15',
    address: 'Mumbai Arena, India'
  },
  {
    id: 2,
    name: 'Taylor Swift',
    image: 'taylorswift.jfif',
    concertDate: '2025-08-05',
    address: 'Wembley Stadium, London'
  },
  {
    id: 3,
    name: 'The Weeknd',
    image: 'rehman.jfif',
    concertDate: '2025-08-20',
    address: 'Toronto Dome, Canada'
  },
  {
    id: 4,
    name: 'Ed Sheeran',
    image: 'ed shareen.jfif',
    concertDate: '2025-09-10',
    address: 'Berlin Arena, Germany'
  },
  {
    id: 5,
    name: 'Shreya Ghoshal',
    image: 'dualipa.jfif',
    concertDate: '2025-09-25',
    address: 'Chennai Grounds, India'
  },
  {
    id: 6,
    name: 'Coldplay',
    image: 'anir.jpg',
    concertDate: '2025-10-05',
    address: 'NYC Stadium, USA'
  }
];

function BookTickets({ onBook }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '',number:''});
  const [showToast, setShowToast] = useState(false);
  const [toastBooking, setToastBooking] = useState(null);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedArtist) return;

    const booking = {
      artist: selectedArtist.name,
      concertDate: selectedArtist.concertDate,
      address: selectedArtist.address,
      user: formData.name,
      email: formData.email
    };

    if (typeof onBook === 'function') {
      onBook(booking);
    }

    setShowModal(false);
    setToastBooking(booking);
    setShowToast(true);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-center fw-bold text-primary">
        Book Your Favorite Artist
      </h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {artists.map((artist) => (
          <Col key={artist.id}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{
                borderRadius: '1rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onClick={() => handleArtistClick(artist)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgb(0 0 0 / 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 4px 10px rgb(0 0 0 / 0.1)';
              }}
            >
              <div className="d-flex justify-content-center pt-4 position-relative">
                <Image
                  src={artist.image}
                  roundedCircle
                  alt={artist.name}
                  style={{
                    width: '160px',
                    height: '160px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 10px rgb(0 0 0 / 0.15)'
                  }}
                />
                <Badge
                  bg="warning"
                  text="dark"
                  className="position-absolute top-0 start-0 translate-middle rounded-pill"
                >
                  Top Rated
                </Badge>
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-semibold fs-4">
                  {artist.name}
                </Card.Title>
                <Card.Text className="text-muted mb-3">
                  <span className="d-block">
                    <CalendarEvent className="me-1 text-primary" />{' '}
                    {artist.concertDate}
                  </span>
                  <span className="d-block">
                    <GeoAltFill className="me-1 text-danger" /> {artist.address}
                  </span>
                </Card.Text>
                <Button
                  variant="outline-primary"
                  className="px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArtistClick(artist);
                  }}
                >
                  Book Artist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedArtist?.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="d-flex align-items-center mb-4">
              <Image
                src={selectedArtist?.image}
                roundedCircle
                alt={selectedArtist?.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgb(0 0 0 / 0.15)',
                  marginRight: '15px'
                }}
              />
              <div>
                <h5 className="mb-1">{selectedArtist?.name}</h5>
                <p className="mb-0 text-muted">
                  Date: {selectedArtist?.concertDate}
                </p>
                <p className="mb-0 text-muted">
                  Location: {selectedArtist?.address}
                </p>
              </div>
            </div>

            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="number">
              <Form.Label>No.of Tickets</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter ticket count"
                required
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Feedback Toast */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3500}
          autohide
          bg="success"
          style={{ minWidth: '300px', borderRadius: '12px' }}
        >
          <Toast.Header closeButton className="bg-success text-white border-0">
            <CheckCircleFill className="me-2" />
            <strong className="me-auto">Booking Confirmed</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Successfully booked <strong>{toastBooking?.artist}</strong>
            ’s concert on <strong>{toastBooking?.concertDate}</strong>! 🎉
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default BookTickets;
