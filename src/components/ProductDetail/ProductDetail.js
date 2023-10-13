import React, { useContext, useEffect, useState } from "react";
import useFormattedNumber from "../../hooks/useFormattedNumber";
import "../ProductDetail/ProductDetail.css";
import { BsCheck2Circle } from "react-icons/bs";
import { FaCartPlus, FaCheck } from "react-icons/fa";

import { RxCross1 } from "react-icons/rx";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";

const ProductDetail = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    if (cartItems) {
      setIsProductInCart(cartItems[product.id] > 0);
    }
  }, [cartItems]);

  const {
    id,
    brand,
    model,
    price,
    image,
    storage,
    ram,
    description,
    inStock,
    isActive,
  } = product;

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const addToCartAction = () => {
    if (cartItems[id]) {
      toast.error("Este producto ya está en el carrito");
      return;
    }
    addToCart(product.id, cantidad);
    toast.success("Agregado al carrito");
  };

  const stockOptions = [];
  for (let i = 1; i <= inStock; i++) {
    stockOptions.push(i);
  }

  return (
    <div
      className={`d-flex flex-column product-detail p-5 ${
        theme === "dark" && "product-detail-dark"
      }`}
    >
      <div className="d-flex flex-wrap justify-content-center gap-5">
        <div className="">
          <img src={image} alt={model} className="img-fluid" />
        </div>
        <div className="text-wrap" style={{ maxWidth: 300 }}>
          <div>
            <h3 className="">
              {brand} {model} / {ram} GB RAM / {storage} GB
            </h3>
          </div>
          <div>
            <p className="h1 mt-4">${useFormattedNumber(price)}</p>
            {isActive ? (
              <div className="text-success d-flex flex-wrap gap-1 align-items-center">
                <BsCheck2Circle />
                Unidad disponible{" "}
                <span className="text-secondary">({inStock} en stock)</span>
              </div>
            ) : (
              <div className="text-danger d-flex flex-wrap gap-1 align-items-center">
                <RxCross1 />
                Unidad no disponible
              </div>
            )}
          </div>
          <div className="d-flex flex-column mt-4">
            <div className="d-flex justify-content-between border-bottom">
              <span>Marca:</span>
              <span>{brand}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom">
              <span>Modelo:</span>
              <span>{model}</span>
            </div>
            <div className="d-flex justify-content-between border-bottom">
              <span>Memoria RAM:</span>
              <span>{ram} GB</span>
            </div>
            <div className="d-flex justify-content-between border-bottom">
              <span>Almacenamiento:</span>
              <span>{storage} GB</span>
            </div>
          </div>
          <div className="mt-2">
            <span>Descripción:</span>
            <p>{description}</p>
          </div>
          <div className="input-group quantity mt-4">
            <label className="input-group-text">Cantidad</label>
            <select
              className="form-select"
              value={cantidad}
              onChange={handleCantidadChange}
            >
              {stockOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid mx-auto">
            {isActive ? (
              <button
                className="btn btn-primary"
                type="button"
                onClick={addToCartAction}
                disabled={isProductInCart}
              >
                {isProductInCart ? (
                  <span>
                    Agregado al carrito <FaCheck />
                  </span>
                ) : (
                  <span>
                    Agregar al carrito <FaCartPlus />
                  </span>
                )}
              </button>
            ) : (
              <button disabled className="btn btn-danger">
                Producto no disponible
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
