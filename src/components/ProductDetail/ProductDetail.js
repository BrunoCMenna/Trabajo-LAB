import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ProductDetails = ({ id, products }) => {
  const params = useParams();

  id = parseInt(params.id, 10);

  const [phone, setPhone] = useState(null);

  useEffect(() => {
    const foundPhone = products.find((item) => item.id === id);
    setPhone(foundPhone);
  }, [id]);

  if (!phone) {
    return <div>Phone not found.</div>;
  }

  const { brand, model, price, image } = phone;

  return (
    <div>
      <h2>
        {brand} {model}
      </h2>
      <p>Price: {price}</p>
      <img src={image} alt={model} />
    </div>
  );
};

export default ProductDetails;
