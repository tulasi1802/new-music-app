// BookingStatus.jsx
import React from 'react';
import { Table, Container } from 'react-bootstrap';

function BookingStatus({ bookings }) {
  return (
    <Container className="py-4">
      <h4 className="text-success mb-3">Your Bookings</h4>
      {bookings.length === 0 ? (
        <p className="text-muted">No bookings yet. Book your favorite artist now!</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Artist</th>
              <th>Concert Date</th>
              <th>Address</th>
              <th>User</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{b.artist}</td>
                <td>{b.concertDate}</td>
                <td>{b.address}</td>
                <td>{b.user}</td>
                <td>{b.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default BookingStatus;
