import { useState } from "react";
import "./App.css";
import Compteur from "./components/Compteur";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

// Composant principal
function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      titre: "Rey",
      description:
        "Voici un exemple de texte qui vient juste remplacer ce text ici",
      liker: false,
    },
    {
      id: 2,
      titre: "Oury",
      description:
        "Voici un exemple de texte qui vient juste remplacer ce text ici",
      liker: false,
    },
    {
      id: 3,
      titre: "Thierno",
      description:
        "Voici un exemple de texte qui vient juste remplacer ce text ici",
      liker: false,
    },
    {
      id: 4,
      titre: "Amadou",
      description:
        "Voici un exemple de texte qui vient juste remplacer ce text ici",
      liker: false,
    },
  ]);

  // Méthode pour liker
  const liker = (data) => {
    const dataCopied = [...posts];
    const index = posts.indexOf(data);
    dataCopied[index] = { ...posts[index], liker: !posts[index].liker };
    setPosts(dataCopied);
  };

  // Méthode pour supprimer
  const deletePost = (id) => {
    const newData = posts.filter((p) => p.id != id);
    setPosts(newData);
  };

  // Méthode pour compter les likes
  const numberLiker = posts.filter((p) => p.liker);

  // Affichage de l'App
  return (
    <div className="App">
      <Compteur />
      <Navbar numberLike={numberLiker.length} />
      {posts.map((p) => (
        <Posts data={p} key={p.id} liker={liker} deleted={deletePost} />
      ))}
    </div>
  );
}

export default App;
