/* eslint-disable react/prop-types */
function Navbar({ numberLike }) {
  return (
    <div className="entete">
      <h1>Les postes likés sont : {numberLike}</h1>
    </div>
  );
}

export default Navbar;
