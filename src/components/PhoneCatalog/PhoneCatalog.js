import React from "react";
import PhoneItem from "../PhoneItem/PhoneItem";

const PhoneCatalog = ({ phones, brandFilterSelected }) => {
  const phonesFiltered = phones
    .filter((p) => p.brand === brandFilterSelected)
    .map((p, index) => (
      <PhoneItem
        key={index}
        id={p.id}
        brand={p.brand}
        model={p.model}
        price={p.price}
        image={p.image}
        isActive={p.isActive}
        inStock={p.inStock}
        ram={p.ram}
        storage={p.storage}
      />
    ));

  const noFilteredPhones = phones.map((p, index) => (
    <PhoneItem
      key={index}
      id={p.id}
      brand={p.brand}
      model={p.model}
      price={p.price}
      image={p.image}
      isActive={p.isActive}
      inStock={p.inStock}
      ram={p.ram}
      storage={p.storage}
    />
  ));
  return <>{phonesFiltered.length === 0 ? noFilteredPhones : phonesFiltered}</>;
};

export default PhoneCatalog;
