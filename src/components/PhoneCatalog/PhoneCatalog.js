import React from "react";
import PhoneItem from "../PhoneItem/PhoneItem";
import "../PhoneCatalog/PhoneCatalog.css";

const PhoneCatalog = ({ phones, brandFilterSelected }) => {
  let phonesFiltered;

  if (brandFilterSelected) {
    phonesFiltered = phones
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
  } else {
    phonesFiltered = phones.map((p, index) => (
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
  }

  if (phonesFiltered.length === 0) {
    return (
      <div className="text-center grid-item my-5">
        <h5>No se encontraron productos con la búsqueda seleccionada.</h5>
      </div>
    );
  }

  return <>{phonesFiltered}</>;
};

export default PhoneCatalog;
