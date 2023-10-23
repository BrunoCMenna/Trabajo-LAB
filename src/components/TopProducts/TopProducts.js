import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./TopProducts.css";
import { useNavigate } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const TopProducts = ({ top3 }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`d-flex flex-column ${
        theme === "dark" && "top-card-dark"
      }`}
    >
      <h2 className="d-flex justify-content-center">Trending!</h2>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        emulateTouch={true}
      >
        {top3.map((product) => (
          <button onClick={() => navigate(`/product/${product.productId}`)}>
            <div
              className={`top3-card-container ${
                theme === "dark" && "top3-card-dark"
              }`}
              style={{ width: "200px", height: "170px" }}
            >
              <h3 className="text-uppercase fw-medium">
                {product.brand} {product.model}
              </h3>

              <p> ${product.price}</p>
            </div>
          </button>
        ))}
      </Carousel>
    </div>
  );
};

export default TopProducts;
