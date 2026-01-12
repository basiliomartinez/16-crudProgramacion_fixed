import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { borrarServiciosApi } from "../../helpers/queries";

const ItemTabla = ({ servicio, index, servicios, setServicios }) => {
  const confirmarBorrado = () => {
    Swal.fire({
      title: "¿Borrar servicio?",
      text: `Se eliminará: ${servicio.servicio}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await borrarServiciosApi(servicio._id);

        if (resp && resp.status === 200) {
          Swal.fire({
            title: "Listo",
            text: "Servicio eliminado.",
            icon: "success",
          });

          const serviciosActualizados = servicios.filter(
            (item) => item._id !== servicio._id
          );
          setServicios(serviciosActualizados);
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el servicio.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{servicio.servicio}</td>
      <td>${Number(servicio.precio).toLocaleString("es-AR")}</td>
      <td>
        <Link className="btn btn-warning me-2" to={`/administrador/editar/${servicio._id}`}>
          Editar
        </Link>
        <Button variant="danger" onClick={confirmarBorrado}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemTabla;
