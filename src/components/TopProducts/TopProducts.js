import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "../PhoneCard/PhoneCard.css";
import "../PhoneItem/PhoneItem.css";
import "./TopProducts.css"
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  return (
    <button onClick={() => navigate(`/product/${product.productId}`)}>
      <div
        className={`phone-card-container ${
          theme === "dark" && "phone-card-dark"
        }`}
      >
        <h2>
          {product.brand} {product.model}
        </h2>

        <p> ${product.price}</p>
      </div>
    </button>
  );
};

const TopProducts = ({ top3 }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`phone-container d-flex flex-column ${
        theme === "dark" && "top-card-dark"
      }`}
    >
      <h2 className="d-flex justify-content-center">Trending!</h2>
      {top3.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default TopProducts;
