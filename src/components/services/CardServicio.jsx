import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardServicio = ({ servicio }) => {
  return (
    <Col>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={servicio.imagen}
          alt={servicio.servicio}
          style={{ objectFit: "cover", height: "180px" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{servicio.servicio}</Card.Title>
          <Card.Text className="flex-grow-1">{servicio.descripcion_breve}</Card.Text>
          <Card.Text className="fw-bold">
            Precio: ${Number(servicio.precio).toLocaleString("es-AR")}
          </Card.Text>
          <Link className="btn btn-primary" to={`/detalle/${servicio.id}`}>
            Ver detalle
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardServicio;