import Login from "./components/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NotFound from "./components/routes/NotFound";
import Shop from "./components/Shop/Shop";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import Cart from "./components/Cart/Cart";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/Login",
      element: <Login />,
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
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <ShoppingCartProvider>
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
    </ShoppingCartProvider>
  );
};

export default App;
