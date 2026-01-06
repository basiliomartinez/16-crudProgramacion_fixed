import { useParams, Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

const DetalleServicio = ({ servicios }) => {
  const { id } = useParams();

  const servicio = servicios.find((item) => item.id === id);

  if (!servicio) {
    return (
      <main className="container my-4">
        <h1>Servicio no encontrado</h1>
        <p>Puede que haya sido eliminado o que el enlace esté mal.</p>
        <Link className="btn btn-primary" to={"/"}>
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
        <div>
          <h1 className="mb-2">{servicio.servicio}</h1>
          <Badge bg="secondary">{servicio.categoria}</Badge>
        </div>
        <Link className="btn btn-outline-primary" to={"/"}>
          Volver
        </Link>
      </div>

      <hr />

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <img
            src={servicio.imagen}
            alt={servicio.servicio}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-12 col-lg-6">
          <h4 className="fw-bold">
            Precio: ${Number(servicio.precio).toLocaleString("es-AR")}
          </h4>
          <p className="mt-3">{servicio.descripcion_amplia}</p>
        </div>
      </div>
    </main>
  );
};

export default DetalleServicio;
