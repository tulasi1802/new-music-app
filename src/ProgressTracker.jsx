import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Modal } from 'react-bootstrap';

const albums = [
  { title: 'Electric Heart', img: 'https://picsum.photos/300/200?random=11' },
  { title: 'Retro Beats', img: 'https://picsum.photos/300/200?random=12' },
  { title: 'Chill Vibes', img: 'https://picsum.photos/300/200?random=13' },
  { title: 'Synthwave Dreams', img: 'https://picsum.photos/300/200?random=14' },
];

function ProgressTracker() {
  const [progressMap, setProgressMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentDownloaded, setCurrentDownloaded] = useState(null);

  const simulateDownload = (index) => {
    if (progressMap[index]) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgressMap((prev) => ({
        ...prev,
        [index]: progress
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setCurrentDownloaded(albums[index]);
        setShowModal(true);
      }
    }, 300); // Adjust speed if needed
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Download Songs</h3>
      <Row>
        {albums.map((album, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={album.img} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{album.title}</Card.Title>
                {progressMap[index] ? (
                  <ProgressBar now={progressMap[index]} label={`${progressMap[index]}%`} />
                ) : (
                  <Button onClick={() => simulateDownload(index)} variant="primary">
                    Download
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Modal for download completion */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Download Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The song <strong>{currentDownloaded?.title}</strong> has been downloaded successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>Awesome!</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProgressTracker;
