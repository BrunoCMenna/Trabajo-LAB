import React, { useContext, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import "./PhoneItem.css";
import PhoneCard from "../PhoneCard/PhoneCard";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PhoneItem = ({ id, brand, model, price, image }) => {

  const navigation = useNavigate();

  const goProduct = () => {
    navigation("/Product");
    toast.success("A continuacion podrá ver los detalles del producto");
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
      </PhoneCard>
    </>
  );
};

export default PhoneItem;

