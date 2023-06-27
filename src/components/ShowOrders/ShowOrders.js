import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, onValue } from "firebase/database";

import "../ShowOrders/ShowOrders.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";

const ShowOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useContext(UserContext);
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { isLoading, toggleLoading } = useContext(LoaderContext);

  useEffect(() => {
    toggleLoading(true);
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
      toggleLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goShop = () => {
    navigation("/shop");
  };

  return (
    <>
      <NavBar />
      <div className="">
        <div className="d-flex justify-content-center mt-4">
          <h2>Mis pedidos</h2>
        </div>
        <hr />
        {isLoading ? (
          <>
            <div className="d-flex justify-content-center mb-5">
              <Spinner />
            </div>
          </>
        ) : (
          <>
            <div className="container">
              {userOrders.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center">
                    <h4>No realizaste ningún pedido</h4>
                  </div>
                  <div className="d-flex justify-content-center m-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={goShop}
                    >
                      Ir a la tienda
                    </button>
                  </div>
                </>
              ) : (
                <table className="table table-responsive">
                  <div
                    className={`${theme === "dark" && "table-responsive-dark"}`}
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="">
                          Nombre y Apellido
                        </th>
                        <th scope="col" className="px-2">
                          Teléfono
                        </th>
                        <th scope="col" className="px-2">
                          Provincia
                        </th>
                        <th scope="col" className="px-2">
                          Localidad
                        </th>
                        <th scope="col" className="px-2">
                          Código Postal
                        </th>
                        <th scope="col" className="px-2">
                          Dirección
                        </th>
                        <th scope="col" className="px-2">
                          Estado
                        </th>
                        <th scope="col" className="px-2">
                          Productos
                        </th>
                        <th scope="col" className="px-2">
                          Total del pedido
                        </th>
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
                          <td>{order.state}</td>
                          <td>
                            <ul className="list-unstyled d-flex">
                              {order.products.map((product, productIndex) => (
                                <li
                                  key={productIndex}
                                  className="accordion-item"
                                >
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
                          <td className="px-3">${order.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </div>
                </table>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShowOrders;
