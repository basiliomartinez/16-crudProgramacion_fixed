import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  crearServiciosApi,
  editarServicioApi,
  obtenerServicioApi,
} from "../../helpers/queries";

const FormularioServicio = () => {
  const { id } = useParams();
  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    resetField, //agregar el reset del input tipo field
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

  // Si hay ID => cargar servicio desde el backend y precargar el form
  useEffect(() => {
    const cargarServicio = async () => {
      if (!id) return;

      const resp = await obtenerServicioApi(id);
      if (resp && resp.status === 200) {
        const data = await resp.json();
        reset({
          servicio: data.servicio,
          precio: data.precio,
          imagen: data.imagen,
          categoria: data.categoria,
          descripcion_breve: data.descripcion_breve,
          descripcion_amplia: data.descripcion_amplia,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el servicio a editar.",
          icon: "error",
        });
        navegacion("/administrador");
      }
    };

    cargarServicio();
  }, [id, reset, navegacion]);

  const onSubmit = async (data) => {
    // EDITAR
    if (id) {
      const resp = await editarServicioApi(id, data);

      if (resp && resp.status === 200) {
        Swal.fire({
          title: "Servicio actualizado",
          text: "Los cambios se guardaron correctamente.",
          icon: "success",
        });
        navegacion("/administrador");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el servicio.",
          icon: "error",
        });
      }
      return;
    }

    // CREAR
    const respCrear = await crearServiciosApi(data);

    if (respCrear && respCrear.status === 201) {
      Swal.fire({
        title: "Servicio creado",
        text: "Se agregó un nuevo servicio al catálogo.",
        icon: "success",
      });
      reset();
      navegacion("/administrador");
    } else {
      Swal.fire({
        title: "Error",
        text: "El servicio no fue creado.",
        icon: "error",
      });
    }
  };

  return (
    <main className="container my-4">
      <h1>{id ? "Editar servicio" : "Crear servicio"}</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formServicio">
          <Form.Label>Servicio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Diseño de sitio web institucional"
            {...register("servicio", {
              required: "El servicio es un dato obligatorio",
              minLength: { value: 5, message: "El servicio debe tener mínimo 5 caracteres" },
              maxLength: { value: 100, message: "El servicio debe tener máximo 100 caracteres" },
            })}
          />
          <Form.Text className="text-danger">{errors.servicio?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: { value: 50, message: "El precio mínimo debe ser $50" },
              max: { value: 1000000, message: "El precio máximo debe ser $1.000.000" },
            })}
          />
          <Form.Text className="text-danger">{errors.precio?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://images.pexels.com/photos/...jpeg?_gl=..."
            {...register("imagen", {
              required: "La url de la imagen es obligatoria",
              pattern: {
                value: /^(https?:\/\/.*\.(?:jpg|jpeg|png|webp))(?:\?.*)?$/i,
                message: "Debe ser una URL válida terminada en jpg|jpeg|png|webp",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.imagen?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", { required: "Debe seleccionar una categoría" })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Desarrollo Web">Desarrollo Web</option>
            <option value="Backend y API">Backend & API</option>
            <option value="Consultoria">Consultoria</option>
            <option value="Otros">Otros</option>
          </Form.Select>
          <Form.Text className="text-danger">{errors.categoria?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescBreve">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ej: Web profesional *responsive*..."
            {...register("descripcion_breve", {
              required: "La descripción breve es obligatoria",
              minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
              maxLength: { value: 250, message: "Debe tener máximo 250 caracteres" },
            })}
          />
          <Form.Text className="text-danger">{errors.descripcion_breve?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescAmplia">
          <Form.Label>Descripción amplia*</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Ej: Desarrollo de un sitio web corporativo..."
            {...register("descripcion_amplia", {
              required: "La descripción amplia es obligatoria",
              minLength: { value: 10, message: "Debe tener al menos 10 caracteres" },
              maxLength: { value: 500, message: "Debe tener máximo 500 caracteres" },
            })}
          />
          <Form.Text className="text-danger">{errors.descripcion_amplia?.message}</Form.Text>
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
