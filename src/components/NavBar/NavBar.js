import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";

import "./NavBar.css";
import logo from "../../img/logo.png";

import { CartContext } from "../../contexts/ShoppingCartContext";
import { UserContext } from "../../contexts/AuthContext";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

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
            <img src={logo} alt="logo" className="img-fluid logo-img" />
          </button>
          <ToggleTheme />
        </div>

        <div className="CRI">
          {user ? (
            <>
              <span className="d-flex align-self-center align-text-center text-white">
                Hola, {user && user.email ? user.email.split("@")[0] : "invitado"}!
              </span>
              {user.role === "admin" ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-success"
                      className="d-flex p-1 align-self-center justify-content-center text-align-center mt-3"
                    >
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
              ) : user.role === "sysadmin" ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-success"
                      className="d-flex p-1 align-self-center justify-content-center text-align-center mt-3"
                    >
                      SysAdmin
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/userpanel">
                        Panel de usuarios
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                user.role === "disabled" && (
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" className="fs-5">
                      <CgDanger />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        Esta cuenta está deshabilitada. Contáctese con el dueño
                        del sitio para más información.
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
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
