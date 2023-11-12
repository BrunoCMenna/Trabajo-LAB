import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

import ProductDetail from "../ProductDetail/ProductDetail";
import "../Product/Product.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "react-bootstrap";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";
import NotFoundContent from "../ui/NotFoundContent";

const Product = ({ products }) => {
  const { theme } = useContext(ThemeContext);
  const { isLoading } = useContext(LoaderContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Encuentra el producto correspondiente al ID en la lista de productos
  const product = products
    .filter((p) => p.isActive !== false)
    .find((product) => product.id == id);

  return (
    <div className="">
      <NavBar />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 100px - 460px)" }}
        >
          <Spinner />
        </div>
      ) : (
        <div
          className={`d-flex justify-content-center ${
            theme === "dark" && "product-container-dark"
          }`}
        >
          {product ? <ProductDetail product={product} /> : <NotFoundContent />}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Product;
