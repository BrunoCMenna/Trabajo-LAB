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
import Protected from "./components/routes/Protected";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";



const App = () => {
  const { theme } = useContext(ThemeContext);
  const router = createBrowserRouter([
    {
      path: "/Login",
      element: (
        <Protected>
          <Login />
        </Protected>
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
        <Protected>
          <SignIn />
        </Protected>
      ),
    },
    {
      path: "/Product/:id",
      element: <Product />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
      <div className={`${theme === "dark" && "dark-theme"}`}>
        <ToastContainer
          position="bottom-right"
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
