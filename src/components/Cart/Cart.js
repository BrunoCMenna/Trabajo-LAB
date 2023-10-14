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
        <div
          className={`cart-container ${
            theme === "dark" && "cart-container-dark"
          }`}
        >
          <div
            className={`cart-table ${theme === "dark" && "cart-table-dark"}`}
          >
            <div>
              {products.map((product, index) => {
                if (cartItems[product.id] !== 0) {
                  return (
                    <CartItem
                      key={index}
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

          <div className={`subtotal ${theme === "dark" && "subtotal-dark"}`}>
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
        <div
          className={` d-flex flex-column justify-content-center align-items-center emptyCart p-5 ${
            theme === "dark" && "emptyCart-dark"
          }`}
        >
          <h3>No hay productos en el carrito</h3>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
            alt="Carrito Vacio Imagen"
            height={200}
          />
          <Button onClick={goShop}>Ir a la tienda</Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
