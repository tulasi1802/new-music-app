import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';

const artistDetails = {
  1: {
    name: 'Arijit Singh',
    image: process.env.PUBLIC_URL + '/arjith.jpg',
    about:
      'Arijit Singh is an Indian playback singer known for his soulful voice and heartfelt music. He is one of the most streamed artists in India.',
    songs: [
      { title: 'Tum Hi Ho', audio: 'tumhiho.mp3' },
      { title: 'Channa Mereya', audio: 'channamereya.mp3' },
      { title: 'Raabta', audio: 'raabta.mp3' },
      { title: 'Agar Tum Saath Ho', audio: 'agartumsaatho.mp3' },
      { title: 'Muskurane', audio: 'muskurane.mp3' },
    ],
  },
  2: {
    name: 'Dua Lipa',
    image: process.env.PUBLIC_URL + '/dualipa.jfif',
    about:
      'Dua Lipa is a British singer and songwriter known for her strong vocals and pop hits across the globe.',
    songs: [
      { title: 'Levitating', audio: 'levitating.mp3' },
      { title: 'Don’t Start Now', audio: 'dontstartnow.mp3' },
      { title: 'New Rules', audio: 'newrules.mp3' },
      { title: 'Physical', audio: 'physical.mp3' },
      { title: 'Break My Heart', audio: 'breakmyheart.mp3' },
    ],
  },
  3: {
    name: 'Ed Sheeran',
    image: process.env.PUBLIC_URL + '/edsheeran.jfif',
    about:
      'Ed Sheeran is a British singer-songwriter known for his melodic songs and heartfelt lyrics.',
    songs: [
      { title: 'Shape of You', audio: 'shapeofyou.mp3' },
      { title: 'Perfect', audio: 'perfect.mp3' },
      { title: 'Thinking Out Loud', audio: 'thinkingoutloud.mp3' },
      { title: 'Photograph', audio: 'photograph.mp3' },
      { title: 'Castle on the Hill', audio: 'castleonthehill.mp3' },
    ],
  },
  4: {
    name: 'Neha Kakkar',
    image: process.env.PUBLIC_URL + '/neha.jpg',
    about:
      'Neha Kakkar is an Indian playback singer known for her energetic voice and popular Bollywood songs.',
    songs: [
      { title: 'Dilbar', audio: 'dilbar.mp3' },
      { title: 'Aankh Marey', audio: 'aankhmarey.mp3' },
      { title: 'O Saki Saki', audio: 'osakisaki.mp3' },
      { title: 'Cheez Badi', audio: 'cheezbadi.mp3' },
      { title: 'Kala Chashma', audio: 'kalachashma.mp3' },
    ],
  },
  5: {
    name: 'Taylor Swift',
    image: process.env.PUBLIC_URL + '/taylorswift.jfif',
    about:
      'Taylor Swift is an American singer-songwriter known for her narrative songwriting and multiple awards.',
    songs: [
      { title: 'Love Story', audio: 'lovestory.mp3' },
      { title: 'Blank Space', audio: 'blankspace.mp3' },
      { title: 'Shake It Off', audio: 'shakeitoff.mp3' },
      { title: 'You Belong With Me', audio: 'youbelongwithme.mp3' },
      { title: 'Cardigan', audio: 'cardigan.mp3' },
    ],
  },
  6: {
    name: 'A.R. Rahman',
    image: process.env.PUBLIC_URL + '/rehman.jfif',
    about:
      'A.R. Rahman is an Indian composer and singer known for his film scores and unique sound.',
    songs: [
      { title: 'Jai Ho', audio: 'jaiho.mp3' },
      { title: 'Kun Faya Kun', audio: 'kunfayakun.mp3' },
      { title: 'Maa Tujhe Salaam', audio: 'maatujhesalaam.mp3' },
      { title: 'Vande Mataram', audio: 'vandemataram.mp3' },
      { title: 'Chaiyya Chaiyya', audio: 'chaiyyachaiyya.mp3' },
    ],
  },
  7: {
    name: 'Jonita Gandhi',
    image: process.env.PUBLIC_URL + '/jonita.webp',
    about:
      'Jonita Gandhi is a Canadian playback singer popular for her Bollywood and independent music.',
    songs: [
      { title: 'Pareshaan', audio: 'pareshaan.mp3' },
      { title: 'Tera Fitoor', audio: 'terafitoor.mp3' },
      { title: 'Desi Girl', audio: 'desigirl.mp3' },
      { title: 'The Breakup Song', audio: 'thebreakupsong.mp3' },
      { title: 'Dil Dhadakne Do', audio: 'dildhadaknedo.mp3' },
    ],
  },
  8: {
    name: 'Anirudh Ravichander',
    image: process.env.PUBLIC_URL + '/anir.jpg',
    about:
      'Anirudh Ravichander is an Indian film composer and singer known for his youthful and peppy music.',
    songs: [
      { title: 'Why This Kolaveri', audio: 'kolaveri.mp3' },
      { title: 'Surviva', audio: 'surviva.mp3' },
      { title: 'Vaathi Coming', audio: 'vaathicoming.mp3' },
      { title: 'Chella Kutti', audio: 'chellakutti.mp3' },
      { title: 'Kannamma', audio: 'kannamma.mp3' },
    ],
  },
  9: {
    name: 'Sid Sriram',
    image: process.env.PUBLIC_URL + '/img4.jpg',
    about:
      'Sid Sriram is an Indian Carnatic musician and playback singer known for his unique fusion style and deep emotional voice.',
    songs: [
      { title: 'Srivalli', audio: 'srivalli.mp3' },
      { title: 'Samajavaragamana', audio: 'samajavaragamana.mp3' },
      { title: 'Inkem Inkem', audio: 'inkeminkem.mp3' },
      { title: 'Thalli Pogathey', audio: 'thallipogathey.mp3' },
      { title: 'Manasulona', audio: 'manasulona.mp3' },
    ],
  },
};

function ArtistDetail() {
  const { id } = useParams();
  const artist = artistDetails[id];

  const audioRef = useRef(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (audioFile, index) => {
    if (!audioRef.current) return;

    if (playingIndex === index) {
      // Toggle pause/play if same song clicked
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      audioRef.current.src = process.env.PUBLIC_URL + '/audios/' + audioFile;
      audioRef.current.play();
      setPlayingIndex(index);
    }
  };

  if (!artist) {
    return (
      <Container className="mt-4">
        <h4 className="text-danger text-center">❌ Artist not found</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow border-0 p-4">
        <Row className="align-items-center">
          <Col md={4} className="text-center mb-3 mb-md-0">
            <Image
              src={artist.image}
              alt={artist.name}
              roundedCircle
              fluid
              style={{ width: '250px', height: '250px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <h2 className="fw-bold">{artist.name}</h2>
            <p className="text-muted">{artist.about}</p>
          </Col>
        </Row>

        <h5 className="mt-4 mb-3">🎵 Top Songs</h5>
        <ListGroup variant="flush" className="border rounded shadow-sm">
          {artist.songs.map((song, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>{song.title}</div>
              <Button
                variant={playingIndex === index ? 'danger' : 'primary'}
                size="sm"
                onClick={() => handlePlay(song.audio, index)}
              >
                {playingIndex === index && audioRef.current && !audioRef.current.paused ? 'Pause' : 'Play'}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* Visible audio player */}
        <div className="mt-4 text-center">
          <audio
            ref={audioRef}
            controls
            style={{ width: '100%', maxWidth: '500px' }}
            onEnded={() => setPlayingIndex(null)}
          />
        </div>
      </Card>
    </Container>
  );
}

export default ArtistDetail;
