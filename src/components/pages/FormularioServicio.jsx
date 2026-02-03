import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import {
  buscarServicioApi,
  crearServicioApi,
  editarServicioApi,
} from "../../helpers/queries";
import "./FormularioServicio.css";

const FormularioServicio = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    resetField, // reset del input file
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();

  // states para imagen actual (URL) y preview (local)
  const [imagenActual, setImagenActual] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    if (titulo === "Editar servicio") {
      const respuestaServicio = await buscarServicioApi(id);

      if (respuestaServicio && respuestaServicio.status === 200) {
        const servicioBuscado = await respuestaServicio.json();

        setValue("servicio", servicioBuscado.servicio);
        setValue("precio", servicioBuscado.precio);
        setValue("categoria", servicioBuscado.categoria);
        setValue("descripcion_breve", servicioBuscado.descripcion_breve);
        setValue("descripcion_amplia", servicioBuscado.descripcion_amplia);

        // en edición, guardo la URL de imagen existente
        setImagenActual(servicioBuscado.imagen);
      }
    }
  };

  const onSubmit = async (data) => {
    // armamos el objeto para enviar:
    // imagen: File (si el usuario eligió una nueva)
    const servicioForm = {
      ...data,
      imagen: data.imagen?.[0], // File o undefined
    };

    if (titulo === "Crear servicio") {
      const respuestaServicioCreado = await crearServicioApi(servicioForm);

      if (respuestaServicioCreado && respuestaServicioCreado.status === 201) {
        Swal.fire({
          title: "Servicio creado",
          text: `El servicio '${data.servicio}' fue creado correctamente`,
          icon: "success",
        });

        reset();
        resetField("imagen");
        setPreview("");
        setImagenActual("");
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: `El servicio '${data.servicio}' no fue creado.`,
          icon: "error",
        });
      }
    } else {
      const respuestaEditarServicio = await editarServicioApi(servicioForm, id);

      if (respuestaEditarServicio && respuestaEditarServicio.status === 200) {
        Swal.fire({
          title: "Servicio editado",
          text: `El servicio '${data.servicio}' fue editado correctamente`,
          icon: "success",
        });

        navegacion("/administrador");
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: `El servicio '${data.servicio}' no pudo ser editado. Intenta nuevamente en unos minutos`,
          icon: "error",
        });
      }
    }
  };

  return (
    <main className="container my-4">
      <h1>{titulo}</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formServicio">
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
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: {
                value: 50,
                message: "El precio minimo del producto debe ser de almenos $50",
              },
              max: {
                value: 1000000,
                message:
                  "El precio maximo de un producto debe ser de hasta $1000000",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.precio?.message}</Form.Text>
        </Form.Group>

        {/* Input FILE + preview (Cloudinary) */}
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen*</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            {...register("imagen", {
              required:
                titulo === "Crear servicio"
                  ? "La imagen es obligatoria"
                  : false,
              validate: {
                fileSize: (files) =>
                  !files?.[0] ||
                  files[0].size <= 2 * 1024 * 1024 ||
                  "La imagen no debe superar los 2MB.",
              },
            })}
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                setPreview(URL.createObjectURL(file));
              } else {
                setPreview("");
              }
            }}
          />

          {(preview || imagenActual) && (
            <div className="mb-2 position-relative d-inline-block mt-3">
              <img
                className="rounded-3 img-preview"
                src={preview || imagenActual}
                alt="Imagen"
              />
              <Button
                variant="light"
                size="sm"
                className="p-0 d-flex align-items-center justify-content-center shadow btn-img-preview"
                onClick={() => {
                  setPreview("");
                  setImagenActual("");
                  resetField("imagen");
                }}
              >
                <i className="bi bi-x fs-5 text-danger"></i>
              </Button>
            </div>
          )}

          <Form.Text className="text-danger">{errors.imagen?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoría*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe seleccionar una categoria",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Desarrollo Web">Desarrollo Web</option>
            <option value="Backend y API">Backend & API</option>
            <option value="Consultoría">Consultoría</option>
            <option value="Otros">Otros</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescripcionBreve">
          <Form.Label>Descripción breve*</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Ej: Web profesional responsive..."
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

        <Form.Group className="mb-3" controlId="formDescripcionAmplia">
          <Form.Label>Descripción amplia*</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={4}
            placeholder="Ej: Desarrollo de un sitio web corporativo..."
            {...register("descripcion_amplia", {
              required: "La descripción amplia es un dato obligatorio",
              minLength: {
                value: 10,
                message: "La descrición amplia debe tener almenos 10 caracteres",
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
          Enviar
        </Button>
      </Form>
    </main>
  );
};

export default FormularioServicio;
