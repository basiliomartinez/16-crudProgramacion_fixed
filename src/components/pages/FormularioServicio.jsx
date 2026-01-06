import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioServicio = ({ agregarServicio, editarServicio, servicios = [] }) => {
  const { id } = useParams();
  const navegacion = useNavigate();

  const servicioAEditar = useMemo(() => {
    if (!id) return null;
    return servicios.find((item) => item.id === id) || null;
  }, [id, servicios]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      servicio: "",
      precio: "",
      imagen: "",
      categoria: "",
      descripcion_breve: "",
      descripcion_amplia: "",
    },
  });

  useEffect(() => {
    if (servicioAEditar) {
      reset({
        servicio: servicioAEditar.servicio,
        precio: servicioAEditar.precio,
        imagen: servicioAEditar.imagen,
        categoria: servicioAEditar.categoria,
        descripcion_breve: servicioAEditar.descripcion_breve,
        descripcion_amplia: servicioAEditar.descripcion_amplia,
      });
    }
  }, [servicioAEditar, reset]);

  const onSubmit = (data) => {
    if (id && editarServicio) {
      editarServicio(id, data);
      Swal.fire({
        title: "Servicio actualizado",
        text: "Los cambios se guardaron correctamente.",
        icon: "success",
      });
    } else if (agregarServicio) {
      agregarServicio(data);
      Swal.fire({
        title: "Servicio creado",
        text: "Se agregó un nuevo servicio al catálogo.",
        icon: "success",
      });
    }

    navegacion("/administrador");
  };

  return (
    <main className="container my-4">
      <h1>{id ? "Editar servicio" : "Crear servicio"}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Servicio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Diseño de sitio web institucional"
            {...register("servicio", {
              required: "El servicio es un dato obligatorio",
              minLength: {
                value: 5,
                message: "El servicio debe contener como minimo 5 caracteres",
              },
              maxLength: {
                value: 100,
                message: "El servicio debe contener como maximo 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.servicio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            // step={0.1}
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: {
                value: 50,
                message:
                  "El precio minimo del producto debe ser de almenos $50",
              },
              max: {
                value: 1000000,
                message:
                  "El precio maximo de un producto debe ser de hasta $1000000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/image/"
            {...register("imagen", {
              required: "La url de la imagen es un dato obligatorio",
              pattern: {
                value: /^(https?:\/\/.*\.(?:jpg|jpeg|png|webp))(?:\?.*)?$/i,
                message:
                  "La imagen debe ser una url de imagen valida terminada en (jpg|jpeg|png|webp)",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe seleccionar una categoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Infusiones">Desarrollo Web</option>
            <option value="Batidos">Backend & API</option>
            <option value="dulce">Consultoría</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Web profesional *responsive* con secciones clave: Inicio, Servicios, Quiénes Somos, Contacto y Blog (sin funcionalidad de publicación)"
            as="textarea"
            {...register("descripcion_breve", {
              required: "La descripción breve es un dato obligatorio",
              minLength: {
                value: 5,
                message: "La descrición breve debe tener almenos 5 caracteres",
              },
              maxLength: {
                value: 250,
                message:
                  "La descrición breve debe tener como máximo 250 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_breve?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Descripción Amplia*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Desarrollo de un sitio web corporativo **moderno y optimizado para SEO**. Incluye diseño personalizado basado en plantillas, integración de formulario de contacto, galería de imágenes, y hasta 7 páginas principales. Ideal para empresas que necesitan una fuerte presencia digital."
            as="textarea"
            rows={4}
            {...register("descripcion_amplia", {
              required: "La descripción amplia es un dato obligatorio",
              minLength: {
                value: 10,
                message:
                  "La descrición amplia debe tener almenos 10 caracteres",
              },
              maxLength: {
                value: 500,
                message:
                  "La descrición amplia debe tener como máximo 500 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion_amplia?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? "Guardar cambios" : "Crear"}
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="ms-2"
          onClick={() => navegacion("/administrador")}
        >
          Cancelar
        </Button>
      </Form>
    </main>
  );
};

export default FormularioServicio;
