import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { PHONES } from "../../phones";
import ProductItem from "../ProductDetail/ProductDetail";
import { useNavigate } from "react-router";

const Product = () => {

    const params = useParams();

    const navigation = useNavigate();

    const goShop = () => {
        navigation("/product");
    };

    return (
        <div>
            <NavBar />
            <div className="product-container">
                <div className="product-table">
                    {PHONES.map((product) => {
                        return (
                            <ProductItem
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
export default Product