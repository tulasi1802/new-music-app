// import React, { useState } from 'react';
// import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

// function BookTickets({ onBook }) {
//   const artists = [
//     {
//       id: 1,
//       name: 'Taylor Swift',
//       url: 'taylorswift.jfif', 
//       concerts: [
//         { region: 'New York', date: '2025-07-10' },
//         { region: 'Los Angeles', date: '2025-07-15' },
//       ],
//     },
//     {
//       id: 2,
//       name: 'The Weeknd',
//       url: 'weekend.jfif',
//       concerts: [
//         { region: 'Chicago', date: '2025-08-05' },
//         { region: 'Houston', date: '2025-08-10' },
//       ],
//     },
//   ];

//   const [selectedArtist, setSelectedArtist] = useState(null);
//   const [selectedConcert, setSelectedConcert] = useState(null);
//   const [ticketsCount, setTicketsCount] = useState(1);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');

//   function handleBookClick() {
//     if (!selectedArtist || !selectedConcert) {
//       setMessageType('danger');
//       setMessage('Please select artist and concert.');
//       return;
//     }
//     if (ticketsCount < 1) {
//       setMessageType('danger');
//       setMessage('Enter a valid number of tickets.');
//       return;
//     }
//     setMessage('');
//     setShowUserForm(true);
//   }

//   function handleUserSubmit(e) {
//     e.preventDefault();

//     if (!userName.trim() || !userEmail.trim()) {
//       setMessageType('danger');
//       setMessage('Please enter your name and email.');
//       return;
//     }

//     const ticket = {
//       artistName: selectedArtist.name,
//       region: selectedConcert.region,
//       date: selectedConcert.date,
//       tickets: ticketsCount,
//       userName,
//       userEmail,
//       id: Date.now(),
//     };

//     onBook(ticket);
//     setMessageType('success');
//     setMessage('Tickets booked successfully!');

//     setShowUserForm(false);
//     setTimeout(() => {
//       setSelectedArtist(null);
//       setSelectedConcert(null);
//       setTicketsCount(1);
//       setUserName('');
//       setUserEmail('');
//       setMessage('');
//       setMessageType('');
//     }, 3000);
//   }

//   return (
//     <Container className="my-4">
//       <h2 className="mb-4 text-center">Book Concert Tickets</h2>

//       {message && (
//         <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
//           {message}
//         </Alert>
//       )}

//       <Row className="mb-4">
//         {artists.map((artist) => (
//           <Col key={artist.id} xs={12} md={6} lg={4} className="mb-3">
//             <Card
//               onClick={() => {
//                 setSelectedArtist(artist);
//                 setSelectedConcert(null);
//                 setMessage('');
//                 setShowUserForm(false);
//               }}
//               className={`h-100 shadow-sm cursor-pointer ${selectedArtist?.id === artist.id ? 'border-primary' : ''}`}
//               style={{ cursor: 'pointer' }}
//             >
//               <Card.Img variant="top" src={artist.url} alt={artist.name} style={{ height: '200px', objectFit: 'cover' }} />
//               <Card.Body>
//                 <Card.Title className="text-center">{artist.name}</Card.Title>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {selectedArtist && (
//         <Form>
//           <h4 className="mb-3">Choose Concert for {selectedArtist.name}:</h4>
//           <Form.Group className="mb-3" controlId="concertSelect">
//             <Form.Select
//               value={selectedConcert ? JSON.stringify(selectedConcert) : ''}
//               onChange={(e) => {
//                 setSelectedConcert(JSON.parse(e.target.value));
//                 setMessage('');
//                 setShowUserForm(false);
//               }}
//             >
//               <option value="">-- Select Concert --</option>
//               {selectedArtist.concerts.map((concert, index) => (
//                 <option key={index} value={JSON.stringify(concert)}>
//                   {concert.region} - {concert.date}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="ticketsCount">
//             <Form.Label>Number of Tickets:</Form.Label>
//             <Form.Control
//               type="number"
//               min="1"
//               value={ticketsCount}
//               onChange={(e) => {
//                 setTicketsCount(parseInt(e.target.value) || 1);
//                 setMessage('');
//                 setShowUserForm(false);
//               }}
//             />
//           </Form.Group>

//           {!showUserForm && (
//             <Button variant="primary" onClick={handleBookClick} className="mb-4">
//               Book Tickets
//             </Button>
//           )}
          

//           {showUserForm && (
//             <>
//               <h4 className="mb-3">Enter Your Details</h4>
//               <Form.Group className="mb-3" controlId="userName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="userEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={userEmail}
//                   onChange={(e) => setUserEmail(e.target.value)}
//                 />
//               </Form.Group>

//               <Button variant="success" type="submit" onClick={handleUserSubmit}>
//                 Confirm Booking
//               </Button>
//             </>
//           )}
//         </Form>
//       )}
//     </Container>
//   );
// }

// export default BookTickets;
