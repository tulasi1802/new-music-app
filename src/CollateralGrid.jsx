import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Collapse } from 'react-bootstrap';
import { PlayFill, PauseFill } from 'react-bootstrap-icons';

const movies = [
  {
    id: 4,
    title: 'Pushpa: The Rise',
    image: 'pushpa.webp',
    songs: [
      { id: 8, title: 'Srivalli', src: 'song.mp3.mp3', lyrics: `Srivalli...` },
      { id: 9, title: 'Daakko Daakko Meka', src: 'song.mp3.mp3', lyrics: `Daakko daakko meka...` },
    ],
  },
  {
    id: 2,
    title: 'Hi Nanna',
    image: 'hinanna.avif',
    songs: [
      { id: 4, title: 'Hello Hello', src: 'song1.mp3.mp3', lyrics: `Hello Hello, nanna...` },
      { id: 5, title: 'Nanna Prema', src: 'song1.mp3.mp3', lyrics: `Nanna Prema, nanna...` },
    ],
  },
  {
    id: 1,
    title: 'Aagadu',
    image: 'aagadu.jfif',
    songs: [
      { id: 1, title: 'Aaja Saroja', src: 'song1.mp3.mp3', lyrics: `Aaja Saroja, chukkallo...` },
      { id: 2, title: 'Balamani', src: 'song.mp3.mp3', lyrics: `Balamani, naa...` },
      { id: 3, title: 'Ringa Ringa', src: 'song1.mp3.mp3', lyrics: `Ringa Ringa, Ringa Ringa...` },
    ],
  },
  {
    id: 3,
    title: 'Ala Vaikunthapurramuloo',
    image: 'orange.jpg',
    songs: [
      { id: 6, title: 'Butta Bomma', src: 'song1.mp3.mp3', lyrics: `Neeli Neeli akasam...` },
      { id: 7, title: 'Samajavaragamana', src: 'song.mp3.mp3', lyrics: `Samajavaragamana...` },
    ],
  },
  {
    id: 5,
    title: 'Sita Ramam',
    image: 'sitaramam.webp',
    songs: [
      { id: 10, title: 'Inthandham', src: 'song.mp3.mp3', lyrics: `Inthandham...` },
      { id: 11, title: 'Oh Sita Hey Rama', src: 'song1.mp3.mp3', lyrics: `Oh Sita... Hey Rama...` },
    ],
  },
  {
    id: 6,
    title: 'Jathi Ratnalu',
    image: 'jathiratnalu.jfif',
    songs: [
      { id: 12, title: 'Chitti', src: 'song1.mp3.mp3', lyrics: `Chitti chitti bangaram kaadu...` },
      { id: 13, title: 'Mana Jathiratnalu', src: 'song.mp3.mp3', lyrics: `Mana Jathiratnalu...` },
    ],
  },
];

function MovieAlbums() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRef = useRef(null);
  const songListRef = useRef(null);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setPlayingSongId(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTimeout(() => {
      songListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePlayPause = (songId, src) => {
    if (playingSongId === songId) {
      audioRef.current.pause();
      setPlayingSongId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.play();
        setPlayingSongId(songId);
      }
    }
  };

  return (
    <Container className="py-5">
      <Row xs={1} md={3} className="g-4 mb-5">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card
              className="h-100 shadow-sm position-relative"
              onClick={() => handleSelectMovie(movie)}
              style={{
                borderRadius: '1.2rem',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {/* Bootstrap-based overlay */}
              <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-primary bg-opacity-25 opacity-0 hover-opacity-100 transition"></div>

              <Card.Img
                variant="top"
                src={movie.image}
                alt={movie.title}
                style={{
                  height: '300px',
                  objectFit: 'contain',
                  backgroundColor: '#000',
                  transition: 'transform 0.3s ease',
                }}
              />
              <Card.Body className="text-center bg-white">
                <Card.Title className="fw-bold fs-4 text-dark">{movie.title}</Card.Title>
                <Card.Text className="text-muted">Click to view songs & lyrics</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedMovie && (
        <div
          ref={songListRef}
          className="p-4 rounded shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <h3 className="mb-4 text-center fw-bold">
            Songs from "{selectedMovie.title}"
          </h3>
          <ListGroup variant="flush">
            {selectedMovie.songs.map((song) => (
              <ListGroup.Item
                key={song.id}
                className={`song-item d-flex flex-column mb-3 ${playingSongId === song.id ? 'bg-white bg-opacity-25' : 'bg-transparent'}`}
                style={{
                  borderRadius: '12px',
                  border: 'none',
                  transition: 'background-color 0.3s ease',
                  cursor: 'default',
                  color: '#fff',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-semibold fs-5">{song.title}</div>
                  <Button
                    variant={playingSongId === song.id ? 'light' : 'outline-light'}
                    onClick={() => handlePlayPause(song.id, song.src)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s ease',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                    aria-label={playingSongId === song.id ? 'Pause' : 'Play'}
                  >
                    {playingSongId === song.id ? (
                      <PauseFill size={24} color="#5a189a" />
                    ) : (
                      <PlayFill size={24} color="#fff" />
                    )}
                  </Button>
                </div>
                <Collapse in={playingSongId === song.id}>
                  <div
                    className="mt-3"
                    style={{
                      whiteSpace: 'pre-wrap',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      color: '#e0d9ff',
                      userSelect: 'text',
                      paddingRight: '10px',
                    }}
                  >
                    {song.lyrics}
                  </div>
                </Collapse>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setPlayingSongId(null)} />
    </Container>
  );
}

export default MovieAlbums;
