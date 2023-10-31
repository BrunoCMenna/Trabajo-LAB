import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

import "../Orders/Orders.css";

import NavBar from "../NavBar/NavBar";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { UserContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import { LoaderContext } from "../../contexts/LoaderContext";

const Orders = ({ products }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { cartItems, getTotalCartAmount, getDefaultCart, setCartItems } =
    useContext(CartContext);
  const { token } = useContext(UserContext);
  const { isLoading, toggleLoading } = useContext(LoaderContext);
  const TotalCartAmount = getTotalCartAmount();
  const navigation = useNavigate();
  const goShop = () => {
    navigation("/shop");
  };

  const createProductsObject = (cart) => {
    const orderItems = [];

    //Se recorre el el objeto carrito (compuesto de id_del_producto: cantidad)
    //Se accede a la cantidad de cada id (de cada producto)
    //Busca en tdos los productos traidos de la api, el celular correspondiente a la ID que esta en el carrito

    for (const productId in cart) {
      const quantity = cart[productId];
      const phone = products.find(
        (phone) => parseInt(phone.id) === parseInt(productId)
      );

      //Si se encuentra y su cantidad es mayor a 1, es decir, que fue agregado al menos 1 vez al carrito, se agrega al nuevo objeto.
      if (phone && quantity >= 1) {
        orderItems.push({
          productId: parseInt(productId),
          quantity: quantity,
          image: phone.image,
          brand: phone.brand,
          model: phone.model,
        });
      }
    }
    return orderItems;
    // Se crea el objeto que determina solamente los productos que se van a comprar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderItems = createProductsObject(cartItems);
    const newOrder = {
      userId: parseInt(user.nameid),
      shippingAddress: address,
      zipCode: zipcode,
      orderTotal: TotalCartAmount,
      orderStatus: "Pendiente",
      phone: phone,
      province: province,
      nameLastName: name,
      email: user.email,
      city: city,
      orderItems: orderItems,
    };

    const createOrder = async () => {
      toggleLoading(true);
      try {
        const request = await fetch(
          "https://localhost:44377/api/Order/CreateOrder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(newOrder),
          }
        );

        if (request.status === 201 || request.status === 200) {
          toast.success("¡Tu compra realizada con éxito!");
          setCartItems(getDefaultCart(products));
        } else {
          toast.error("Producto delistado o sin stock, por favor recargue la página ");
        }
      } catch (error) {
        console.log("Error clg: ", error);
      }
      toggleLoading(false);
    };
    createOrder();
  };

  return (
    <>
      <NavBar />
      {TotalCartAmount === 0 ? (
        <>
          <div
            className={`d-flex flex-column justify-content-center align-items-center p-5 ${
              theme === "dark" && "body-container-dark"
            }`}
            style={{ minHeight: "calc(100vh - 100px - 460px)" }}
          >
            <h3>Agrega nuevos productos al carrito para comprar!</h3>
            <div>
              <button onClick={goShop} className="btn btn-primary">
                Ir a la tienda
              </button>
              <button
                onClick={() => navigation("/showorders")}
                className="btn btn-primary"
              >
                Mis pedidos
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`d-md-flex pt-5 pb-3 justify-content-center ${
              theme === "dark" && "body-container-dark"
            }`}
          >
            <div className="total me-5 border p-3">
              <h4>Detalle:</h4>
              {products.map((product) => {
                if (cartItems && cartItems[product.id] !== 0) {
                  return (
                    <div className="d-flex">
                      <img className="product-img" src={product.image} alt="" />
                      <span className="ms-3 pe-2">
                        {product.brand} {product.model}
                      </span>
                      <span className="me-3 ms-auto">
                        x{cartItems[product.id]}
                      </span>
                      <span className="ms-auto">
                        ${product.price * cartItems[product.id]}
                      </span>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
              <hr />
              <div className="d-flex">
                <h4>Subtotal:</h4>
                <span className="ms-auto">${TotalCartAmount}</span>
              </div>
              <div className="mt-3">
                <p>
                  Se enviará la factura correspondiente al siguiente email:
                  <span> {user.email}</span>
                </p>
              </div>
            </div>
            <div className="form-container mb-4">
              <form onSubmit={handleSubmit} className="">
                <h4>Información:</h4>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Número de teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Provincia
                  </label>
                  <select
                    class="form-control"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                  >
                    <option value="" disabled selected className="text-reset">
                      Seleccione una provicia...
                    </option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Capital Federal">Capital Federal</option>
                    <option value="Catamarca">Catamarca</option>
                    <option value="Chaco">Chaco</option>
                    <option value="Chubut">Chubut</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Corrientes">Corrientes</option>
                    <option value="Entre Ríos">Entre Ríos</option>
                    <option value="Formosa">Formosa</option>
                    <option value="Jujuy">Jujuy</option>
                    <option value="La Pampa">La Pampa</option>
                    <option value="La Rioja">La Rioja</option>
                    <option value="Mendoza">Mendoza</option>
                    <option value="Misiones">Misiones</option>
                    <option value="Neuquén">Neuquén</option>
                    <option value="Río Negro">Río Negro</option>
                    <option value="Salta">Salta</option>
                    <option value="San Juan">San Juan</option>
                    <option value="San Luis">San Luis</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Santiago del Estero">
                      Santiago del Estero
                    </option>
                    <option value="Tierra del Fuego">Tierra del Fuego</option>
                    <option value="Tucumán">Tucumán</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">
                    Localidad
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Código Postal
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-flex m-auto mt-5"
                  disabled={isLoading}
                >
                  Confirmar compra
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Orders;
