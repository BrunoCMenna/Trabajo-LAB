import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import "./PhoneItem.css";

import PhoneCard from "../PhoneCard/PhoneCard";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router";
import useFormattedNumber from "../../hooks/useFormattedNumber";

const PhoneItem = ({
  id,
  brand,
  model,
  price,
  image,
  description,
  isActive,
  inStock,
  ram,
  storage,
}) => {
  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const addToCartAction = () => {
    addToCart(id, 1);
    toast.success("Agregado al carrito");
  };

  return (
    <>
      <PhoneCard>
        <div
          className={`phone-container d-flex flex-column flex-wrap text-wrap ${
            theme === "dark" && "phone-item-dark"
          }`}
        >
          <button onClick={() => navigate(`/product/${id}`)}>
            <img src={image} alt={model} />
          </button>
          <hr />
          <div className="h4">${useFormattedNumber(price)}</div>
          <div className="text-uppercase fw-medium">
            {brand} {model} / {ram} GB RAM / {storage} GB
          </div>
          {inStock > 0 ? (
            <div className="text-success mt-3">Disponible</div>
          ) : (
            <div className="text-danger mt-3">No disponible</div>
          )}
          {isActive ? (
            <>
              {/* <button
                  id="cart-button"
                  type="button"
                  onClick={addToCartAction}
                  className="btn btn-outline-success"
                >
                  Agregar al carrito <FaCartPlus />
                </button> */}
            </>
          ) : (
            <>
              <div className="text-danger">
                <p>No disponible</p>
              </div>
            </>
          )}
        </div>
      </PhoneCard>
    </>
  );
};

export default PhoneItem;
