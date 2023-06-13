import Login from "./components/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NotFound from "./components/routes/NotFound";
import Shop from "./components/Shop/Shop";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import SignIn from "./components/SignIn/SignIn";
import AuthContextProvider from "./contexts/AuthContext";
import Protected from "./components/routes/Protected";

const App = () => {
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
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
};

export default App;
