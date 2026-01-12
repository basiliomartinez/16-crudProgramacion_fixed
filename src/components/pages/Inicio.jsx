import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { listarServiciosApi } from "../../helpers/queries";
import CardServicio from "../services/CardServicio";

const Inicio = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const resp = await listarServiciosApi();
        if (resp && resp.status === 200) {
          const data = await resp.json();
          setServicios(data);
        } else {
          setServicios([]);
          Swal.fire({
            title: "Error",
            text: "No se pudieron cargar los servicios.",
            icon: "error",
          });
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

    cargar();
  }, []);

  return (
    <main className="container my-4">
      <h1>Servicios</h1>

      {servicios.length === 0 ? (
        <p>No hay servicios cargados.</p>
      ) : (
        <div className="row">
          {servicios.map((servicio) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={servicio._id}>
              <CardServicio servicio={servicio} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Inicio;
