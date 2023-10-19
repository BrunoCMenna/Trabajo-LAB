import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "../PhoneCard/PhoneCard.css";
import "../PhoneItem/PhoneItem.css";
import "./TopProducts.css"
import { useNavigate } from "react-router";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  return (
    <button onClick={() => navigate(`/product/${product.productId}`)} style={{ border: 'none', background: 'none' }}>
      <div
        className={`phone-card-container ${
          theme === "dark" && "phone-card-dark"
        }`}
        style={{ width: '200px', height: '170px' }}
      >
        <h3 className="text-uppercase fw-medium">
            {product.brand} {product.model}  
          </h3>

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
      style={{ width: '250px', height: '300px',  }}
    >
      <h2 className="d-flex justify-content-center">Trending!</h2>
      <Carousel showThumbs={false} showStatus={false} showIndicators={true} emulateTouch={true}>
        {top3.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default TopProducts;
