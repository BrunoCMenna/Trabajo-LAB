import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const PRODUCTS_ENDPOINT =
          "https://localhost:44377/api/Product/GetProducts";
        const response = await fetch(PRODUCTS_ENDPOINT, {
          headers: {
            accept: "application/json",
          },
        });
        const productData = await response.json();
        const productsMapped = productData.map((product) => ({
          ...product,
        }));
        setProducts(productsMapped);
        const cartItems = getDefaultCart(productsMapped);
        setCartItems(cartItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getDefaultCart = (products) => {
    let cart = {};
    for (const product of products) {
      cart[product.id] = 0;
    }
    return cart;
    //Devuelve un objeto "cart" que su atributo va a coincidir con la ID de cada uno de nuestros objetos PHONES.
    //Se crearia un objeto que simula ser el carrito de esta forma:
    // 1: 0
    // 2: 0
    // 3: 0
    // ...
    // donde el atributo indica el ID de nuestro producto y lo setea en 0 (es decir ninguno esta en el carrito todavia)
  };

  const addToCart = (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + parseInt(quantity),
    }));
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] === 0) {
      alert("El producto no se encuentra en el carrito");
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const getItemAmount = () => {
    const uniqueIds = Object.keys(cartItems || {}).filter(
      (id) => cartItems[id] > 0
    ).length;
    return uniqueIds;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find(
          (product) => parseInt(product.id) === Number(item)
        );
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  //pasamos lo que vayamos a utilizar del context en cualquier otro lugar
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getItemAmount,
    getTotalCartAmount,
    getDefaultCart,
    setCartItems,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default ShoppingCartProvider;
