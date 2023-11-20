import { useRouteError } from "react-router-dom";

function PageErreur() {
  const erreur = useRouteError();
  return (
    <div>
      <h2>Il y a une erreur</h2>
      <p>
        <i>{erreur.statusText || erreur.message}</i>
      </p>
    </div>
  );
}

export default PageErreur;
