import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import AuthContextProvider from "./contexts/AuthContext";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ShoppingCartProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ShoppingCartProvider>
    </AuthContextProvider>
  </React.StrictMode>
);