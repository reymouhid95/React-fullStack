import { useState } from "react";

function Compteur() {
  const [compteur, setCompteur] = useState(5);
  const incrementer = () => {
    setCompteur(compteur + 1);
  };
  const decrementer = () => {
    setCompteur(compteur - 1);
  };
  return (
    <>
      <h1>Compteur</h1>
      <div className="compteur">
        <button onClick={incrementer}>+</button>
        <p className={compteur < 0 && "erreur"}>{compteur}</p>
        <button onClick={decrementer}>-</button>
      </div>
    </>
  );
}

export default Compteur;
