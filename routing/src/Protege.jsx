/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
function Protege({ estConnecte, children }) {
  if (!estConnecte) return <Navigate to="/" />;
  return <>{children}</>;
}

export default Protege;
