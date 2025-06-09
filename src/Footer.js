const Footer = () => {
  return (
    <footer
      className="text-center text-white bg-dark py-3 mt-auto"
      style={{
        fontSize: '14px',
        boxShadow: '0 -2px 5px rgba(0,0,0,0.3)',
      }}
    >
      <p className="mb-1">© 2025 VibePlay. All rights reserved.</p>
      <p>
        <a href="/privacy" className="text-success text-decoration-none">
          Privacy Policy
        </a>
      </p>
    </footer>
  );
};

export default Footer;
