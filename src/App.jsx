import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import DetalleServicios from "./components/pages/DetalleServicio"
import Administrador from "./components/pages/Administrador";
import FormularioServicio from "./components/pages/FormularioServicio";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/detalle" element={<DetalleServicios></DetalleServicios>} />
        <Route path="/administrador" element={<Administrador></Administrador>} />
        <Route path="/administrador/crear" element={<FormularioServicio></FormularioServicio>} />
        <Route path="/administrador/editar" element={<FormularioServicio></FormularioServicio>} />
        
        </Routes>
        
    </BrowserRouter>
  );
}

export default App;
