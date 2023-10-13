import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

import ProductDetail from "../ProductDetail/ProductDetail";
import "../Product/Product.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const Product = ({ products }) => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();

  // Encuentra el producto correspondiente al ID en la lista de productos
  const product = products.find((product) => product.id == id);

  return (
    <div className="">
      <NavBar />
      <div
        className={`d-flex justify-content-center ${
          theme === "dark" && "product-container-dark"
        }`}
      >
        {product ? (
          <ProductDetail product={product} />
        ) : (
          <p>Producto no encontrado</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product;
