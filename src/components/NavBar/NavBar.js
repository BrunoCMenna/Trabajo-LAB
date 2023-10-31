import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  FaChartPie,
  FaClipboardList,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { RiLoginBoxFill, RiLogoutBoxFill, RiMenuFill } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";
import { CgDanger } from "react-icons/cg";

import "./NavBar.css";
import logo from "../../img/logo.png";

import { CartContext } from "../../contexts/ShoppingCartContext";
import { UserContext } from "../../contexts/AuthContext";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

const NavBar = () => {
  const { getItemAmount } = useContext(CartContext);
  const { user, logOutUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
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
    navigation("/");
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
                Hola, {user.name ?? "invitado"}!
              </span>
              {user.role === "admin" ? (
                <>
                  <button
                    className="d-flex"
                    onClick={() => navigation("/productpanel")}
                  >
                    <h2 className="px-1 mx-1">
                      <LuLayoutList />
                    </h2>
                    <span>Productos</span>
                  </button>
                  <button
                    className="cart-icon"
                    onClick={() => navigation("/orderpanel")}
                  >
                    <h2 className="px-1 mx-1">
                      <FaClipboardList />
                    </h2>
                    Pedidos
                  </button>
                  <button
                    className="cart-icon"
                    onClick={() => navigation("/dashboard")}
                  >
                    <h2 className="px-1 mx-1">
                      <FaChartPie />
                    </h2>
                    Métricas
                  </button>
                  <button
                    onClick={logOutHandler}
                    type="button"
                    className="d-flex"
                  >
                    <h2>
                      <RiLogoutBoxFill />
                    </h2>
                    Cerrar sesión
                  </button>
                </>
              ) : user.role === "sysadmin" ? (
                <>
                  <button
                    className="d-flex"
                    onClick={() => navigation("/userpanel")}
                  >
                    <h2 className="px-1 mx-1">
                      <FaUsers />
                    </h2>
                    <span>Usuarios</span>
                  </button>
                  <button
                    className="d-flex"
                    onClick={() => navigation("/productpanel")}
                  >
                    <h2 className="px-1 mx-1">
                      <LuLayoutList />
                    </h2>
                    <span>Productos</span>
                  </button>
                  <button
                    className="cart-icon"
                    onClick={() => navigation("/orderpanel")}
                  >
                    <h2 className="px-1 mx-1">
                      <FaClipboardList />
                    </h2>
                    Pedidos
                  </button>
                  <button
                    className="cart-icon"
                    onClick={() => navigation("/dashboard")}
                  >
                    <h2 className="px-1 mx-1">
                      <FaChartPie />
                    </h2>
                    Métricas
                  </button>
                  <button
                    onClick={logOutHandler}
                    type="button"
                    className="d-flex"
                  >
                    <h2>
                      <RiLogoutBoxFill />
                    </h2>
                    Cerrar sesión
                  </button>
                </>
              ) : user.role === "disabled" ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" className="fs-5">
                      <CgDanger />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.ItemText>
                        Cuenta deshabilitada. Contáctese con el dueño del sitio
                        para más información.
                      </Dropdown.ItemText>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button
                    onClick={logOutHandler}
                    type="button"
                    className="d-flex"
                  >
                    <h2>
                      <RiLogoutBoxFill />
                    </h2>
                    Cerrar sesión
                  </button>
                </>
              ) : (
                user.role === "user" && (
                  <>
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
                    <button
                      onClick={logOutHandler}
                      type="button"
                      className="d-flex"
                    >
                      <h2>
                        <RiLogoutBoxFill />
                      </h2>
                      Cerrar sesión
                    </button>
                  </>
                )
              )}
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

        {/* ----------------------------------- BOTON MENU RESPONSIVE ------------------------------ */}

        <div className="menu-button">
          {!user ? (
            <div>
              <DropdownButton
                align="end"
                title=<RiMenuFill />
                id="dropdown-menu-align-end"
                data-bs-theme={theme}
              >
                <Dropdown.Item as={Link} to="/cart">
                  Carrito
                  {cartAmount > 0 && (
                    <div className="badge rounded-pill text-bg-primary ms-2">
                      {cartAmount}
                    </div>
                  )}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/login">
                  Iniciar sesión
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : (
            <div>
              {user.role === "admin" ? (
                <>
                  <DropdownButton
                    align="end"
                    title=<RiMenuFill />
                    id="dropdown-menu-align-end"
                    data-bs-theme={theme}
                  >
                    <Dropdown.Item as={Link} to="/productpanel">
                      Gestión de productos
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orderpanel">
                      Gestión de pedidos
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/dashboard">
                      Métricas de ventas
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logOutHandler}>
                      Cerrar sesión
                    </Dropdown.Item>
                  </DropdownButton>
                </>
              ) : user.role === "sysadmin" ? (
                <>
                  <DropdownButton
                    align="end"
                    title=<RiMenuFill />
                    id="dropdown-menu-align-end"
                    data-bs-theme={theme}
                  >
                    <Dropdown.Item as={Link} to="/userpanel">
                      Lista de usuarios
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/">
                      Lista de productos
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orderpanel">
                      Lista de ventas
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/dashboard">
                      Métricas de ventas
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logOutHandler}>
                      Cerrar sesión
                    </Dropdown.Item>
                  </DropdownButton>
                </>
              ) : user.role === "user" ? (
                <>
                  <DropdownButton
                    align="end"
                    title=<RiMenuFill />
                    id="dropdown-menu-align-end"
                    data-bs-theme={theme}
                  >
                    <Dropdown.Item as={Link} to="/showorders">
                      Mis pedidos
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/cart">
                      Carrito
                      {cartAmount > 0 && (
                        <div className="badge rounded-pill text-bg-primary ms-2">
                          {cartAmount}
                        </div>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logOutHandler}>
                      Cerrar sesión
                    </Dropdown.Item>
                  </DropdownButton>
                </>
              ) : (
                user.role === "disabled" && (
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" className="fs-5">
                      <CgDanger />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.ItemText>
                        Cuenta deshabilitada. Contáctese con el dueño del sitio
                        para más información.
                      </Dropdown.ItemText>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logOutHandler}>
                        Cerrar sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
