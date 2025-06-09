import React, { useState } from 'react';
import { Table, Container, Badge, Button, Modal } from 'react-bootstrap';

function Status({ tickets, onCancel }) {
  const [showModal, setShowModal] = useState(false);
  const [pendingCancelIndex, setPendingCancelIndex] = useState(null);

  const handleShowModal = (index) => {
    setPendingCancelIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPendingCancelIndex(null);
  };

  const handleConfirmCancel = () => {
    if (typeof onCancel === 'function' && pendingCancelIndex !== null) {
      onCancel(pendingCancelIndex);
    }
    handleCloseModal();
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center text-primary fw-bold">🎟️ Your Bookings</h2>

      {tickets.length === 0 ? (
        <p className="text-muted text-center">No bookings yet.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Artist</th>
                <th>Date</th>
                <th>Venue</th>
                <th>User</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ticket.artist}</td>
                  <td>{ticket.concertDate}</td>
                  <td>{ticket.address}</td>
                  <td>{ticket.user}</td>
                  <td>{ticket.email}</td>
                  <td><Badge bg="success">Booked</Badge></td>
                  <td>
                    <Button variant="outline-danger" onClick={() => handleShowModal(index)}>
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Confirmation Modal */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Cancellation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to cancel this booking?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                No, Keep Booking
              </Button>
              <Button variant="danger" onClick={handleConfirmCancel}>
                Yes, Cancel Booking
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Status;
