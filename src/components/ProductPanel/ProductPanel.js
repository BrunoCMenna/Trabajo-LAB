import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button, Modal } from "react-bootstrap";

const ProductPanel = ({ products }) => {
  const [editedProducts, setEditedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    brand: "",
    model: "",
    price: "",
    image: "",
    isActive: true,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setEditedProducts(products);
    console.log("ProductPanel: Seteó los productos en useEffect");
  }, [products]);

  const handleInputChangeOnExistingProduct = (event, productId) => {
    const { name, value } = event.target;
    setEditedProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          const updatedValue = name === "price" ? parseInt(value) : value;
          return { ...product, [name]: updatedValue };
        }
        return product;
      })
    );
    setHasChanges(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleStatusChange = (productId, isActive) => {
    setHasChanges(true);
    setEditedProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return { ...product, isActive };
        }
        return product;
      })
    );
  };

  const openModal = () => {
    setShowModal(true);
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewProduct({
      brand: "",
      model: "",
      price: "",
      image: "",
      isActive: true,
    });
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const addNewProduct = () => {
    fetch("https://648a168e5fa58521cab0c8e7.mockapi.io/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((newProductData) => {
        toast.success("Producto agregado con éxito");
        console.log("Producto agregado:", newProductData);
      })
      .catch((error) => {
        console.error("Error al agregar el producto:", error);
      });
    closeModal();
  };

  const deleteProduct = () => {
    fetch(
      `https://648a168e5fa58521cab0c8e7.mockapi.io/api/v1/products/${selectedProductId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then(() => {
        toast.success("Producto eliminado con éxito");
        setEditedProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProductId)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
    closeDeleteModal();
  };

  const saveChanges = () => {
    setHasChanges(false);
    editedProducts.forEach((product) => {
      fetch(
        `https://648a168e5fa58521cab0c8e7.mockapi.io/api/v1/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      )
        .then((response) => response.json())
        .then((updatedProduct) => {
          console.log("Producto actualizado:", updatedProduct);
        })
        .catch((error) => {
          console.error("Error al actualizar el producto:", error);
        });
    });
    toast.success("Se han guardado los cambios");
  };

  console.log("editedProducts:", editedProducts);
  return (
    <>
      <NavBar />
      <div className="container mt-4 d-flex flex-column">
        <h2 className="d-flex justify-content-center">
          Panel de Gestión de Productos
        </h2>
        <hr />
        <div className="row">
          {editedProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div
                className={`card ${product.isActive ? "" : "bg-secondary"} ${
                  theme === "dark" ? "text-bg-dark" : ""
                }`}
              >
                <img
                  src={product.image}
                  alt={product.model}
                  className="card-img-top img-fluid"
                />
                <div className="card-body d-flex flex-column">
                  <p className="card-text">
                    Marca:{" "}
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={product.brand}
                      onChange={(e) =>
                        handleInputChangeOnExistingProduct(e, product.id)
                      }
                    />
                  </p>
                  <p className="card-text">
                    Modelo:{" "}
                    <input
                      type="text"
                      className="form-control"
                      name="model"
                      value={product.model}
                      onChange={(e) =>
                        handleInputChangeOnExistingProduct(e, product.id)
                      }
                    />
                  </p>
                  <p className="card-text">
                    Precio:
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={product.price}
                      onChange={(e) =>
                        handleInputChangeOnExistingProduct(e, product.id)
                      }
                    />
                  </p>
                  <p className="card-text">
                    Estado: {product.isActive ? "Disponible" : "No disponible"}
                  </p>
                  <button
                    className={`mx-auto btn btn-sm ${
                      product.isActive ? "btn-danger" : "btn-success"
                    }`}
                    onClick={(e) =>
                      handleStatusChange(product.id, !product.isActive)
                    }
                  >
                    {product.isActive ? "Desenlistar" : "Listar"}
                  </button>
                  <button
                    className="mx-auto btn btn-sm btn-danger mt-2"
                    onClick={() => openDeleteModal(product.id)}
                  >
                    Eliminar producto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column justify-content-center align-self-center">
          <button
            className="btn btn-success mt-3 align-self-center"
            onClick={openModal}
            style={{ width: "250px", padding: "1rem", margin: "1rem" }}
          >
            Agregar nuevo producto
          </button>
          <button
            className="btn btn-primary mt-3 align-self-center"
            disabled={!hasChanges}
            onClick={saveChanges}
            style={{ width: "250px", padding: "1rem", margin: "2rem" }}
          >
            Guardar Cambios
          </button>
        </div>
        <div>
          {/* POST METHOD MODAL */}
          <Modal
            show={showModal}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Agregar nuevo producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="brand" className="form-label">
                    Marca
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    className="form-control"
                    value={newProduct.brand}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="model" className="form-label">
                    Modelo
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    className="form-control"
                    value={newProduct.model}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    URL de la imagen
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    className="form-control"
                    value={newProduct.image}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={addNewProduct}>
                Agregar
              </Button>
            </Modal.Footer>
          </Modal>
          {/* DELETE METHOD MODAL */}
          <Modal
            show={showDeleteModal}
            onHide={closeDeleteModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Eliminar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Este producto se elminará para siempre.</p>
              <p>¿Está seguro que desea continuar?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeDeleteModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={deleteProduct}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPanel;
