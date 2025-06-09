import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const songsData = [
  {
    id: 1,
    title: 'Butta Bomma',
    artist: 'Armaan Malik',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Neeli neeli akasam kanulatho pattukunnade...',
  },
  {
    id: 2,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    language: 'English',
    audio: 'song.mp3.mp3',
    lyrics: 'The club isn’t the best place to find a lover so the bar is where I go...'
  },
  {
    id: 3,
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    language: 'Hindi',
    audio: 'song.mp3.mp3',
    lyrics: 'Tum hi ho, tum hi ho zindagi ab tum hi ho...'
  },
  {
    id: 4,
    title: 'Oo Antava',
    artist: 'Indravathi Chauhan',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Oo antava oo oo antava...'
  },
  {
    id: 5,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    language: 'English',
    audio: 'song.mp3.mp3',
    lyrics: 'I found a love for me, darling just dive right in...',
  },
  {
    id: 6,
    title: 'Srivalli',
    artist: 'Sid Sriram',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Srivalli… Srivalli… kanne kalladhe...',
  },
  {
    id: 7,
    title: 'Kesariya',
    artist: 'Arijit Singh',
    language: 'Hindi',
    audio: 'song.mp3.mp3',
    lyrics: 'Kesariya tera ishq hai piya...',
  },
  {
    id: 8,
    title: 'Levitating',
    artist: 'Dua Lipa',
    language: 'English',
    audio: 'song.mp3.mp3',
    lyrics: 'If you wanna run away with me, I know a galaxy...',
  },
  {
    id: 9,
    title: 'Jai Balayya',
    artist: 'Thaman S',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Jai Balayya… mass udugaadu...',
  },
  {
    id: 10,
    title: 'Apna Bana Le',
    artist: 'Arijit Singh',
    language: 'Hindi',
    audio: 'song.mp3.mp3',
    lyrics: 'Apna bana le piya, apna bana le...',
  },
  {
    id: 11,
    title: 'Despacito',
    artist: 'Luis Fonsi',
    language: 'English/Spanish',
    audio: 'song.mp3.mp3',
    lyrics: 'Despacito… quiero respirar tu cuello despacito...',
  },
  {
    id: 12,
    title: 'Samajavaragamana',
    artist: 'Sid Sriram',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Samajavaragamana... oh ho oh ho...',
  },
  {
    id: 13,
    title: 'Tujh Mein Rab Dikhta Hai',
    artist: 'Roop Kumar Rathod',
    language: 'Hindi',
    audio: 'song.mp3.mp3',
    lyrics: 'Tujh mein rab dikhta hai, yaara main kya karoon...',
  },
  {
    id: 14,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    language: 'English',
    audio: 'song.mp3.mp3',
    lyrics: 'I said, ooh, I\'m blinded by the lights...',
  },
  {
    id: 15,
    title: 'Ammayi',
    artist: 'Anirudh Ravichander',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Ammayi gurinchi cheppalante...',
  },
  {
    id: 16,
    title: 'Dil Diyan Gallan',
    artist: 'Atif Aslam',
    language: 'Hindi',
    audio: 'song.mp3.mp3',
    lyrics: 'Dil diyan gallan, karange naal naal beh ke...',
  },
  {
    id: 17,
    title: 'Attention',
    artist: 'Charlie Puth',
    language: 'English',
    audio: 'song.mp3.mp3',
    lyrics: 'You just want attention, you don’t want my heart...',
  },
  {
    id: 18,
    title: 'Ramuloo Ramulaa',
    artist: 'Anurag Kulkarni',
    language: 'Telugu',
    audio: 'song.mp3.mp3',
    lyrics: 'Ramuloo ramulaa, ramuloo ramulaa...',
  },
  {
    id: 19,
    title: 'Agar Tum Saath Ho',
    artist: 'Alka Yagnik, Arijit Singh',
    language: 'Hindi',
    audio: 'song.mp3.mp3',
    lyrics: 'Agar tum saath ho, behti rahe...',
  },
  {
    id: 20,
    title: 'Peaches',
    artist: 'Justin Bieber',
    language: 'English',
    audio: 'song.mp3.mp3',
    lyrics: 'I got my peaches out in Georgia...',
  },
];

