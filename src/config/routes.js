import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Login";
import { Protected, ProtectedRoute } from "./midleware";
import App from "../App";

export const AllRoutes = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute> <App /></ProtectedRoute>,
    },
   
    {
      path: "/login",
      element:<Protected> <Login /> </Protected>,
    },
  ]);