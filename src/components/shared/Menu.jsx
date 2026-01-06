import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navigate = useNavigate();

  const manejarLogout = () => {
    // Apagar sesión
    setUsuarioLogueado(false);
    // Limpiar localStorage
    localStorage.removeItem("usuarioLogueado");
    // Volver al inicio
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        {/* BRAND */}
        <Navbar.Brand as={NavLink} to="/">
          CRUD Servicios
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>

            {!usuarioLogueado ? (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/administrador">
                Administrador
              </Nav.Link>
            )}
          </Nav>

          {usuarioLogueado && (
            <Button
              variant="outline-light"
              onClick={manejarLogout}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
