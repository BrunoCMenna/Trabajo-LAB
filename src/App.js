import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import ProtectedIfUserIsLogged from "./components/routes/ProtectedIfUserIsLogged";
import ProtectedIfUserIsNotLogged from "./components/routes/ProtectedIfUserIsNotLogged";
import Login from "./components/Login/Login";
import NotFound from "./components/routes/NotFound";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import SignIn from "./components/SignIn/SignIn";
import UserPanel from "./components/UserPanel/UserPanel";
import Orders from "./components/Orders/Orders";
import ShowOrders from "./components/ShowOrders/ShowOrders";
import ProductPanel from "./components/ProductPanel/ProductPanel";
import ProtectedAdmin from "./components/routes/ProtectedAdmin";
import OrderPanel from "./components/OrderPanel/OrderPanel";
import ProtectedSysAdmin from "./components/routes/ProtectedSysAdmin";
import { LoaderContext } from "./contexts/LoaderContext";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { toggleLoading } = useContext(LoaderContext);
  const [products, setProducts] = useState([]);
  const PRODUCTS_ENDPOINT =
    "https://648a168e5fa58521cab0c8e7.mockapi.io/api/v1/products";

  useEffect(() => {
    toggleLoading(true);
    fetch(PRODUCTS_ENDPOINT, {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productData) => {
        const productsMapped = productData.map((product) => ({
          ...product,
        }));
        setProducts(productsMapped);
        toggleLoading(false);
        console.log("Productos cargados en App", productsMapped);
      })
      .catch((error) => {
        console.log(error);
        toggleLoading(false);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shop products={products} />,
    },
    {
      path: "/Login",
      element: (
        <ProtectedIfUserIsLogged>
          <Login />
        </ProtectedIfUserIsLogged>
      ),
    },
    {
      path: "/Shop",
      element: <Shop products={products} />,
    },
    {
      path: "/Cart",
      element: <Cart products={products} />,
    },
    {
      path: "/signin",
      element: (
        <ProtectedIfUserIsLogged>
          <SignIn />
        </ProtectedIfUserIsLogged>
      ),
    },
    {
      path: "/userpanel",
      element: (
        <ProtectedSysAdmin>
          <UserPanel />
        </ProtectedSysAdmin>
      ),
    },
    {
      path: "/orders",
      element: (
        <ProtectedIfUserIsNotLogged>
          <Orders products={products} />
        </ProtectedIfUserIsNotLogged>
      ),
    },
    {
      path: "/showOrders",
      element: (
        <ProtectedIfUserIsNotLogged>
          <ShowOrders />,
        </ProtectedIfUserIsNotLogged>
      ),
    },
    {
      path: "/ProductPanel",
      element: (
        <ProtectedAdmin>
          <ProductPanel products={products} />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/OrderPanel",
      element: (
        <ProtectedAdmin>
          <OrderPanel />
        </ProtectedAdmin>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className={`${theme === "dark" && "dark-theme"}`}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={`${theme}`}
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
