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
import SuppContent from "./components/Supp/SuppContent";
import Product from "./components/Product/Product";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import FloatingButton from "./components/SupportPopup/FloatingButton";
import HistoricProductsPrice from "./components/HistoricProductsPrice/HistoricProductsPrice";
import ProtectedOnlyUser from "./components/routes/ProtectedOnlyUser";
const App = () => {
  const { theme } = useContext(ThemeContext);
  const { toggleLoading } = useContext(LoaderContext);
  const [top3, setTop3] = useState([]);
  const [products, setProducts] = useState([]);
  const PRODUCTS_ENDPOINT = "https://localhost:44377/api/Product/GetProducts";

  useEffect(() => {
    toggleLoading(true);

    // Primera llamada API
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
      })
      .catch((error) => {
        console.log(error);
        toggleLoading(false);
      });

    // Segunda llamada API
    fetch("https://localhost:44377/api/Product/GetTopProducts", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productData) => {
        const topProducts = productData.map((product) => ({
          ...product,
        }));
        setTop3(topProducts);
        toggleLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toggleLoading(false);
      });
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.add(theme === "dark" ? "appDark" : "appLight");

    return () => {
      body.classList.remove("appDark", "appLight");
    };
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedOnlyUser>
          <Shop products={products} top3={top3} />
        </ProtectedOnlyUser>
      ),
    },
    {
      path: "/shop",
      element: (
        <ProtectedOnlyUser>
          <Shop products={products} top3={top3} />
        </ProtectedOnlyUser>
      ),
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
      path: "/Cart",
      element: (
        <ProtectedOnlyUser>
          <Cart products={products} />
        </ProtectedOnlyUser>
      ),
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
      // hay que agregar protected admin solamente
      path: "/HistoricProductsPrice",
      element: (
        <ProtectedAdmin>
          <HistoricProductsPrice />
        </ProtectedAdmin>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/Help",
      element: <SuppContent />,
    },
    {
      path: "/product/:id",
      element: (
        <ProtectedOnlyUser>
          <Product products={products} />
        </ProtectedOnlyUser>
      ),
    },
    {
      path: "/Dashboard",
      element: (
        <ProtectedAdmin>
          <AdminDashboard />
        </ProtectedAdmin>
      ),
    },
  ]);
  return (
    <div className={theme === "dark" ? "appDark" : "appLight"}>
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
      <FloatingButton />
    </div>
  );
};

export default App;
