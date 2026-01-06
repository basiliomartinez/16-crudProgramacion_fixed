import { Row } from "react-bootstrap";
import CardServicio from "../services/CardServicio";

const Inicio = ({ servicios }) => {
  return (
    <main className="container my-4">
      <h1>Catálogo de servicios</h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {servicios.length === 0 ? (
          <p className="mt-3">
            Todavía no hay servicios. Ingresá como admin para crear el primero.
          </p>
        ) : (
          servicios.map((servicio) => (
            <CardServicio key={servicio.id} servicio={servicio} />
          ))
        )}
      </Row>
    </main>
  );
};

export default Inicio;