import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ roles }) => {
  const { user, token, loading } = useAuth();

  if (loading)
    return (
      <p className="text-zinc-400 flex justify-center items-center h-screen">
        Loading...
      </p>
    );

  if (!token) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role))
    return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default PrivateRoute;
