import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, onValue, update } from "firebase/database";

import "../ShowOrders/ShowOrders.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";

const ShowOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true);
    const database = getDatabase();
    const ordersRef = ref(database, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const orders = [];
      snapshot.forEach((userSnapshot) => {
        const userId = userSnapshot.key; // Obtener el ID del usuario
        userSnapshot.forEach((orderSnapshot) => {
          const orderId = orderSnapshot.key; // Obtener el ID del pedido
          const order = orderSnapshot.val();
          order.products = Object.values(order.products);
          order.userId = userId; // Agregar el ID del usuario al objeto order
          order.orderId = orderId; // Agregar el ID del pedido al objeto order
          orders.push(order);
        });
      });
      setUserOrders(orders);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goShop = () => {
    navigation("/shop");
  };

  const handleStateChange = (userId, newState, orderId) => {
    const userRef = ref(getDatabase(), `orders/${userId}/${orderId}`);

    update(userRef, { state: newState })
      .then(() => {
        toast.info("Estado actualizado");
        console.log("Estado actualizado exitosamente");
      })
      .catch((error) => {
        console.error("Error al actualizar el Estado:", error);
      });
  };

  return (
    <>
      <NavBar />
      <div className="">
        {isLoading ? (
          <h2 className="d-flex justify-content-center">Cargando...</h2>
        ) : (
          <>
            <div className="d-flex justify-content-center mt-4">
              <h2>Gestión de Pedidos</h2>
            </div>
            <hr />
            <div className="container">
              {userOrders.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center">
                    <h4>No se realizó ningún pedido</h4>
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
                        <th scope="col">Nombre y Apellido</th>
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
                          Productos
                        </th>
                        <th scope="col" className="px-3">
                          Total del pedido
                        </th>
                        <th scope="col" className="px-3">
                          Estado
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
                                          style={{
                                            width: "100px",
                                          }}
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
                                      <p>Precio: ${product.price}</p>
                                      <p>Cantidad: {product.quantity}</p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-3">${order.totalPrice}</td>
                          <td>
                            <select
                              value={order.state}
                              onChange={(e) =>
                                handleStateChange(
                                  order.userId,
                                  e.target.value,
                                  order.orderId
                                )
                              }
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="Despachado">Despachado</option>
                              <option value="Entregado">Entregado</option>
                            </select>
                          </td>
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
