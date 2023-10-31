import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LoaderContext } from "../../contexts/LoaderContext";
import { UserContext } from "../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Spinner from "../ui/Spinner";
import "../OrderPanel/OrderPanel.css";

const ShowOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pedidos");
  const [orderEndpointsResult, SetOrderEndpointsResult] = useState([]);
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { toggleLoading, isLoading } = useContext(LoaderContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    toggleLoading(true);
    fetch("https://localhost:44377/api/Order/GetOrders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((ordersData) => {
        console.log("Ventas traidas:", ordersData);
        console.log("OrderItems traidos:", ordersData.orderItems);
        console.log("Objeto como está ahora: ", filteredOrders);
        setOrdersData(ordersData);
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

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
    const requestBody = {
      "orderStatus": newState,
    };
    console.log("newState: ", newState);
    console.log("OrderID: ", orderId);
    fetch(`https://localhost:44377/api/Order/UpdateOrderStatus/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json)
      .then(() => {
        toast.info("Pedido actualizado");
        const updatedOrdersData = ordersData.map((order) => {
          if (order.id === orderId) {
            return { ...order, orderStatus: newState };
          }
          return order;
        });
        setOrdersData(updatedOrdersData);
      })
      .catch((error) => {
        toast.error("Hubo un problema al actualizar el pedido");
        console.log("Error al actualizar pedido: ", error);
      });
  };

  const confirmStateChange = () => {
    const { userId, orderId, newState } = selectedOrder;
    updateOrderState(userId, newState, orderId);

    const updatedOrdersData = ordersData.map((order) => {
      if (order.id === orderId) {
        return { ...order, orderStatus: newState };
      }
      return order;
    });
    setOrdersData(updatedOrdersData);

    setShowModal(false);
  };

  const filterOrders = (orders) => {
    if (selectedOption === "Pedidos") {
      return orders.filter((order) => order.orderStatus !== "Entregado");
    } else if (selectedOption === "Archivados") {
      return orders.filter((order) => order.orderStatus === "Entregado");
    }
    return [];
  };
  const filteredOrders = filterOrders(ordersData);

  return (
    <>
      <NavBar />
      <div
        className={`orderPanel-container ${
          theme === "dark" && "orderPanel-container-dark"
        }`}
      >
        <div className="d-flex justify-content-center pt-4">
          <h2>Gestión de Pedidos</h2>
        </div>
        <div className="d-flex justify-content-center m-3">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="form-select-sm"
          >
            <option value="Pedidos">Pedidos</option>
            <option value="Archivados">Archivados</option>
          </select>
        </div>
        <hr />
        {isLoading ? (
          <div className="d-flex justify-content-center mb-5">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="container pb-2">
              {filteredOrders.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center">
                    <h4>No hay pedidos para gestionar</h4>
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
                <>
                  <table className="table table-responsive">
                    <div
                      className={`${
                        theme === "dark" && "table-responsive-dark"
                      }`}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Usuario</th>
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
                            <td className="px-3">{order.email}</td>
                            <td className="px-3">{order.nameLastName}</td>
                            <td className="px-3">{order.phone}</td>
                            <td className="px-3">{order.province}</td>
                            <td className="px-3">{order.city}</td>
                            <td className="px-3">{order.zipCode}</td>
                            <td className="px-3">{order.shippingAddress}</td>
                            <td className="px-3 d-flex">
                              {order.orderItems.map((item, productIndex) => (
                                <div className="">
                                  <div
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
                                      <div
                                        className="card p-2"
                                        style={{
                                          width: "max-content",
                                          fontSize: "13px",
                                        }}
                                      >
                                        <p>
                                          {item.brand} {item.model}
                                        </p>
                                        <p>
                                          Precio unitario: ${item.unitaryPrice}
                                        </p>
                                        <p>Cantidad: {item.quantity}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </td>
                            <td className="px-3">${order.orderTotal}</td>
                            <td>
                              {order.orderStatus !== "Entregado" ? (
                                <select
                                  value={order.orderStatus}
                                  onChange={(e) =>
                                    handleStateChange(
                                      order.userId,
                                      e.target.value,
                                      order.id
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
                </>
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
          <span>¿Desea continuar?</span>
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
