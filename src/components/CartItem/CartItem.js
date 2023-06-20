import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CartItem/CartItem.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CartContext } from "../../contexts/ShoppingCartContext";

const CartItem = ({ id, brand, model, price, image }) => {
  const { theme } = useContext(ThemeContext);
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
        <div className= {`${theme === "dark" && "cart-item-dark"}`}>
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
              <span>{cartItems[id]}</span>
            </td>
            <td>
            <button
              type="button"
              onClick={() => removeAction()}
              className="trash-btn"
            >
              <div className= {`${theme === "dark" && "trash-button-dark"}`}>
              <FaTrash></FaTrash>
              </div>
            </button>
            </td>
          </tr>
        </tbody>
        </div>
      </table>
  );
};

export default CartItem;
