import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from 'react-icons/fa'
import { MdEmail, MdPhone } from 'react-icons/md'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Travel Explorer</h3>
          <p className="footer__description">
            Descubre experiencias únicas y auténticas en toda Colombia
          </p>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Contacto</h4>
          <div className="footer__contact">
            <a href="mailto:info@travelexplorer.com" className="footer__link">
              <MdEmail /> info@travelexplorer.com
            </a>
            <a href="tel:+573001234567" className="footer__link">
              <MdPhone /> +57 300 123 4567
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h4 className="footer__heading">Síguenos</h4>
          <div className="footer__social">
            <a href="#" className="footer__social-link">
              <FaFacebook />
            </a>
            <a href="#" className="footer__social-link">
              <FaInstagram />
            </a>
            <a href="#" className="footer__social-link">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {currentYear} Travel Explorer. Hecho con <FaHeart className="footer__heart" /> en Colombia
        </p>
      </div>
    </footer>
  )
}
