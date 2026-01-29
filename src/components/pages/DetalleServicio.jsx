import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerServicioApi } from "../../helpers/queries.js";

const DetalleServicio = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const resp = await obtenerServicioApi(id);
      if (resp && resp.status === 200) {
        const data = await resp.json();
        setServicio(data);
      } else {
        setServicio(null);
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el detalle del servicio.",
          icon: "error",
        });
      }
    };

    cargar();
  }, [id]);

  if (!servicio) {
    return (
      <main className="container my-4">
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main className="container my-4">
      <h1>{servicio.servicio}</h1>
      <p><b>Precio:</b> ${Number(servicio.precio).toLocaleString("es-AR")}</p>
      <p><b>Categoría:</b> {servicio.categoria}</p>
      <p><b>Descripción breve:</b> {servicio.descripcion_breve}</p>
      <p><b>Descripción amplia:</b> {servicio.descripcion_amplia}</p>
      <img
        src={servicio.imagen}
        alt={servicio.servicio}
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      />
    </main>
  );
};

export default DetalleServicio;
