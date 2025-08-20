import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="mt-20 max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>

        <p className="text-lg font-medium text-center mt-2">
          Welcome, {user?.name} ({user?.role})
        </p>
      </div>
    </>
  );
};

export default AdminDashboard;
