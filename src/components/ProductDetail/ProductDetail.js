import { useState } from "react";
import { PHONES } from "../../phones";


const ProductDetail = ({ product }) => {
    
    

    return (
        <div className="detail-container">
            <h2>Detalles del producto:</h2>
            <p>ID: {product}</p>
            <p>Detalles del producto: {product} {product}</p>
            <button>Agregar al carrito</button>
        </div>
    )
  }


export default ProductDetail