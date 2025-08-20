import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="mt-20 overflow-hidden">
      <h2 className="text-2xl font-bold text-center">Login Here</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-3 bg-zinc-800 p-4 rounded-lg shadow-lg mt-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-orange-500 p-2 mt-2 font-medium rounded hover:bg-orange-600 cursor-pointer"
        >
          Login
        </button>

        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline hover:underline-offset-2"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
