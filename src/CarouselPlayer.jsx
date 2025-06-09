import React, { useRef, useState, useEffect } from 'react';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';

const albums = [
  { id: 1, title: 'Electric Heart', artist: 'DJ Pulse', img: 'https://picsum.photos/300/200?random=1' },
  { id: 2, title: 'Retro Beats', artist: 'The Time Loops', img: 'https://picsum.photos/300/200?random=2' },
  { id: 3, title: 'Chill Vibes', artist: 'Lo-Fi Club', img: 'https://picsum.photos/300/200?random=3' },
  { id: 4, title: 'Synthwave Dreams', artist: 'Neon Tapes', img: 'https://picsum.photos/300/200?random=4' },
  { id: 5, title: 'Morning Acoustic', artist: 'Sunrise Notes', img: 'https://picsum.photos/300/200?random=5' },
  { id: 6, title: 'Epic Score', artist: 'Orchestra X', img: 'https://picsum.photos/300/200?random=6' },
];

const groupIntoChunks = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

function CarouselPlayer() {
  const groupedAlbums = groupIntoChunks(albums, 3);
  const audioRef = useRef(null);
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playlist, setPlaylist] = useState([]);

  const handlePlayPause = (album) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newPlaylist = ['/song.mp3.mp3', '/music.mp3.mp3'];

    if (currentId === album.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      audio.pause();
      audio.src = newPlaylist[0];
      audio.load();
      audio.play();
      setPlaylist(newPlaylist);
      setTrackIndex(0);
      setCurrentId(album.id);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (trackIndex < playlist.length - 1) {
        const nextIndex = trackIndex + 1;
        audio.src = playlist[nextIndex];
        audio.load();
        audio.play();
        setTrackIndex(nextIndex);
      } else {
        setIsPlaying(false);
        setCurrentId(null);
        setTrackIndex(0);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [trackIndex, playlist]);

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Featured Albums</h3>
      <Carousel interval={4000}>
        {groupedAlbums.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className="d-flex justify-content-center">
              {group.map((album, index) => (
                <Col key={index} md={4} className="d-flex justify-content-center">
                  <Card
                    style={{ width: '18rem', cursor: 'pointer' }}
                    className="shadow-sm"
                    onClick={() => handlePlayPause(album)}
                  >
                    <Card.Img variant="top" src={album.img} />
                    <Card.Body>
                      <Card.Title>{album.title}</Card.Title>
                      <Card.Text>{album.artist}</Card.Text>
                      <button
                        className={`btn btn-sm ${
                          currentId === album.id && isPlaying ? 'btn-danger' : 'btn-success'
                        }`}
                      >
                        {currentId === album.id && isPlaying ? 'Pause' : 'Play'}
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      <audio ref={audioRef} style={{ display: 'none' }} />
    </Container>
  );
}

export default CarouselPlayer;
