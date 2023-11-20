/* eslint-disable react/prop-types */
function Posts({ data, liker, deleted }) {
  return (
    <div className={data.liker ? "post active" : "post"}>
      <div>
        <h2>{data.titre}</h2>
        <p>{data.description}</p>
      </div>
      <div className="btn">
        <button className="like" onClick={() => liker(data)}>
          {data.liker ? "Already liked" : "Like"}
        </button>
        <button className="delete" onClick={() => deleted(data.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Posts;