function SongsPage() {
  const [search, setSearch] = useState('');
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const navigate = useNavigate();

  const filteredSongs = songsData.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handlePlay = (index) => {
    setCurrentSongIndex(index);
    const selected = filteredSongs[index];
    if (audioRef.current) {
      audioRef.current.src = process.env.PUBLIC_URL + '/' + selected.audio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = useCallback(() => {
    if (shuffle) {
      const nextIndex = Math.floor(Math.random() * filteredSongs.length);
      setCurrentSongIndex(nextIndex);
    } else {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % filteredSongs.length);
    }
  }, [shuffle, filteredSongs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [handleEnded]);

  // Time update and duration tracking for progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const timeUpdateHandler = () => setCurrentTime(audio.currentTime);
    const durationChangeHandler = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', timeUpdateHandler);
    audio.addEventListener('durationchange', durationChangeHandler);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdateHandler);
      audio.removeEventListener('durationchange', durationChangeHandler);
    };
  }, [currentSongIndex]);

  // Seek audio by progress bar
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    if (audio) {
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Previous and Next controls
  const handlePrev = () => {
    if (filteredSongs.length === 0) return;
    setCurrentSongIndex((prev) => (prev === 0 ? filteredSongs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (filteredSongs.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % filteredSongs.length);
  };

  return (
    <>
      <Container className="py-4">
        <Button variant="outline-dark" className="mb-3" onClick={() => navigate(-1)}>
          ⬅ Back
        </Button>
        <h2 className="text-center mb-4">🎧 Songs Library</h2>

        <Form className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          <Form.Control
            type="text"
            placeholder="Search songs or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shadow-sm rounded-pill"
          />
        </Form>

        <div className="text-center mb-3">
          <Button variant={shuffle ? 'warning' : 'secondary'} onClick={() => setShuffle(!shuffle)}>
            🔀 Shuffle {shuffle ? 'On' : 'Off'}
          </Button>
        </div>

        <Row className="gy-4">
          {filteredSongs.map((song, index) => (
            <Col key={song.id} xs={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h5>{song.title}</h5>
                      <p className="text-muted mb-1">
                        {song.artist} — <em>{song.language}</em>
                      </p>
                      {currentSongIndex === index && (
                        <div className="mt-2">
                          <strong>Lyrics:</strong>
                          <p
                            className="small bg-light border rounded p-2 mt-1"
                            style={{ height: '100px', overflowY: 'auto' }}
                          >
                            {song.lyrics}
                          </p>
                        </div>
                      )}
                    </Col>
                    <Col md={4} className="text-end">
                      {currentSongIndex === index && isPlaying ? (
                        <Button variant="warning" className="me-2" onClick={handlePause}>
                          ⏸ Pause
                        </Button>
                      ) : (
                        <Button variant="success" className="me-2" onClick={() => handlePlay(index)}>
                          ▶ Play
                        </Button>
                      )}
                      <Button
                        variant={likedSongs.includes(song.id) ? 'danger' : 'outline-danger'}
                        onClick={() => handleLike(song.id)}
                      >
                        ❤️
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <audio ref={audioRef} hidden />
      </Container>

      {/* Fixed Bottom Player Controls */}
      {currentSongIndex !== null && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#343a40',
            color: 'white',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            zIndex: 1050,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.7)',
          }}
        >
          <div style={{ flex: 1 }}>
            <strong>{filteredSongs[currentSongIndex].title}</strong> —{' '}
            {filteredSongs[currentSongIndex].artist}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="outline-light" size="sm" onClick={handlePrev}>
              ⏮
            </Button>
            {isPlaying ? (
              <Button variant="outline-light" size="sm" onClick={handlePause}>
                ⏸
              </Button>
            ) : (
              <Button variant="outline-light" size="sm" onClick={() => handlePlay(currentSongIndex)}>
                ▶
              </Button>
            )}
            <Button variant="outline-light" size="sm" onClick={handleNext}>
              ⏭
            </Button>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            style={{ marginLeft: '15px', flex: 2, cursor: 'pointer' }}
          />
          <div
            style={{
              marginLeft: '10px',
              minWidth: '70px',
              textAlign: 'right',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {new Date(currentTime * 1000).toISOString().substr(14, 5)} /{' '}
            {new Date(duration * 1000).toISOString().substr(14, 5)}
          </div>
        </div>
      )}
    </>
  );
}

export default SongsPage;
