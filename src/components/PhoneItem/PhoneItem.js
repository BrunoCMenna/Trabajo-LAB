import React from "react";

import "./PhoneItem.css";

import PhoneCard from "../PhoneCard/PhoneCard";
import { FaCartPlus } from "react-icons/fa";

const PhoneItem = ({ id, brand, model, price }) => {
  const img = require(`../Img/Ultra_S23_id${id}.png`);
  return (
    <PhoneCard>
      <div className="phone-container">
        <button>
          <img src={img} alt="" />
        </button>
        <hr />
        <h3>${price}</h3>
        <p>
          {brand} {model}
        </p>

        <button type="button" className="btn btn-outline-success">
          Agregar <FaCartPlus />
        </button>
      </div>
    </PhoneCard>
  );
};

export default PhoneItem;
