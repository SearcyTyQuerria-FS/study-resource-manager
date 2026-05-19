import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-800 text-white px-6 py-3 flex gap-6">
      <Link to="/" className="hover:text-stone-200">
        Home
      </Link>
      <Link to="/about" className="hover:text-stone-200">
        About
      </Link>
    </nav>
  );
}

export default Navbar;
