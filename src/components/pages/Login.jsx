import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.email===import.meta.env.VITE_EMAIL && data.password===import.meta.env.VITE_PASSWORD){
      //redireccionaria a la pagina del administrador
      //mostrar un cartel de bienvenido
       Swal.fire({
  title: "Bienvenido Administrador",
  text: "Ingresando al sistema",
  icon: "success"
});  
    }else{
      Swal.fire({
  title: "Ocurrio un error",
  text: "Credenciales Incorrectas!",
  icon: "error"
});  
    }
  };

  return (
    <main
      classNa me="container
  "
    >
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              require: "el email es un dato obligatorio",
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
              require: "La contraseña es un dato obligatorio",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                message:
                  "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter especial.",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.password?.message}</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </main>
  );
};

export default Login;
