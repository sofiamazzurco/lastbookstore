import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./StyleMessange.css"
import useTranslation from "../custom/useTranslation/useTranslation";

const Registered = () => {
  const navigation = useNavigate();
  const translate = useTranslation();
  const goBackHandler = () => {
    navigation("/login");
  };

  return (
    <div className="background">
      <div className="container">
        <h2 className="text">{translate("registered")}</h2>
        <p className="text">{translate("goback")}</p>
        <Button className="button" onClick={goBackHandler} variant="primary">
          {translate("back")}
        </Button>
      </div>
    </div>
  );
};

export default Registered;