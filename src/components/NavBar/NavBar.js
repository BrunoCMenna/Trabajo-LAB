import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";

import "./NavBar.css";

import { CartContext } from "../../contexts/ShoppingCartContext";
import { UserContext } from "../../contexts/AuthContext";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { Dropdown } from "react-bootstrap";

const NavBar = () => {
  const { getItemAmount } = useContext(CartContext);
  const { user, logOutUser } = useContext(UserContext);
  const cartAmount = getItemAmount();
  const navigation = useNavigate();

  const logOutHandler = () => {
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
  const goShowOrders = () => {
    navigation("/showorders");
  };

  return (
    <>
      <nav className="navbar px-4">
        <div className="enterprise">
          <button type="button" onClick={goShop}>
            <div className="flex-grow-1 text-white">TECNO ROSARIO</div>
          </button>
          <ToggleTheme />
        </div>

        <div className="CRI">
          {user ? (
            <>
              <span className="d-flex align-self-center align-text-center text-white">
                Hola, {user.email.split("@")[0]}!
              </span>
              {user.role === "admin" && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="dark">
                      Administrador
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/productpanel">
                        Panel de productos
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/orderpanel">
                        Panel de pedidos
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
              <button className="d-flex" onClick={goShowOrders}>
                <h2 className="px-1 mx-1">
                  <FaClipboardList />
                </h2>
                <span>Mis pedidos</span>
              </button>
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
              <button onClick={logOutHandler} type="button" className="d-flex">
                <h2>
                  <RiLogoutBoxFill />
                </h2>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
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
              <button onClick={goLogin} type="button" className="d-flex mx-3">
                <h2>
                  <RiLoginBoxFill />
                </h2>
                Iniciar sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
