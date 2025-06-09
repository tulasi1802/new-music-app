import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ username, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
        <Nav className="ms-auto">
          <Navbar.Text className="me-3">Signed in as: {username}</Navbar.Text>
          <Nav.Link onClick={onLogout} className="text-white" style={{ cursor: 'pointer' }}>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
