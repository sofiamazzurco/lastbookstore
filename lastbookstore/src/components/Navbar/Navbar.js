import React from 'react';
import { useContext } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import ToggleTheme from '../ui/ToggleTheme';
import { ThemeContext } from "../services/theme/theme.context";
import "./Navbar.css"

const Navbar = () => {
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);

  const onLogoutHandler = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation("/login");
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className='navbar'>
      <div className={`img ${theme === "dark" && "img-dark"}`}>
          <img src="https://utn.edu.ar/images/logo-utn.png" />
        </div>
      <Row className="me-2 my-4">
        <Col md={3} className="d-flex flex-row justify-content-end">
          <ToggleTheme />
          <Button className="ms-4" variant="primary" onClick={onLogoutHandler}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;