/* eslint-disable react/no-unescaped-entities */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Article from "./Article.jsx";
import PageErreur from "./PageErreur.jsx";
import Contact from "./Contact.jsx";
import Emploi from "./Emploi.jsx";
import Erreur404 from "./Erreur404.jsx";
import Protege from "./Protege.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageErreur />,
  },
  {
    path: "About",
    element: (
      <Protege estConnecte={false}>
        {" "}
        <>
          {" "}
          <h1>À propos</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            unde consequuntur nihil, a illo placeat quam fuga deserunt
            voluptatibus tenetur id eius cumque dolor odit? Quas deserunt sunt
            ipsa molestias?
          </p>
          <Link to="/">Retour à l'accueil</Link>,
          <div className="link">
            <Link to="/About/Contact">Contact</Link>
            <Link to="/About/Emploi">Emploi</Link>
          </div>
          <div>
            <Outlet />
          </div>
        </>
      </Protege>
    ),
    children: [
      {
        path: "/About/Contact",
        element: <Contact />,
      },
      {
        path: "/About/Emploi",
        element: <Emploi />,
      },
    ],
  },
  {
    path: "Blog",
    element: (
      <>
        <h2>Liste des articles</h2>
        <Link to="/Blog/200">Premier article</Link>
      </>
    ),
  },
  {
    path: "Blog/:id/",
    element: <Article />,
  },
  {
    path: "*",
    element: <Erreur404 />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
