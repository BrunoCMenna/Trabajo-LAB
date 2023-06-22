import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

import "../Cart/Cart.css";

import { ThemeContext } from "../../contexts/ThemeContext";
import { CartContext } from "../../contexts/ShoppingCartContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CartItem from "../CartItem/CartItem";

const Cart = ({ products }) => {
  const { theme } = useContext(ThemeContext);
  const { getItemAmount, getTotalCartAmount, cartItems } =
    useContext(CartContext);
  const navigation = useNavigate();

  const itemsInCart = getItemAmount();
  const totalPrice = getTotalCartAmount();

  const goShop = () => {
    navigation("/shop");
  };

  const goOrders = () => {
    navigation("/orders");
  };
  return (
    <div>
      <NavBar />
      {itemsInCart > 0 ? (
        <div className="cart-container">
          <div className="cart-table">
            <div className={`${theme === "dark" && "cart-table-dark"}`}>
              {products.map((product) => {
                if (cartItems[product.id] !== 0) {
                  return (
                    <CartItem
                      id={product.id}
                      brand={product.brand}
                      model={product.model}
                      price={product.price}
                      image={product.image}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>

          <div className="subtotal">
            <div className={`${theme === "dark" && "subtotal-buttons-dark"}`}>
              <h4>
                Total: <span>${totalPrice}</span>
              </h4>
              <Button className="btn btn-success" onClick={goOrders}>
                Comprar
              </Button>
              <Button className="btn btn-primary" onClick={goShop}>
                Volver a la tienda
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center p-5">
          <h3>No hay productos en el carrito</h3>
          <Button onClick={goShop}>Ir a la tienda</Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
