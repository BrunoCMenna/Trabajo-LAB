import React, { createContext, useState } from "react";
import { PHONES } from "../phones";

export const CartContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= PHONES.length; i++) {
    cart[i] = 0;
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

const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] === 0) {
      alert("El producto no se encuentra en el carrito");
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const getItemAmount = () => {
    const total = Object.values(cartItems).reduce((accum, n) => accum + n);
    return total;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PHONES.find((product) => product.id === Number(item));
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
  };
  console.log(cartItems);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default ShoppingCartProvider;
