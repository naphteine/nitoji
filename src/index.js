import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import EditCaption from "./components/EditCaption";
import ErrorPage from "./components/ErrorPage";
import Genres from "./components/Genres";
import GraphQL from "./components/GraphQL";
import Home from "./components/Home";
import Login from "./components/Login";
import ManageCatalogue from "./components/ManageCatalogue";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import OneGenre from "./components/OneGenre";
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Movies /> },
      {
        path: "/dict/:id",
        element: <Movie />,
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
        path: "/admin/movie/0",
        element: <EditCaption />,
      },
      {
        path: "/admin/movie/:id",
        element: <EditCaption />,
      },
      {
        path: "/manage-catalogue",
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
