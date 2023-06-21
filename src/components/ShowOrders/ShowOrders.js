import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, onValue, get } from "firebase/database";

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
        order.products = Object.values(order.products);
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
        <hr />
        <div className="d-flex justify-content-center">
          <h2>Mis pedidos:</h2>
        </div>
        <hr />
        <div className="container">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Nombre y Apellido</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Provincia</th>
                <th scope="col">Localidad</th>
                <th scope="col">Código Postal</th>
                <th scope="col">Dirección</th>
                <th scope="col">Productos</th>
                <th scope="col">Total del pedido</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.province}</td>
                  <td>{order.city}</td>
                  <td>{order.zipcode}</td>
                  <td>{order.address}</td>
                  <td>
                    <ul className="list-unstyled d-flex">
                      {order.products.map((product, productIndex) => (
                        <li key={productIndex} className="accordion-item">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}${productIndex}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}${productIndex}`}
                          >
                            <div className="d-flex align-items-center">
                              <div className="d-flex flex-wrap">
                                <img
                                  src={product.image}
                                  alt="Producto"
                                  className="img-fluid img-thumbnail img-product mr-3"
                                  style={{ width: "100px" }}
                                />
                              </div>
                            </div>
                          </button>
                          <div
                            id={`collapse${index}${productIndex}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${index}${productIndex}`}
                          >
                            <div className="card card-body">
                              <p>
                                {product.brand} {product.model}
                              </p>
                              <p>Precio unitario: ${product.price}</p>
                              <p>Cantidad: {product.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>${order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </>
    );
  }
};

export default ShowOrders;
