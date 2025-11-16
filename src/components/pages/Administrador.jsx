import Table from 'react-bootstrap/Table';
import ItemTabla from '../services/ItemTabla';
import { Button } from 'react-bootstrap';

const Administrador = () => {
    return (
    <main className='container my-4'>
        <div className='d-flex justify-content-between align-items-center'>
        <h1>Administrar Servicios</h1>
<Button>Crear</Button>
</div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Servicio</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
    <ItemTabla></ItemTabla>
    </tbody>
    </Table>
    </main>
    );
};

export default Administrador;