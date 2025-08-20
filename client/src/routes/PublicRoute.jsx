import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { token } = useAuth();

  if (token) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default PublicRoute;
