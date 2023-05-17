import React from "react";
import "./Shop.css";
import { Button, Col, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PhoneCatalog from "../PhoneCatalog/PhoneCatalog";

const Shop = () => {
  const phones = [
    {
      id: 1,
      brand: "Samsung",
      model: "Galaxy A-10",
      price: 10000,
    },
    {
      id: 2,
      brand: "Iphone",
      model: "14 Pro",
      price: 20000,
    },
    {
      id: 3,
      brand: "Xiaomi",
      model: "Note 12",
      price: 30000,
    },
    {
      id: 4,
      brand: "LG",
      model: "Modelo LG",
      price: 40000,
    },
    {
      id: 5,
      brand: "Samsung",
      model: "Galaxy A-50",
      price: 50000,
    },
    {
      id: 6,
      brand: "Motorola",
      model: "One Hyper",
      price: 55000,
    },
  ];

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="shop-body">
        <PhoneCatalog phones={phones} />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
