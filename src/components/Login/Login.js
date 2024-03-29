import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
//const token = "Your JWT";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const { logInUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [token, setToken] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const logInHandler = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud POST al endpoint
      const response = await fetch("https://localhost:44377/api/Auth/LogIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok || response.status === 200) {
        const responseData = await response.text();
        logInUser(responseData);
      } else {
        return toast.error("Email o contraseña incorrectas");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const goSignIn = () => {
    navigation("/signin");
  };
  const goShop = () => {
    navigation("/");
  };

  return (
    <div>
      <NavBar />
      <div className="wrapper d-flex align-items-center justify-content-center w-100">
        <div className="banner"></div>
        <div className="login w-26 p-3">
          <div className={`${theme === "dark" && "login-box-dark"}`}>
            <h2 className="mb-2 pt-2 d-flex justify-content-center fs-4">
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
                  data-bs-theme={theme}
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
                  data-bs-theme={theme}
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
              <div className="mx-4 text-center">
                <span>¿No tenés una cuenta?</span>
                <button
                  type="button"
                  className="text-white text-decoration-underline"
                  onClick={goSignIn}
                >
                  Registrarse
                </button>
              </div>
              <div className="mx-4 text-center">
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

export default Login;
