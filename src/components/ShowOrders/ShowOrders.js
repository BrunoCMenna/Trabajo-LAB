import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";

import "../ShowOrders/ShowOrders.css";

import { UserContext } from "../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const ShowOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useContext(UserContext);
  const navigation = useNavigate();

  useEffect(() => {
    const database = getDatabase();
    const ordersRef = ref(database, `orders/${user.uid}`);

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const orders = [];
      snapshot.forEach((childSnapshot) => {
        const order = childSnapshot.val();
        orders.push(order);
      });
      setUserOrders(orders);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goShop = () => {
    navigation("/shop");
  };

  if (userOrders.length === 0) {
    return (
      <>
        <NavBar />
        <div className="d-flex justify-content-center m-3">
          <h3>No realizaste ningún pedido</h3>
        </div>
        <div className="d-flex justify-content-center m-2">
          <button type="button" className="btn btn-primary" onClick={goShop}>
            Ir a la tienda
          </button>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <div className="order-container">
          {userOrders.map((order, index) => (
            <div key={index} className="order">
              <h4>Pedido:</h4>
              <p>Nombre: {order.name}</p>
              <p>Teléfono: {order.phoneNumber}</p>
              <p>Provincia: {order.province}</p>
              <p>Localidad: {order.city}</p>
              <p>Código Postal: {order.zipcode}</p>
              <p>Dirección: {order.address}</p>
              <div>
                <h5>Productos:</h5>
                {order.products.map((product, productIndex) => (
                  <div key={productIndex} className="products">
                    <img
                      src={product.image}
                      alt="Producto"
                      className="img-product"
                    />
                    <p>{product.brand}</p>
                    <p>{product.model}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Cantidad: {product.quantity}</p>
                  </div>
                ))}
                <p>Total del pedido: ${order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }
};

export default ShowOrders;
