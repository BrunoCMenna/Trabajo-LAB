import React, { useContext, useEffect, useState } from "react";
import "../OrderPanel/OrderPanel.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { LoaderContext } from "../../contexts/LoaderContext";
import Spinner from "../ui/Spinner";

const HistoricProductsPrice = () => {
  const [historicProducts, setHistoricProducts] = useState([]);

  const { theme } = useContext(ThemeContext);
  const { isLoading, toggleLoading } = useContext(LoaderContext);
  const { token } = useContext(UserContext);

  useEffect(() => {
    toggleLoading(true);
    fetch(`https://localhost:44377/api/Product/GetHistoricProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setHistoricProducts(productsData);
        console.log("Productos traídos: ", productsData);
      })
      .catch((error) => {
        console.error("Error al traer productos:", error);
      });
    toggleLoading(false);
  }, []);

  const goShop = () => {
    navigation("/shop");
  };

  return (
    <>
      <NavBar />
      <div
        className={`orderPanel-container ${
          theme === "dark" && "container-dark pb-2"
        }`}
      >
        <div className="d-flex justify-content-center pt-5">
          <h2> Productos Históricos </h2>
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
            <div className="container pb-2">
              {historicProducts && historicProducts.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center">
                    <h4>No hay productos</h4>
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
                          Marca
                        </th>
                        <th scope="col" className="px-3">
                          Modelo
                        </th>
                        <th scope="col" className="px-3">
                          Almacenamiento
                        </th>
                        <th scope="col" className="px-3">
                          Ram
                        </th>
                        <th scope="col" className="px-3">
                          Descripción
                        </th>
                        <th scope="col" className="px-3">
                          Precio
                        </th>
                        <th scope="col" className="px-3">
                          Imágen
                        </th>
                        <th scope="col" className="px-3">
                          Stock
                        </th>
                        <th scope="col" className="px-3">
                          Fecha de alta
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicProducts &&
                        historicProducts.map((product, index) => (
                          <tr key={index}>
                            <td className="px-3">{product.brand}</td>
                            <td className="px-3">{product.model}</td>
                            <td className="px-3">{product.storage}</td>
                            <td className="px-3">{product.ram}</td>
                            <td className="px-3">{product.description}</td>
                            <td className="px-3">{product.price}</td>
                            <td className="px-3">
                              <img
                                src={product.image}
                                alt={`Image of ${product.model}`}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td className="px-3">{product.inStock}</td>
                            {/* <td className="px-3">{product.IsActive}</td> */}
                            <td className="px-3">{product.registrationDate}</td>
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

export default HistoricProductsPrice;
