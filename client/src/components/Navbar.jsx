import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 w-full flex items-center justify-between h-18 px-6 bg-zinc-800">
      <h2 className="text-xl font-semibold">User Management System</h2>

      <nav className="flex items-center gap-4">
        {user?.role === "admin" && <Link to="/admin">Dashboard</Link>}
        <Link to="/resources">Resources</Link>
        <button
          onClick={() => logout()}
          className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
