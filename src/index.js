import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import EditCaption from "./components/EditCaption";
import ErrorPage from "./components/ErrorPage";
import Genres from "./components/Genres";
import Login from "./components/Login";
import Register from "./components/Register";
import Mod from "./components/Mod";
import Captions from "./components/Captions";
import Caption from "./components/Caption";
import OneGenre from "./components/OneGenre";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import MultipleCaptions from "./components/MultipleCaptions";
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
	path: "/toplu",
	element: <MultipleCaptions />,
      },
      {
        path: "/mod/dict/:id",
        element: <EditCaption />,
      },
      {
        path: "/mod",
        element: <Mod />,
      },
      {
        path: "/giris",
        element: <Login />,
      },
      {
        path: "/kayit",
        element: <Register />
      },
      {
        path: "/profil",
        element: <Profile />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />
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
