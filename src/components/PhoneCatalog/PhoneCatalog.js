import React from "react";

import PhoneItem from "../PhoneItem/PhoneItem";

const PhoneCatalog = ({ phones, brandFilterSelected }) => {
  const phonesFiltered = phones
    .filter((p) => p.brand === brandFilterSelected)
    .map((p) => (
      <PhoneItem id={p.id} brand={p.brand} model={p.model} price={p.price} />
    ));

  const noFilteredPhones = phones.map((p) => (
    <PhoneItem id={p.id} brand={p.brand} model={p.model} price={p.price} />
  ));
  return <>{phonesFiltered.length === 0 ? noFilteredPhones : phonesFiltered}</>;
};

export default PhoneCatalog;
