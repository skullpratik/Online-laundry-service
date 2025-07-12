// src/components/Footer.jsx
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h3>Shiv Krupa Laundry Services</h3>
          <p className="tagline">Your Trusted Laundry Partner in Vile Parle East</p>
          <p>
            <strong>Address:</strong><br />
            Opp. Siddhi Enclave, Nandapatkar Rd,<br />
            Vile Parle (East), Mumbai – 400057
          </p>
        </div>

        <div className="footer-right">
          <div className="contact-details">
            <h4>Contact</h4>
            <p><strong>Phone:</strong> <a href="tel:+919819740701">+91 98197 40701</a></p>
            <p><strong>Email:</strong> <a href="mailto:phoolchandkanojiya9819@gmail.com">phoolchandkanojiya9819@gmail.com</a></p>
            <p><strong>Hours:</strong> 8 AM – 10 PM (Mon–Sun)</p>
          </div>

          <div className="social-media">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><img src="/instagram-icon.png" alt="Instagram" /></a>
              <a href="#"><img src="/twitter-icon.png" alt="Twitter" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shiv Krupa Laundry Services. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
