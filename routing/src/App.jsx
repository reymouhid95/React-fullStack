import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="link">
      <Link to="/About">Visiter à propos</Link>
      <Link to="/Blog">Visiter le blog</Link>
    </div>
  );
}

export default App;
