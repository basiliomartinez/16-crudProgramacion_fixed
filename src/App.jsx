import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Administrador from "./components/pages/Administrador";
import DetalleServicio from "./components/pages/DetalleServicio";
import FormularioServicio from "./components/pages/FormularioServicio";
import Error404 from "./components/pages/Error404";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import { useEffect, useState } from "react";
import ProtectorRutas from "./components/routes/ProtectorRutas";

function App() {
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || false;

  const [usuarioLogueado, setUsuarioLogueado] =
    useState(usuarioSessionStorage);

  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />

        <Route path="/detalle" element={<DetalleServicio />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/administrador"
          element={<ProtectorRutas usuarioLogueado={usuarioLogueado} />}
        >
          <Route index element={<Administrador />} />
          <Route path="crear" element={<FormularioServicio />} />
          <Route path="editar" element={<FormularioServicio />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
