import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./StyleMessange.css"
import useTranslation from "../custom/useTranslation/useTranslation";

const NotFound = () => {
  const navigation = useNavigate();
  const translate = useTranslation();

  const goBackHandler = () => {
    navigation("/login");
  };

  return (
    <div className="background">
      <div className="container">
        <h2>La pagina no esta disponible</h2>
        <Button className="button" onClick={goBackHandler}>
          Volver al Login
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
