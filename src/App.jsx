import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import DetalleServicios from "./components/pages/DetalleServicio"
import Administrador from "./components/pages/Administrador";
import FormularioServicio from "./components/pages/FormularioServicio";
import Error404 from "./components/pages/Error404";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";


function App() {
  return (
    <BrowserRouter>
    <Menu></Menu>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/detalle" element={<DetalleServicios></DetalleServicios>} />
        <Route path="/administrador" element={<Administrador></Administrador>} />
        <Route path="/administrador/crear" element={<FormularioServicio></FormularioServicio>} />
        <Route path="/administrador/editar" element={<FormularioServicio></FormularioServicio>} />
        <Route path="*" element={<Error404></Error404>} />
        </Routes>
        <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
