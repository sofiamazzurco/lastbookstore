
import './Navbar.css';
import { useNavigate } from 'react-router';
import { Button, Col, Row } from "react-bootstrap";
import ToggleTheme from "../ui/ToggleTheme";

const Navbar = () => {

  const navigation = useNavigate();


  const onLogoutHandler = () => {
    navigation("/login");
  };

  return (
    <div className='navbar'>
      <h1>BIBLIOTECA UTN</h1>
      <Row className="me-2 my-4">
        <Col>
          <h4 className="text-left m-3">Hola denuevo</h4>
        </Col>
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

