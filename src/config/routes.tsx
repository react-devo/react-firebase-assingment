import { createBrowserRouter, BrowserRouterProps } from "react-router-dom";
import React, { ReactElement } from "react";
import Login from "../Components/Login";
import { Protected, ProtectedRoute } from "./midleware.tsx";
import App from "../App.tsx";
import SyllabusView from "../SyllabusView.js";
import UserProfile from "../UserProfile.js";

interface Route {
  path: string;
  element: ReactElement;
}

export const AllRoutes: BrowserRouterProps = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <App /></ProtectedRoute>,
  },
  {
    path: "/syllabus",
    element: <ProtectedRoute> <SyllabusView /></ProtectedRoute>,
  },
  {
    path: "/account",
    element: <ProtectedRoute> <UserProfile /></ProtectedRoute>,
  },
  {
    path: "/login",
    element:<Protected> <Login /> </Protected>,
  },
]);