import React from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { HiChevronDoubleRight } from "react-icons/hi"
import { useNavigate } from "react-router-dom";
import Shop from "../Shop/Shop";
import "./NavBar.css";

const NavBar = ({ id, brand, model, price }) => {
  const navigation = useNavigate();

  const goLogin = () => {
    navigation("/Login");
  };

  return (
    <>
      <nav className="navbar px-4">
        <div className="flex-grow-1 text-white">Empresa</div>
        <div className="CRI">

          <div class="dropdown">
            <span><button type="button"> <h2> <FaShoppingCart /> </h2></button></span>
            <div class="dropdown-content">
              <ul class="px-0">
                <h3>CARRITO</h3>
                <ul className="items px-0">
                  <p>
                    <Shop brand={brand} model={model} price={price} />
                  </p>
                </ul>
              </ul>
            </div>
          </div>

          <button onClick={goLogin} type="button">Registrarse</button>
          <button onClick={goLogin} type="button"><HiChevronDoubleRight />Iniciar sesión</button>
        </div>
      </nav >
    </>
  );
};

export default NavBar;
