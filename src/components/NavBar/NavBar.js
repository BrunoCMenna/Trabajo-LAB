import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigation = useNavigate();

  const goLogin = () => {
    navigation("/Login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="p-2 flex-grow-1 text-white">Empresa</div>
        <div classname="cart-icon">
          <h2><FaShoppingCart /> <p>Carrito</p></h2>
        </div>
        <button onClick={goLogin} type="button" class="btn btn-outline-light me-2">Iniciar sesión</button>
      </nav>
    </>
  );
};

export default NavBar;
