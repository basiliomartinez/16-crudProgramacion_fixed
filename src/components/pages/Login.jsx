import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../helpers/queries.js";

const Login = ({setUsuarioLogueado}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);
const respuesta= await login(data)
if (respuesta && respuesta.status === 200){
  //guardar el usuario logueado
const usuarioLogueado= await respuesta.json()
setUsuarioLogueado({
  nombre: usuarioLogueado.nombre,
  token: usuarioLogueado.token
})
//mostrar un cartel de bienvenido
        Swal.fire({
            title: `Bienvenido ${usuarioLogueado.nombre}`,
            text: "Ingresando al sistema",
            icon: "success",
            //redireccionaria a la papgina del administrador
        });
        navegacion('/administrador')
}
 else {
      Swal.fire({
        title: "Ocurrio un error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  };

  return (
    <main className="container my-4">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "El email es un dato obligatorio",
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message:
                  "El email debe cumplir con el siguiente formato correo@dominio.extension",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "La contraseña es un dato obligatorio",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                message:
                  "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter especial.",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </main>
  );
};

export default Login;