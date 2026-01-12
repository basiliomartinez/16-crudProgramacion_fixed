import Table from "react-bootstrap/Table";
import ItemTabla from "../services/ItemTabla";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { listarServiciosApi } from "../../helpers/queries";

const Administrador = () => {
  const [servicios, setServicios] = useState([]);

  const cargarServicios = async () => {
    try {
      const resp = await listarServiciosApi();

      if (resp && resp.status === 200) {
        const data = await resp.json();
        setServicios(data);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar los servicios.",
          icon: "error",
        });
        setServicios([]);
      }
    } catch (error) {
      console.error(error);
      setServicios([]);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al cargar los servicios.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Administrar Servicios</h1>
        <Link className="btn btn-primary" to={"/administrador/crear"}>
          Crear
        </Link>
      </div>

      <Table striped bordered hover responsive className="mt-3">
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
                key={servicio._id}
                servicio={servicio}
                index={index}
                servicios={servicios}
                setServicios={setServicios}
              />
            ))
          )}
        </tbody>
      </Table>
    </main>
  );
};

export default Administrador;
