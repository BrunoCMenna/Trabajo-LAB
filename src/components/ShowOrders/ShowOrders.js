import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
  const { token } = useContext(UserContext);

  useEffect(() => {
    toggleLoading(true);
    fetch(
      `https://localhost:44377/api/Order/GetOrdersByUserId/${user.nameid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((ordersData) => {
        setUserOrders(ordersData);
        console.log("Ordenes traídas: ", ordersData);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error("Error al traer ventas:", error);
        toggleLoading(false);
      });
  }, []);

  const goShop = () => {
    navigation("/shop");
  };

  return (
    <>
      <NavBar />
      <div
        className={`showorders ${theme === "dark" && "container-dark pb-2"}`}
      >
        <div className="d-flex justify-content-center pt-5">
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
              {userOrders && userOrders.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center pt-5">
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
                        <th scope="col" className="px-3">
                          Teléfono
                        </th>
                        <th scope="col" className="px-3">
                          Provincia
                        </th>
                        <th scope="col" className="px-3">
                          Localidad
                        </th>
                        <th scope="col" className="px-3">
                          Código Postal
                        </th>
                        <th scope="col" className="px-3">
                          Dirección
                        </th>
                        <th scope="col" className="px-3">
                          Estado
                        </th>
                        <th scope="col" className="px-3">
                          Productos
                        </th>
                        <th scope="col" className="px-3">
                          Total del pedido
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrders &&
                        userOrders.map((order, index) => (
                          <tr key={index}>
                            <td className="px-3">{order.nameLastName}</td>
                            <td className="px-3">{order.phone}</td>
                            <td className="px-3">{order.province}</td>
                            <td className="px-3">{order.city}</td>
                            <td className="px-3">{order.zipCode}</td>
                            <td className="px-3">{order.shippingAddress}</td>
                            <td className="px-3">{order.orderStatus}</td>
                            <td className="px-3">
                              <ul className="list-unstyled d-flex">
                                {order.orderItems.map((item, productIndex) => (
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
                                            src={item.image}
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
                                      <div className="card p-2 card-font">
                                        <p>
                                          {item.brand} {item.model}
                                        </p>
                                        <p>
                                          Precio unitario: ${item.unitaryPrice}
                                        </p>
                                        <p>Cantidad: {item.quantity}</p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="px-3">${order.orderTotal}</td>
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
