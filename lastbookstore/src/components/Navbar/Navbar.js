import React from 'react';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import ToggleTheme from "../ui/ToggleTheme";
import { ThemeContext } from "../services/theme/theme.context";
import { getAuth, signOut } from 'firebase/auth';
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


  const goToHome = () => {
    navigation("/home");
  };


  return (
    <div className={`navbar ${theme === "dark" && "navbar-dark"}`}>
      <div className={`img ${theme === "dark" && "img-dark"}`}>
          <img src="https://utn.edu.ar/images/logo-utn.png" />
        </div>
        <div>
        <ToggleTheme />
          <Button className="ms-3 me-2 w-5" variant="primary" onClick={onLogoutHandler}>
            Cerrar sesión
          </Button>
        </div>
    </div>
  );
};

export default Navbar;
