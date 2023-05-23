import React from "react";

import PhoneItem from "../PhoneItem/PhoneItem";

const PhoneCatalog = ({ phones }) => {
  const phonesMapped = phones.map((p) => (
    <PhoneItem id={p.id} brand={p.brand} model={p.model} price={p.price} />
  ));
  return phonesMapped;
};

export default PhoneCatalog;
