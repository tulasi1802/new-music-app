import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import Login from './Login';
import HomePage from './HomePage';
import Premium from './Premium';
import PremiumSuccess from './PremiumSuccess';
import Status from './Status';
import SearchArtists from './SearchArtists';
import FavoriteArtists from './FavoriteArtists';
import SongsPage from './SongsPage';
import Mixes from './Mixes';
import ArtistDetail from './ArtistDetail';
import BookTickets from './BookTickets';

// Extra Feature Components
import BookingModal from './BookingModal';
import CollateralGrid from './CollateralGrid';
import FeedbackToast from './FeedbackToast';
import ProgressTracker from './ProgressTracker';
import CarouselPlayer from './CarouselPlayer';

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username'));
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [tickets, setTickets] = useState(() => {
    const stored = localStorage.getItem('tickets');
    return stored ? JSON.parse(stored) : [];
  });

  // Save username to localStorage when it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  // Save tickets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleLogin = (user) => {
    setUsername(user);
  };

  const handleLogout = () => {
    setUsername(null);
    setTickets([]);
    localStorage.clear();
  };

  const handleBook = (ticket) => {
    console.log("Booked Ticket:", ticket);
    setTickets((prev) => [...prev, ticket]);
    setSelectedMenu('Status');
  };

  const handleCancel = (index) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="d-flex vh-100">
      <SideMenu selectedMenu={selectedMenu} onMenuClick={setSelectedMenu} />
      <div className="flex-grow-1 d-flex flex-column">
        <Header username={username} onLogout={handleLogout} />

        <main className="flex-grow-1 overflow-auto p-3 bg-light">
          <Routes>
            {/* Main App Routes */}
            <Route path="/" element={<HomePage username={username} />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/premium-success" element={<PremiumSuccess />} />
            <Route path="/search" element={<SearchArtists />} />
            <Route path="/favorites" element={<FavoriteArtists />} />
            <Route path="/mixes" element={<Mixes />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
            <Route path="/book-tickets" element={<BookTickets onBook={handleBook} />} />
            <Route path="/status" element={<Status tickets={tickets} onCancel={handleCancel} />} />

            {/* Demo / Bootstrap Feature Routes */}
            <Route path="/booking-modal" element={<BookingModal onBook={handleBook} />} />
            <Route path="/collateral-grid" element={<CollateralGrid />} />
            <Route path="/feedback-toast" element={<FeedbackToast />} />
            <Route path="/progress-tracker" element={<ProgressTracker />} />
            <Route path="/carousel-player" element={<CarouselPlayer />} />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
