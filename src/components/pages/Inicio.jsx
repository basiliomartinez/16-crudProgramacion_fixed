import { Row } from "react-bootstrap";
import CardServicio from "../services/CardServicio";

const Inicio = () => {
    return (
 <main className="container my-4">
    <h1>Catalogo de servicios</h1>
    <Row xs={1} md={3} lg={4} className= "g-4">
     <CardServicio></CardServicio>
     </Row>
 </main>
    );
};

export default Inicio; 