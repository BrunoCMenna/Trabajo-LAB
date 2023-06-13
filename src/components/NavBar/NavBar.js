import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { UserContext } from "../../contexts/AuthContext";

const NavBar = () => {
  const { getItemAmount } = useContext(CartContext);
  const { user, logOutUser } = useContext(UserContext);
  const cartAmount = getItemAmount();
  const navigation = useNavigate();

  const logOutHandler = () => {
    console.log("se deslogeo el user:");
    console.log(user);
    logOutUser();
  };

  const goLogin = () => {
    navigation("/Login");
  };
  const goCart = () => {
    navigation("/Cart");
  };
  const goShop = () => {
    navigation("/Shop");
  };

  if (user) {
    const userName = user.email.split("@")[0];
    return (
      <>
        <nav className="navbar px-4">
          <div className="enterprise">
            <button type="button" onClick={goShop}>
              <div className="flex-grow-1 text-white">TECNO ROSARIO</div>
            </button>
          </div>

          <div className="CRI">
            <span className="d-flex justify-content-center align-content-center align-self-center align-text-center text-white">
              Hola, {userName}!
            </span>
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

            <button onClick={logOutHandler} type="button">
              Cerrar sesión
            </button>
          </div>
        </nav>
      </>
    );
  } else {
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
              <HiChevronDoubleRight />
              Iniciar sesión
            </button>
          </div>
        </nav>
      </>
    );
  }
};

export default NavBar;
