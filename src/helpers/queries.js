const urlServicios = import.meta.env.VITE_SERVICIO;

// LISTAR
export const listarServiciosApi = async () => {
  try {
    const respuesta = await fetch(urlServicios, { cache: "no-store" });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// CREAR
export const crearServiciosApi = async (servicio) => {
  try {
    const respuesta = await fetch(urlServicios, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicio),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// BORRAR
export const borrarServiciosApi = async (id) => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// OBTENER 1 POR ID (GET /:id)
export const obtenerServicioApi = async (id) => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`, { cache: "no-store" });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

// EDITAR (PUT /:id)
export const editarServicioApi = async (id, servicioEditado) => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicioEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
