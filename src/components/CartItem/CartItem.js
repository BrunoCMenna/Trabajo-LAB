import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../CartItem/CartItem.css";

import { CartContext } from "../../contexts/ShoppingCartContext";

const CartItem = ({ id, brand, model, price, image }) => {
  const { removeFromCart, cartItems } = useContext(CartContext);
  const removeAction = () => {
    if (cartItems[id] === 1) {
      removeFromCart(id);
      toast.error("Producto eliminado");
    } else {
      removeFromCart(id);
    }
  };
  return (
    <table className="table bordered">
      <thead>
        <tr>
          <th></th>
          <th>Modelo</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img className="product-img" src={image} alt="" />
          </td>
          <td>
            {brand} {model}
          </td>
          <td>${price}</td>
          <td className="qty">
            <span> </span>
          </td>
          <td>
            <button
              type="button"
              onClick={() => removeAction()}
              className="trash-btn"
            >
              <FaTrash></FaTrash>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartItem;
