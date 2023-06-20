import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import PhoneItem from "../PhoneItem/PhoneItem";
import { useContext } from "react";

const PhoneCatalog = ({ phones, brandFilterSelected }) => {
  const { theme } = useContext(ThemeContext);
  const phonesFiltered = phones
    .filter((p) => p.brand === brandFilterSelected)
    .map((p) => (
      <PhoneItem
        id={p.id}
        brand={p.brand}
        model={p.model}
        price={p.price}
        image={p.image}
      />
    ));

  const noFilteredPhones = phones.map((p) => (
    <PhoneItem
      id={p.id}
      brand={p.brand}
      model={p.model}
      price={p.price}
      image={p.image}
    />
  ));
  return( 
    <>{phonesFiltered.length === 0 ? noFilteredPhones : phonesFiltered}</>
  )
};

export default PhoneCatalog;
