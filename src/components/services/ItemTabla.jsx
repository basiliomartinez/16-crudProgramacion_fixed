import { Button } from "react-bootstrap";

 
 const ItemTabla = () => {
    return (
  <tr>
          <td>1</td>
          <td>Ecommerce</td>
          <td>$300.000</td>
          <td>
<Button variant="warning" className="me-3">Editar</Button>
<Button variant="danger">Borrar</Button>

          </td>
        </tr>
    );
 };
 
 export default ItemTabla;