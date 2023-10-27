import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./TopProducts.css";

function useTopProductsNavigation() {
  const navigate = useNavigate();

  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return navigateToProduct;
}

const TopProducts = ({ top3 }) => {
  const { theme } = useContext(ThemeContext);
  const navigateToProduct = useTopProductsNavigation();

  return (
    <div className={`d-flex flex-column ${theme === "dark" && "top-card-dark"}`}>
      <h2 className="d-flex justify-content-center">Trending!</h2>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        emulateTouch={true}
      >
        {top3.map((product) => (
          <button onClick={() => navigateToProduct(product.productId)}>
            <div
              className={`top3-card-container ${theme === "dark" && "top3-card-dark"}`}
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
