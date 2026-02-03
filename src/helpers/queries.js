const urlServicios = import.meta.env.VITE_SERVICIO;
const urlUsuarios = import.meta.env.VITE_USUARIO;

// LISTAR
export const listarServiciosApi = async () => {
  try {
    const respuesta = await fetch(urlServicios, { cache: "no-store" });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// CREAR (POST) con FormData
export const crearServicioApi = async (servicio) => {
  try {
    const formData = new FormData();
    formData.append("servicio", servicio.servicio);
    formData.append("precio", servicio.precio);
    formData.append("categoria", servicio.categoria);
    formData.append("descripcion_breve", servicio.descripcion_breve);
    formData.append("descripcion_amplia", servicio.descripcion_amplia);

    // imagen obligatoria en crear
    if (servicio.imagen) {
      formData.append("imagen", servicio.imagen);
    }

    const token = JSON.parse(sessionStorage.getItem("usuarioKey"))?.token;

    const respuesta = await fetch(urlServicios, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// BORRAR (DELETE)
export const borrarServiciosApi = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("usuarioKey"))?.token;

    const respuesta = await fetch(`${urlServicios}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// OBTENER 1 POR ID (GET /:id)
export const obtenerServicioApi = async (id) => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`, {
      cache: "no-store",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// EDITAR (PUT /:id) con FormData
export const editarServicioApi = async (id, servicioEditado) => {
  try {
    const formData = new FormData();
    formData.append("servicio", servicioEditado.servicio);
    formData.append("precio", servicioEditado.precio);
    formData.append("categoria", servicioEditado.categoria);
    formData.append("descripcion_breve", servicioEditado.descripcion_breve);
    formData.append("descripcion_amplia", servicioEditado.descripcion_amplia);

    // SOLO mando imagen si el usuario eligió una nueva
    if (servicioEditado.imagen) {
      formData.append("imagen", servicioEditado.imagen);
    }

    const token = JSON.parse(sessionStorage.getItem("usuarioKey"))?.token;

    const respuesta = await fetch(`${urlServicios}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// LOGIN
export const login = async (usuario) => {
  try {
    const respuesta = await fetch(urlUsuarios + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
