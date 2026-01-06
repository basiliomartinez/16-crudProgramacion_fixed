import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  // ============================
  // CRUD Servicios (LocalStorage)
  // ============================
  const serviciosLocalStorage =
    JSON.parse(localStorage.getItem("listaServicios")) || [];

  const [servicios, setServicios] = useState(serviciosLocalStorage);

  useEffect(() => {
    localStorage.setItem("listaServicios", JSON.stringify(servicios));
  }, [servicios]);

  const agregarServicio = (nuevoServicio) => {
    const servicioConId = {
      ...nuevoServicio,
      id: crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    };
    setServicios([...servicios, servicioConId]);
  };

  const editarServicio = (id, servicioEditado) => {
    const serviciosActualizados = servicios.map((item) =>
      item.id === id ? { ...item, ...servicioEditado, id } : item
    );
    setServicios(serviciosActualizados);
  };

  const borrarServicio = (id) => {
    const serviciosFiltrados = servicios.filter((item) => item.id !== id);
    setServicios(serviciosFiltrados);
  };

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
        <Route path="/" element={<Inicio servicios={servicios} />} />

        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />

        <Route
          path="/detalle/:id"
          element={<DetalleServicio servicios={servicios} />}
        />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/administrador"
          element={<ProtectorRutas usuarioLogueado={usuarioLogueado} />}
        >
          <Route
            index
            element={
              <Administrador servicios={servicios} borrarServicio={borrarServicio} />
            }
          />
          <Route
            path="crear"
            element={<FormularioServicio agregarServicio={agregarServicio} />}
          />
          <Route
            path="editar/:id"
            element={
              <FormularioServicio
                servicios={servicios}
                editarServicio={editarServicio}
              />
            }
          />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
