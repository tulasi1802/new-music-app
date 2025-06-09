import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import App1 from './ProductTable/App1'; // Uncomment only if you need it
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Replace with your actual sandbox client ID
const CLIENT_ID = "AcExVHg28T9-NlGn2_jAscB0HfKyYZChwZ5qBQpalgxdEmwmi2jF66AqnwbZIHQbKqJnuErdk-oN3Dpb";

const initialOptions = {
  "client-id": CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <App />
        {/* <App1 /> */} {/* Use only if you want to display ProductTable separately */}
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
);

// For performance measurement
reportWebVitals();
