import React, { useContext } from "react";
import { useState } from "react";
import "./Login.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigate();
  const { logInUser, logOutUser, user } = useContext(UserContext);

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

  const logOutHandler = (e) => {
    e.preventDefault();
    if (!user) {
      console.log("no hay user!");
    } else {
      console.log("se deslogeo el user:");
      console.log(user);
      logOutUser();
    }
  };

  const goSignIn = () => {
    navigation("/signin");
  };

  return (
    <div>
      <NavBar />
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <div className="banner"></div>
        <div className="login">
          <h2 className="mb-2 d-flex justify-content-center fs-4">
            ¡Bienvenido a Tecno Rosario!
          </h2>
          <p className="d-flex justify-content-center">
            Inicie sesión para continuar
          </p>
          <form>
            <div className="form-group mb-3">
              <label className="form-label" for="email">
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
              <label className="form-label" for="password">
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
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
