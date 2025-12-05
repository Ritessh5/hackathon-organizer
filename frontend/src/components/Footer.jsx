import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Contact Section */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> eesa.engg@somaiya.edu</p>
          <p><FaEnvelope /> nathan.v@somaiya.edu</p>
          <p><FaPhone /> +91 7021316267</p>
          <p><FaPhone /> +91 9820279762</p>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/ecesa_kjsce/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="social-icon instagram" />
            </a>

            <a
              href="https://www.linkedin.com/company/e-cesakjsce"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="social-icon linkedin" />
            </a>
          </div>
        </div>

      </div>

      <p className="footer-bottom">
        © {new Date().getFullYear()} E-CESA • Somaiya Vidyavihar University
      </p>
    </footer>
  );
}
