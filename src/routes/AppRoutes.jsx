import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import Shop from "../pages/Shop";
import ProtectedDashboard from "./ProtectedDashboard";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <ProtectedDashboard />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "products",
              element: <Shop />,
            },
            {
              path: "product/:id",
              element: <ProductDetail />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
