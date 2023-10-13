import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img from "../../img/notfound-icon.jpg";
import "../ui/NotFoundContent.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const NotFoundContent = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigate();

  const goBack = () => {
    navigation("/Shop");
  };

  return (
    <div
      className={`d-flex flex-wrap flex-row justify-content-center align-items-center ${
        theme === "dark" && "not-found-dark"
      }`}
      style={{ minHeight: "calc(100vh - 100px - 460px)" }}
    >
      <div>
        <img src={img} alt="error 404" style={{ maxWidth: "250px" }} />
      </div>
      <div className="mx-5 d-flex flex-column" style={{ maxWidth: "500px" }}>
        <h2 className="mb-3">
          <b>404</b>
        </h2>
        <h2>Página no encontrada</h2>
        <p>No se ha encontrado la página que buscas.</p>
        <p>
          Podés volver a la página anterior, visitar nuestra página de inicio o
          ponerte en contacto con nosotros.
        </p>
        <div className="d-flex flex-wrap gap-3 align-self-center pb-3">
          <Button
            type="button"
            className="btn btn-primary  m-0 mt-3"
            onClick={goBack}
          >
            Volver al inicio
          </Button>
          <button
            type="button"
            className="m-0 mt-3"
            onClick={() => navigation("/help")}
          >
            <u>Ayuda</u>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundContent;
