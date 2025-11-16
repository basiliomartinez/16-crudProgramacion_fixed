import { Card, Button, Col } from 'react-bootstrap';


const CardServicio = () => {
    return (
    <Col>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg" />
      <Card.Body>
        <Card.Title>Sitio Web Institucional (5-7 Paginas)</Card.Title>
        <Card.Text>
                   Web profesional *responsive* con secciones clave: Inicio, Servicios, Quiénes Somos, Contacto y Blog (sin funcionalidad de publicación).
        </Card.Text>
        <Card.Text>  
            Precio: $ 300.000
        </Card.Text>
        <Button variant="primary">Ver detalle</Button>
      </Card.Body>
    </Card>
    </Col>
    );
};

export default CardServicio;