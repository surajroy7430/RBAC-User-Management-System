import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Resources = () => {
  const { token } = useAuth();
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/resources`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResources(res.data.resources);
        setError(null);
      } catch (error) {
        setError("Cannot get resources");
      }
    };

    fetchResources();
  }, [token]);

  const createResource = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/resources`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResources([...resources, res.data.resources]);
      setTitle("");
      setContent("");
    } catch (error) {
      setError("resource creation failed");
    }
  };

  const deleteResource = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/resources/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResources(resources.filter((r) => r._id !== id));
    } catch (error) {
      setError("resource creation failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center">Resources</h1>

        <div className="my-4"></div>

        <ul className="space-y-2">
          {resources.map(r => (
            <li key={r._id} className="flex justify-between border p-2">
              <span>{r.title}</span>
              <button onClick={() => deleteResource(r._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Resources;
