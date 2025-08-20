import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      if (!token) return;
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch user profile:", error.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const register = async (name, email, password, role) => {
    try {
      setError(null);
      setLoading(true);
      await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login.");
      logout();
      navigate("/login");
    } catch (error) {
      setError("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;

      setToken(token);
      localStorage.setItem("token", token);
      setUser(user);

      navigate("/home");
    } catch (error) {
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, token, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
