import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';

const artistsData = [
  { id: 1, name: 'Karthik', image: 'karthik.jpg' },
  { id: 2, name: 'Dua Lipa', image: 'dualipa.jfif' },
  { id: 3, name: 'Ed Sheeran', image: 'ed shareen.jfif' },
  { id: 4, name: 'Neha Kakkar', image: 'neha.jpg' },
  { id: 5, name: 'Taylor Swift', image: 'taylorswift.jfif' },
  { id: 6, name: 'A.R. Rahman', image: 'rehman.jfif' },
  { id: 7, name: 'Jonita Gandhi', image: 'jonita.webp' },
  { id: 8, name: 'Anirudh Ravichander', image: 'anir.jpg' },
];

function SearchArtists() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredArtists = artistsData.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">🎤 Search Your Favorite Artists</h2>

      <Form className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
        <Form.Control
          type="text"
          placeholder="Type an artist name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-sm rounded-pill"
        />
      </Form>

      <Row className="g-4">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <Col key={artist.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                onClick={() => navigate(`/artist/${artist.id}`)}
                className="h-100 shadow rounded"
                style={{ cursor: 'pointer' }}
              >
                <Card.Img
                  variant="top"
                  src={artist.image}
                  alt={artist.name}
                  className="rounded-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="mb-0">{artist.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No artists found.</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchArtists;
