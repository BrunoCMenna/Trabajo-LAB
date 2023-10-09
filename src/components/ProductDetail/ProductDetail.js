import React, { useState } from "react";
import "../ProductDetail/ProductDetail.css";

const ProductDetail = ({ product }) => {
  const {
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

  return (
    <div className="d-flex flex-column border border-primary p-5">
      <div className="d-flex flex-wrap justify-content-center gap-5">
        <div className="">
          <img src={image} alt={model} className="img-fluid" />
        </div>
        <div className="">
          <h3 className="h3">
            {brand} {model}
          </h3>
          <p>${price}</p>
          <p>Memoria RAM: {ram} gb</p>
          <p>Almacenamiento: {storage} gb</p>
          <p>Descripción: {description}</p>
          <p>Unidades disponibles: {inStock}</p>
          <p>{isActive}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
