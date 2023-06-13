import React, { useContext, useState } from "react";

import "../Login/Login.css";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const { createUser } = useContext(UserContext);
  const navigation = useNavigate();

  const handleInput = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const Validation = (values) => {
    const errors = {};
    const emailPattern =
      /^(?![_.-])((?![_.-][_.-])[a-zA-Z\d_.-]){0,63}[a-zA-Z\d]@((?!-)((?!--)[a-zA-Z\d-]){0,63}[a-zA-Z\d]\.){1,2}([a-zA-Z]{2,14}\.)?[a-zA-Z]{2,14}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (values.email === "") {
      errors.email = "El email no puede ser vacío";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Ingrese un email válido";
    }

    if (values.password === "") {
      errors.password = "Contraseña es obligatoria";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = "Mínimo de 8 caracteres con un número";
    }
    return errors;
  };

  const logInHandler = (e) => {
    e.preventDefault();
    const errorObj = Validation(values);
    if (Object.keys(errorObj).length === 0) {
      console.log("no hay errores");
      setErrors(errorObj);
      createUser(values.email, values.password, values.role);
    } else {
      console.log("hay errores");
      setErrors(errorObj);
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
          <h2 className="mb-2 d-flex justify-content-center fs-4">
            Creación de cuenta
          </h2>
          <form>
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
              {errors.email && (
                <p className="text-danger text-center">{errors.email}</p>
              )}
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
            {errors.password && (
              <p className="text-danger text-center">{errors.password}</p>
            )}
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
      <Footer />
    </div>
  );
};

export default SignIn;
