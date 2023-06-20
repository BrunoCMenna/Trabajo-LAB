import Login from "./components/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NotFound from "./components/routes/NotFound";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import SignIn from "./components/SignIn/SignIn";
import ProtectedIfUserIsLogged from "./components/routes/ProtectedIfUserIsLogged";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import UserPanel from "./components/UserPanel/UserPanel";
import Orders from "./components/Orders/Orders";
import ProtectedIfUserIsNotLogged from "./components/routes/ProtectedIfUserIsNotLogged";
import ShowOrders from "./components/ShowOrders/ShowOrders";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const router = createBrowserRouter([
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
      element: <Shop />,
    },
    {
      path: "/Cart",
      element: <Cart />,
    },
    {
      path: "/Product",
      element: <Product />,
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
      path: "/Product/:id",
      element: <Product />,
    },
    {
      path: "/panel",
      element: <UserPanel />,
    },
    {
      path: "/orders",
      element: (
        <ProtectedIfUserIsNotLogged>
          <Orders />
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
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className={`${theme === "dark" && "dark-theme"}`}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
