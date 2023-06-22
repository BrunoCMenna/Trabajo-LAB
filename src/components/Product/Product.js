import React from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import ProductItem from "../ProductDetail/ProductDetail";

const Product = ({ products }) => {
  const params = useParams();

  const navigation = useNavigate();

  const goShop = () => {
    navigation("/shop");
  };

  return (
    <div>
      <NavBar />
      <div className="product-container">
        <div className="product-table">
          {products.map((product) => {
            return (
              <ProductItem
                products={products}
                id={params.id}
                brand={product.brand}
                model={product.model}
                price={product.price}
                image={product.image}
              />
            );
          })}
        </div>
        <div className="subtotal">
          <Button className="btn btn-primary" onClick={goShop}>
            Volver a la tienda
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Product;
