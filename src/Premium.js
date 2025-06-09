import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function Premium() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">💎 Go Premium</h2>
          <p className="text-muted">Unlock exclusive content and features</p>
          <p className="text-success fw-bold">$9.99 only</p>
        </div>

        <div className="text-center">
          <PayPalButtons
            style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { value: "9.99" },
                }],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                alert(`🎉 Payment successful! Welcome, ${details.payer.name.given_name}.`);
                navigate('/premium-success');
              });
            }}
            onError={(err) => {
              console.error('❌ PayPal Error:', err);
              alert('Payment failed. Please try again.');
            }}
          />
        </div>
      </Card>
    </Container>
  );
}

export default Premium;
