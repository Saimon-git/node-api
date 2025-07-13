import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";

export default function UserDetail({ token }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al obtener usuario");
        setUser(data);
      } catch (err) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUser();
  }, [token]);

  if (!token) return null;
  if (loading) return <p className="text-center mt-8">Cargando datos de usuario...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Datos de Usuario</h2>
      <div className="mb-2"><span className="font-semibold">ID:</span> {user.id}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
      {user.name && <div className="mb-2"><span className="font-semibold">Nombre:</span> {user.name}</div>}
      {user.role && <div className="mb-2"><span className="font-semibold">Rol:</span> {user.role}</div>}
      <div className="mb-2"><span className="font-semibold">Creado:</span> {new Date(user.createdAt).toLocaleString()}</div>
    </div>
  );
}
