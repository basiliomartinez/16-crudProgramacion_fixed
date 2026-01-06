import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ItemTabla = ({ servicio, index, borrarServicio }) => {
  const confirmarBorrado = () => {
    Swal.fire({
      title: "¿Borrar servicio?",
      text: `Se eliminará: ${servicio.servicio}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarServicio(servicio.id);
        Swal.fire({
          title: "Listo",
          text: "Servicio eliminado.",
          icon: "success",
        });
      }
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{servicio.servicio}</td>
      <td>${Number(servicio.precio).toLocaleString("es-AR")}</td>
      <td>
        <Link
          className="btn btn-warning me-2"
          to={`/administrador/editar/${servicio.id}`}
        >
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