import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import AuthContextProvider from "./contexts/AuthContext";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import LoaderContextProvider from "./contexts/LoaderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ShoppingCartProvider>
        <ThemeContextProvider>
          <LoaderContextProvider>
            <App />
          </LoaderContextProvider>
        </ThemeContextProvider>
      </ShoppingCartProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
