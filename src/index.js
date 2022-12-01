import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import EditCaption from "./components/EditCaption";
import ErrorPage from "./components/ErrorPage";
import Genres from "./components/Genres";
import GraphQL from "./components/GraphQL";
import Login from "./components/Login";
import ManageCatalogue from "./components/ManageCatalogue";
import Captions from "./components/Captions";
import Caption from "./components/Caption";
import OneGenre from "./components/OneGenre";
import Profile from "./components/Profile";
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Captions /> },
      {
        path: "/dict/:id",
        element: <Caption />,
      },
      {
        path: "/konular",
        element: <Genres />,
      },
      {
        path: "/konu/:id",
        element: <OneGenre />,
      },
      {
        path: "/yeni",
        element: <EditCaption />,
      },
      {
        path: "/admin/movie/:id",
        element: <EditCaption />,
      },
      {
        path: "/mod",
        element: <ManageCatalogue />,
      },
      {
        path: "/graphql",
        element: <GraphQL />,
      },
      {
        path: "/uye",
        element: <Login />,
      },
      {
        path: "/profil",
        element: <Profile />,
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
