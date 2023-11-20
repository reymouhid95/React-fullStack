/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";

function Article() {
  const { id } = useParams();
  return (
    <div>
      <h2>Article avec l'id : {id}</h2>
    </div>
  );
}

export default Article;
