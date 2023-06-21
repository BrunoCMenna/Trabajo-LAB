import React, { useContext, useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";

import "../Orders/Orders.css";

import NavBar from "../NavBar/NavBar";
import { PHONES } from "../../phones";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { UserContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Orders = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(UserContext);
  const { cartItems, getTotalCartAmount } = useContext(CartContext);
  const TotalCartAmount = getTotalCartAmount();

  const createProductsInCart = (cart) => {
    const productsInCart = {};
    for (const productId in cart) {
      const quantity = cart[productId];
      const phone = PHONES.find((phone) => phone.id === parseInt(productId));

      if (phone && quantity >= 1) {
        productsInCart[productId] = {
          ...phone,
          quantity,
        };
      }
    }
    return productsInCart;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const products = createProductsInCart(cartItems);
    console.log(products);
    if (TotalCartAmount === 0) {
      toast.error("No hay ningún producto en el carrito");
      return;
    }

    const newOrder = {
      name: name,
      phoneNumber: phone,
      province: province,
      city: city,
      zipcode: zipcode,
      address: address,
      products: products,
      totalPrice: TotalCartAmount,
    };

    const database = getDatabase();
    const orderRef = ref(database, `orders/${user.uid}`);
    const newOrderRef = push(orderRef);

    try {
      toast.info("Iniciando carga"); //PONER LOADERS
      await set(newOrderRef, newOrder).then(() => {
        console.log("El pedido se guardó correctamente en la base de datos.");
        setName("");
        setPhone("");
        setCity("");
        setZipcode("");
        setAddress("");
      });
      toast.success("Listo");
    } catch (error) {
      console.log("Error al guardar el pedido:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="body-container d-flex justify-content-center">
        <div className="form-container">
          <hr />
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
                <option value="Santiago del Estero">Santiago del Estero</option>
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
            <button type="submit" className="btn btn-primary d-flex m-auto">
              Confirmar compra
            </button>
          </form>
        </div>
        <div className="total">
          <hr />
          <h4>Detalle:</h4>
          {PHONES.map((product) => {
            if (cartItems[product.id] !== 0) {
              return (
                <div className="d-flex">
                  <img className="product-img" src={product.image} alt="" />
                  <span className="ms-auto">
                    {product.brand} {product.model}
                  </span>
                  <span className="ms-auto">x{cartItems[product.id]}</span>
                  <span className="ms-auto">
                    ${product.price * cartItems[product.id]}
                  </span>
                </div>
              );
            }
          })}
          <hr />
          <div className="d-flex">
            <h4>Subtotal:</h4>
            <span className="ms-auto">${TotalCartAmount}</span>
          </div>
          <div className="mt-3">
            <p>
              Se enviarán los datos de facturación al siguiente email:
              <span> {user.email}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
