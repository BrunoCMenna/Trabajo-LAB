import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./PhoneItem.css";

import PhoneCard from "../PhoneCard/PhoneCard";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const PhoneItem = ({ id, brand, model, price, image, isActive }) => {
  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const addToCartAction = () => {
    addToCart(id);
    toast.success("Agregado al carrito");
  };

  return (
    <>
      <PhoneCard>
        <div className="phone-container">
          <div className={`${theme === "dark" && "phone-item-dark"}`}>
            <button>
              <img src={image} alt="" />
            </button>
            <hr />
            <h3>${price}</h3>
            <p>
              {brand} {model}
            </p>
            {isActive ? (
              <>
                <button
                  id="cart-button"
                  type="button"
                  onClick={addToCartAction}
                  className="btn btn-outline-success"
                >
                  Agregar al carrito <FaCartPlus />
                </button>
              </>
            ) : (
              <>
                <div className="text-danger">
                  <p>No disponible</p>
                </div>
              </>
            )}
          </div>
        </div>
      </PhoneCard>
    </>
  );
};

export default PhoneItem;
