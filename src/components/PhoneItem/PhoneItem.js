import React from "react";

import "./PhoneItem.css";

import PhoneCard from "../PhoneCard/PhoneCard";

const PhoneItem = ({ id, brand, model, price }) => {
  const img = require(`../Img/Ultra_S23_id${id}.png`);
  return (
    <PhoneCard>
      <img src={img} alt="" />
      <h1>Marca: {brand}</h1>
      <h2>Modelo: {model}</h2>
      <h3>Precio: ${price}</h3>
    </PhoneCard>
  );
};

export default PhoneItem;
