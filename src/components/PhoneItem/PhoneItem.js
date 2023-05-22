import React from "react";

import "./PhoneItem.css";

import PhoneCard from "../PhoneCard/PhoneCard";
import { FaCartPlus } from "react-icons/fa";

const PhoneItem = ({ id, brand, model, price }) => {
  return (
    <PhoneCard>
      <div className="phone-container">
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
