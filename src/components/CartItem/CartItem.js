import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CartItem/CartItem.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CartContext } from "../../contexts/ShoppingCartContext";
import useFormattedNumber from "../../hooks/useFormattedNumber";

const CartItem = ({ id, brand, model, price, image, inStock }) => {
  const [cantidad, setCantidad] = useState(1);
  const { theme } = useContext(ThemeContext);
  const { removeFromCart, cartItems, updateCartItemQuantity } =
    useContext(CartContext);
  const removeAction = () => {
    removeFromCart(id);
    toast.error("Producto eliminado");
  };

  const stockOptions = [];
  for (let i = 1; i <= inStock; i++) {
    stockOptions.push(i);
  }

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    updateCartItemQuantity(id, newQuantity);
    setCantidad(newQuantity);
  };
  return (
    <div
      className={`d-flex my-3 border-bottom ${
        theme === "dark" && "cart-item-dark"
      }`}
    >
      <div className="col-2">
        <img className="product-img img-fluid pe-2" src={image} alt="" />
      </div>
      <div className="col-4">
        <h5 className="pe-3">
          {brand} {model}
        </h5>
        <button
          type="button"
          className="trash-btn"
          onClick={() => removeAction()}
        >
          Eliminar
        </button>
      </div>
      <div className="col-4">
        <div className="input-group w-50 quantity-input">
          <label className="input-group-text">Cantidad</label>
          <select
            className="form-select"
            value={cartItems[id]}
            onChange={handleQuantityChange}
          >
            {Array.from({ length: inStock }, (_, index) => (
              <option
                key={index + 1}
                value={index + 1}
                selected={cartItems[id] === index + 1}
              >
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-2">
        <h4 className="row">${useFormattedNumber(price * cartItems[id])}</h4>
      </div>
    </div>
  );
};

export default CartItem;
