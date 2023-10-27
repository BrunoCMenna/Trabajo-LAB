import React, { useContext, useState } from "react";
import { useJwt, decodeToken } from "react-jwt";
import { useNavigate } from "react-router";
import "../Login/Login.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
//const token = "Your JWT";

const SignIn = () => {
  const { logInUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  //const { decodedToken, isExpired } = useJwt(token);

  //const { createUser } = useContext(UserContext);
  const navigation = useNavigate();

  const handleInput = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
    console.log(values);
  };

  const Validation = (values) => {
    const errors = {};
    const emailPattern =
      /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (values.email === "") {
      return toast.error("El email no puede ser vacío");
    } else if (!emailPattern.test(values.email)) {
      return toast.error("Ingrese un email válido");
    }

    if (values.password === "") {
      return toast.error("Contraseña es obligatoria");
    } else if (!passwordPattern.test(values.password)) {
      return toast.error("Mínimo de 8 caracteres con un número");
    }

    if (values.firstName === "") {
      return toast.error("Nombre no puede ser vacio");
    }

    if (values.lastName === "") {
      return toast.error("Apellido no puede ser vacio");
    }
    return errors;
  };

  const logInHandler = async (e) => {
    e.preventDefault();
    const errorObj = Validation(values);
    if (Object.keys(errorObj).length === 0) {
      console.log("no hay errores");
      setErrors(errorObj);
      try {
        const response = await fetch(
          "https://localhost:44377/api/Auth/SignIn",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            }),
          }
        );

        // Verifica si la solicitud fue exitosa (código de respuesta 200)
        if (response.ok || response.status === 200) {
          const responseData = await response.text();
          logInUser(responseData);
        } else {
          const responseData = await response.text();
          return toast.error(responseData);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const goLogIn = () => {
    navigation("/login");
  };
  return (
    <div>
      <NavBar />
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <div className="banner"></div>
        <div className="login">
          <div className={`${theme === "dark" && "login-box-dark"}`}>
            <h2 className="mb-2 d-flex justify-content-center fs-4">
              Creación de cuenta
            </h2>
            <form>
              <div className="form-group mb-3">
                <label className="form-label" for="firstName">
                  Nombre:
                </label>
                <input
                  className="form-control"
                  type="firstName"
                  name="firstName"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" for="lastName">
                  Apellido:
                </label>
                <input
                  className="form-control"
                  type="lastName"
                  name="lastName"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" for="email">
                  Email:
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" for="password">
                  Contraseña:
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  onClick={logInHandler}
                  className="btn btn-primary"
                  type="button"
                >
                  Crear cuenta
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="text-white text-decoration-underline"
                  onClick={goLogIn}
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
