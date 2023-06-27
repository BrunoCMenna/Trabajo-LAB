import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import "../ShowOrders/ShowOrders.css";

import { ThemeContext } from "../../contexts/ThemeContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Spinner from "../ui/Spinner";

const ShowOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { toggleLoading, isLoading } = useContext(LoaderContext);

  useEffect(() => {
    toggleLoading(true);
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
      toggleLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const goShop = () => {
    navigation("/shop");
  };

  const handleStateChange = (userId, newState, orderId) => {
    setSelectedOrder({ userId, orderId, newState });
    if (newState === "Entregado") {
      setShowModal(true);
    } else {
      updateOrderState(userId, newState, orderId);
    }
  };

  const updateOrderState = (userId, newState, orderId) => {
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

  const confirmStateChange = () => {
    const { userId, orderId, newState } = selectedOrder;
    updateOrderState(userId, newState, orderId);
    setShowModal(false);
  };

  const filterOrders = (orders) => {
    return orders.filter((order) => order.state !== "Entregado");
  };

  const filteredOrders = filterOrders(userOrders);

  return (
    <>
      <NavBar />
      <div className="">
        <div className="d-flex justify-content-center mt-4">
          <h2>Gestión de Pedidos</h2>
        </div>
        <hr />
        {isLoading ? (
          <div className="d-flex justify-content-center mb-5">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="container">
              {filteredOrders.length === 0 ? (
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
                      {filteredOrders.map((order, index) => (
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
                            {order.state !== "Entregado" ? (
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
                            ) : (
                              "Entregado"
                            )}
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cambio de estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>El pedido cambiará a estado "Entregado" y se archivará.</p>
          <span className="d-flex justify-content-center">
            ¿Desea continuar?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmStateChange}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
};

export default ShowOrders;
