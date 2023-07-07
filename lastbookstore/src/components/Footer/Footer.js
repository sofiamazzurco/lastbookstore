import React, { useState, useContext } from "react";
import { ThemeContext } from "../services/theme/theme.context";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css"


const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  
  const handleReportProblem = () => {
    // Redirige al usuario a la página del formulario de reporte
    navigate('/reportProblem');
  };

  return (
    <footer className={`footer ${theme === "dark" && "footer-dark"}`}>
      
      <div className="footer-content">
        <p>© 2023 Biblioteca Virtual UTN. Todos los derechos reservados.</p>
        <div className="report-problem">

        <div className="social-icons">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
          <span>Reportar un problema</span>
          <button className="report-button" onClick={handleReportProblem}>
            Reportar
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
