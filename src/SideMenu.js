import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function SideMenu({ selectedMenu, onMenuClick }) {
  const location = useLocation();

  const menuItems = [
    // 🔹 Your existing routes
    { name: 'Home', path: '/' },
    { name: 'Premium', path: '/premium' },
    { name: 'Search Artists', path: '/search' },
   
    { name: 'Songs', path: '/songs' },

    // 🔸 New Premium Feature Components
    { name: 'Booking Modal', path: '/booking-modal' },{ name: 'Status', path: '/status' },
    { name: 'Collateral Grid', path: '/collateral-grid' },
    // { name: 'Feedback Toast', path: '/feedback-toast' },
    { name: 'Progress Tracker', path: '/progress-tracker' },
    { name: 'Carousel Player', path: '/carousel-player' },
  ];

  return (
    <Nav className="flex-column bg-dark vh-100 p-3" style={{ width: '220px' }}>
      {menuItems.map((item) => (
        <Nav.Link
          as={Link}
          to={item.path}
          key={item.name}
          active={location.pathname === item.path}
          onClick={() => onMenuClick(item.name)}
          className={`text-white ${location.pathname === item.path ? 'fw-bold text-info' : ''}`}
        >
          {item.name}
        </Nav.Link>
      ))}
    </Nav>
  );
}

export default SideMenu;
