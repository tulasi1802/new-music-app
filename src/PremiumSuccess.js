import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PremiumSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container p-4 text-center">
      <h2 className="text-success">✅ Payment Successful</h2>
      <p>Thank you for upgrading to Premium!</p>
      <p>🎵 Enjoy listening! 🎧</p>
      <p>Redirecting you to the homepage...</p>
    </div>
  );
}

export default PremiumSuccess;
