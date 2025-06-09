import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';

function FeedbackToast({ show, onClose, message }) {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{ zIndex: 1055 }}
    >
      <Toast
        onClose={onClose}
        show={show}
        delay={3500}
        autohide
        bg="success"
        style={{ minWidth: '280px' }}
      >
        <Toast.Header closeButton={false} className="bg-success text-white border-0">
          <CheckCircleFill className="me-2" />
          <strong className="me-auto">Success</strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default FeedbackToast;
