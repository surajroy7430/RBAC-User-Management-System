import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { register, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(name, email, password, role);
  };

  return (
    <div className="mt-20 overflow-hidden">
      <h2 className="text-2xl font-bold text-center">Register User</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-3 bg-zinc-800 p-4 rounded-lg shadow-lg mt-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded"
        />
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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-orange-500 p-2 mt-2 font-medium rounded hover:bg-orange-600 cursor-pointer"
        >
          Register
        </button>

        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline hover:underline-offset-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
