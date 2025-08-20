import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import Resources from "./pages/Resources";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route
          element={<PrivateRoute roles={["user", "moderator", "admin"]} />}
        >
          <Route path="/home" element={<UserHome />} />
          <Route path="/resources" element={<Resources />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
