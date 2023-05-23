import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { HiChevronDoubleRight } from "react-icons/hi"
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigation = useNavigate();

  const goLogin = () => {
    navigation("/Login");
  };

  return (
    <>
      <nav className="navbar px-4">
        <div className="flex-grow-1 text-white">Empresa</div>
        <div className="CRI">
          <button className="cart-icon"><h2 className="px-1"><FaShoppingCart /></h2>Carrito</button>
          <button onClick={goLogin} type="button">Registrarse</button>
          <button onClick={goLogin} type="button"><HiChevronDoubleRight />Iniciar sesión</button>
        </div>
      </nav >
    </>
  );
};

export default NavBar;
