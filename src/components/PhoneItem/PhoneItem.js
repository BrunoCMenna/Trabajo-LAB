import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import "./PhoneItem.css";
import PhoneCard from "../PhoneCard/PhoneCard";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const PhoneItem = ({ id, brand, model, price, image }) => {
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);
  const goProduct = () => {
    navigation(`/Product/${id}`);
  };

  const { addToCart } = useContext(CartContext);
  const addToCartAction = () => {
    addToCart(id);
    toast.success("Agregado al carrito");
  };

  return (
    <>
      <PhoneCard>
        <div className="phone-container">
        <div className= {`${theme === "dark" && "phone-item-dark"}`}>
          <button onClick={goProduct}>
            <img src={image} alt="" />
          </button>
          <hr />
          <h3>${price}</h3>
          <p>
            {brand} {model}
          </p>

          <button
            id="cart-button"
            type="button"
            onClick={addToCartAction}
            className="btn btn-outline-success"
          >
            Agregar al carrito <FaCartPlus />
          </button>
        </div>
        </div>
      </PhoneCard>
    </>
  );
};

export default PhoneItem;
