import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

import "./Login.css";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const { logInUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const logInHandler = (e) => {
    e.preventDefault();
    logInUser(email, password);
  };

  const goSignIn = () => {
    navigation("/signin");
  };
  const goShop = () => {
    navigation("/shop");
  };

  return (
    <div>
      <NavBar />
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <div className="banner"></div>
        <div className="login w-26 p-3">
          <div className={`${theme === "dark" && "login-box-dark"}`}>
            <h2 className="mb-2 d-flex justify-content-center fs-4">
              ¡Bienvenido a Tecno Rosario!
            </h2>
            <p className="d-flex justify-content-center">
              Inicie sesión para continuar
            </p>
            <form>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={emailChangeHandler}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="password">
                  Contraseña:
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  onClick={logInHandler}
                  className="btn btn-primary"
                  type="button"
                >
                  Iniciar sesión
                </button>
              </div>
              <div className="mx-5">
                <span>¿No tenés una cuenta?</span>
                <button
                  type="button"
                  className="text-white text-decoration-underline"
                  onClick={goSignIn}
                >
                  Registrarse
                </button>
              </div>
              <div className="mx-5">
                <span>¿Querés ver los productos sin una cuenta?</span>
                <button
                  type="button"
                  className="text-white text-decoration-underline"
                  onClick={goShop}
                >
                  Ir a la tienda
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
