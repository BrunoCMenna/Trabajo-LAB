import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { CartContext } from "../../contexts/ShoppingCartContext";

const NavBar = () => {
  const { getItemAmount } = useContext(CartContext);
  const cartAmount = getItemAmount();
  const navigation = useNavigate();

  const goLogin = () => {
    navigation("/Login");
  };
  const goCart = () => {
    navigation("/Cart");
  };
  const goShop = () => {
    navigation("/Shop");
  };
  
  return (
    <>
      <nav className="navbar px-4">
        <div className="enterprise">
          <button type="button" onClick={goShop}>
            <div className="flex-grow-1 text-white">TECNO ROSARIO</div>
          </button>
        </div>
        <div className="CRI">
          <button className="cart-icon" onClick={goCart}>
            <h2 className="px-1 mx-1">
              <FaShoppingCart />
            </h2>
            Carrito
            {cartAmount > 0 && (
              <div className="badge rounded-pill text-bg-primary mx-2">
                {cartAmount}
              </div>
            )}
          </button>
          <button onClick={goLogin} type="button">
            Registrarse
          </button>
          <button onClick={goLogin} type="button">
            <HiChevronDoubleRight />
            Iniciar sesión
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
