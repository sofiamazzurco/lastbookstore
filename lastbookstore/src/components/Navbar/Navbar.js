import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import ToggleTheme from "../ui/ToggleTheme";

const Navbar = () => {
  const navigation = useNavigate();

  const onLogoutHandler = () => {
    navigation("/login");
  };

  const goToHome = () => {
    navigation("/home");
  };

  return (
    <div className='navbar'>
      <h1 onClick={goToHome}>BIBLIOTECA UTN</h1>
      <Row className="me-2 my-4">
        <Col md={3} className="d-flex justify-content-end">
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
