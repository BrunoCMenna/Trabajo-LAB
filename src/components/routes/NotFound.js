import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();

  const goBack = () => {
    navigation("/Shop");
  };

  const goLogin = () => {
    navigation("/Login");
  };

  return (
    <div className="d-flex  flex-column justify-content-center align-items-center mt-5">
      <h2>No se ha encontrado la pagina</h2>
      <Button type="button" class="btn btn-info" onClick={goBack}>
        Volver a la tienda
      </Button>
      <Button type="button" class="btn btn-info" onClick={goLogin}>
        Volver al menu de inicio de sesión
      </Button>
    </div>
  );
};

export default NotFound;
