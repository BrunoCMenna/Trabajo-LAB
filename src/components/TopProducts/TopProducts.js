import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./TopProducts.css";
import PhoneItem from "../PhoneItem/PhoneItem";

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
    <div
      className={`d-flex flex-column ${theme === "dark" && "top-card-dark"}`}
    >
      <h3 className="text-center">Más vendidos</h3>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        emulateTouch={true}
      >
        {top3.map((p, index) => (
          <button onClick={() => navigateToProduct(p.productId)}>
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
          </button>
        ))}
      </Carousel>
    </div>
  );
};

export default TopProducts;
