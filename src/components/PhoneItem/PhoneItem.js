import React, { useContext } from "react";

import { FaCartPlus } from "react-icons/fa";

import "./PhoneItem.css";
import PhoneCard from "../PhoneCard/PhoneCard";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhoneItem = ({ id, brand, model, price, image }) => {
  const { addToCart } = useContext(CartContext);
  const addToCartAction = () => {
    addToCart(id);
    toast.success("Agregado al carrito");
  };
  return (
    <>
      <PhoneCard>
        <div className="phone-container">
          <button>
            <img src={image} alt="" />
          </button>
          <hr />
          <h3>${price}</h3>
          <p>
            {brand} {model}
          </p>

          <button
            type="button"
            onClick={addToCartAction}
            className="btn btn-outline-success"
          >
            Agregar <FaCartPlus />
          </button>
        </div>
      </PhoneCard>
    </>
  );
};

export default PhoneItem;
