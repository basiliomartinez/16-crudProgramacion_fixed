import Table from "react-bootstrap/Table";
import ItemTabla from "../services/ItemTabla";
import { Link } from "react-router-dom";

const Administrador = ({ servicios, borrarServicio }) => {
  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Administrar Servicios</h1>
        <Link className="btn btn-primary" to={"/administrador/crear"}>
          Crear
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No hay servicios cargados.
              </td>
            </tr>
          ) : (
            servicios.map((servicio, index) => (
              <ItemTabla
                key={servicio.id}
                servicio={servicio}
                index={index}
                borrarServicio={borrarServicio}
              />
            ))
          )}
        </tbody>
      </Table>
    </main>
  );
};

export default Administrador;