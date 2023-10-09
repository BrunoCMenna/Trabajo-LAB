import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDatabase, ref, onValue, update } from "firebase/database";
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
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pedidos");
  const [orderEndpointsResult, SetOrderEndpointsResult] = useState("");
  const navigation = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { toggleLoading, isLoading } = useContext(LoaderContext);
  const { token } = useContext(UserContext);

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

    fetch("https://localhost:44377/api/Order/GetOrders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((newProductData) => {
        //toast.success("Producto agregado con éxito");
        console.log("Ventas traidas:", newProductData);
        console.log("Objeto como está ahora: ", filteredOrders);
        SetOrderEndpointsResult(newProductData);
      })
      .catch((error) => {
        console.error("Error al traer ventas:", error);
      });

    return () => {
      unsubscribe();
    };
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
    if (selectedOption === "Pedidos") {
      return orders.filter((order) => order.state !== "Entregado");
    } else if (selectedOption === "Archivados") {
      return orders.filter((order) => order.state === "Entregado");
    }
    return [];
  };

  const filteredOrders = filterOrders(userOrders);

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
                        {/* {orderEndpointsResult.map((order, index))} */}
                        {orderEndpointsResult &&
                          orderEndpointsResult.map((order, index) => (
                            <tr key={index}>
                              <td className="px-3">
                                {order.email || order.userId}
                              </td>
                              <td className="px-3">{order.name || "Jorge"}</td>
                              <td className="px-3">{order.phone}</td>
                              <td className="px-3">{order.province}</td>
                              <td className="px-3">
                                {order.city || "Rosario"}
                              </td>
                              <td className="px-3">{order.zipCode}</td>
                              <td className="px-3">{order.shippingAddress}</td>
                              <td className="px-3">
                              {/* forma de mapear los items de las ventas */}
                              {/* {order.orderItems.map((item) => item.productId).join(", ")} */}
                              <img src={order.orderImage} alt="Imagen de la orden" width={50} />
                              <img src={order.orderImage} alt="Imagen de la orden" width={50} />
                              </td>
                              {/* <td className="px-3">
                                <ul className="list-unstyled d-flex"> */}
                              {/* {order.products.map(
                                    (product, productIndex) => (
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
                                          <div
                                            className={`card card-body ${
                                              theme === "dark" &&
                                              "text-bg-secondary"
                                            }`}
                                          >
                                            <p>
                                              {product.brand} {product.model}
                                            </p>
                                            <p>Precio: ${product.price}</p>
                                            <p>Cantidad: {product.quantity}</p>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  )} */}
                              {/* </ul>
                              </td> */}
                              <td className="px-3">${order.orderTotal}</td>
                              <td>
                                {order.orderStatus !== "Entregado" ? (
                                  <select
                                    value={order.status}
                                    onChange={(e) =>
                                      handleStateChange(
                                        order.userId,
                                        e.target.value,
                                        order.orderId
                                      )
                                    }
                                  >
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Despachado">
                                      Despachado
                                    </option>
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
