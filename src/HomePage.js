import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = ({ username }) => {
  const mixedForYou = [
    { id: 1, title: 'Mix 1', img: 'hinanna.avif', audio: 'song1.mp3.mp3' },
    { id: 2, title: 'Mix 2', img: 'perfect.jpg', audio: 'song.mp3.mp3' },
    { id: 3, title: 'Mix 3', img: 'img1.jfif', audio: 'song.mp3.mp3' },
    { id: 4, title: 'Mix 4', img: 'img2.jpg', audio: 'song.mp3.mp3' },
    { id: 5, title: 'Mix 5', img: 'img3.jpg', audio: 'song.mp3.mp3' },
    { id: 6, title: 'Mix 6', img: 'img4.jpg', audio: 'song.mp3.mp3' },
  ];

  const favoriteArtists = [
    { id: 1, name: 'Taylor Swift', img: 'taylorswift.jfif' },
    { id: 2, name: 'Arijit Singh', img: 'ajsingh.webp' },
    { id: 3, name: 'Dua Lipa', img: 'art1.jfif' },
    { id: 4, name: 'Dua Lipa', img: 'alb2.jpg' },
    { id: 5, name: 'Dua Lipa', img: 'art3.jfif' },
    { id: 6, name: 'Dua Lipa', img: 'dualipa.jfif' },
  ];

  const recentHits = [
    { id: 1, title: 'Hit 1', img: 'espresso.jpg' },
    { id: 2, title: 'Hit 2', img: 'concert.webp' },
    { id: 3, title: 'Hit 3', img: 'taylorswift.jfif' },
    { id: 4, title: 'Hit 4', img: 'anir.jpg' },
    { id: 5, title: 'Hit 5', img: 'taylorswift.jfif' },
    { id: 6, title: 'Hit 6', img: 'espresso.jpg' },
  ];

  const topGrid = [
    { id: 1, title: '❤️Liked Songs', img: "anir.jpg" },
    { id: 2, title: 'Winner', img: 'pushpa.webp' },
    { id: 3, title: 'Aagadu', img: 'aagadu.jfif' },
    { id: 4, title: 'Adhi Dha Surprisu', img: 'orange.jpg' },
    { id: 5, title: 'Manmadhudu', img: 'perfect.jpg' },
    { id: 6, title: 'MAD Square', img: 'wood.webp' },
    { id: 7, title: 'ANIMAL(Hindi)', img: 'sitaramam.webp' },
    { id: 8, title: 'Thanu (From Hit 3)', img: 'hinanna.avif' },
  ];

  const audioRef = useRef(null);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (item) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentPlayingId === item.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      audio.pause();
      audio.src = `/${item.audio}`;
      audio.load();
      audio.play();
      setCurrentPlayingId(item.id);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    };

    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center fw-bold text-primary">Welcome {username}!</h1>

      {/* Top Grid */}
      <div className="row g-3 mb-5">
        {topGrid.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="bg-dark text-white rounded d-flex align-items-center p-2 shadow-sm h-100">
              <img
                src={item.img}
                alt={item.title}
                className="flex-shrink-0"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <span className="ms-3 fw-semibold text-truncate">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mixed for You */}
      <section className="mb-5">
        <h2 className="mb-4">🎧 Mixed for You</h2>
        <div className="row g-4">
          {mixedForYou.map((item) => (
            <div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.img}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <p className="card-title mb-3 fw-semibold text-truncate">{item.title}</p>
                  <button
                    className={`btn btn-sm ${
                      currentPlayingId === item.id && isPlaying ? 'btn-danger' : 'btn-success'
                    }`}
                    onClick={() => handlePlayPause(item)}
                  >
                    {currentPlayingId === item.id && isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Favorite Artists */}
      <section className="mb-5">
        <h2 className="mb-4">🌟 Your Favorite Artists</h2>
        <div className="row g-4">
          {favoriteArtists.map((artist) => (
            <div key={artist.id} className="col-6 col-sm-4 col-md-3 col-lg-2 text-center">
              <div className="card h-100 border-0">
                <img
                  src={artist.img}
                  alt={artist.name}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body p-2">
                  <p className="card-text fw-medium text-truncate">{artist.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Hits */}
      <section>
        <h2 className="mb-4">🔥 Recent Hits</h2>
        <div className="row g-4">
          {recentHits.map((hit) => (
            <div key={hit.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={hit.img}
                  alt={hit.title}
                  className="card-img-top"
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body p-2">
                  <p className="card-text fw-semibold text-truncate">{hit.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default HomePage;
