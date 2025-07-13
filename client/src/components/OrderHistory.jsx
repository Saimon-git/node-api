import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";

export default function OrderHistory({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        // Ajusta aquí el parámetro necesario, por ejemplo userId si es requerido
        // const userId = ...; // obtén el userId si es necesario
        // const res = await fetch(`${API_URL}/my-orders?userId=${userId}`, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const res = await fetch(`${API_URL}/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al obtener órdenes");
        setOrders(data);
      } catch (err) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrders();
  }, [token]);

  if (!token) return null;
  if (loading) return <p className="text-center mt-8">Cargando historial de órdenes...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!orders.length) return <p className="text-center mt-8">No tienes órdenes previas.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Historial de Órdenes</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Orden #{order.id}</span>
              <span className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <ul className="ml-4 mt-2 text-sm text-gray-700">
              {order.items && order.items.map((item) => (
                <li key={item.id}>
                  {item.product?.name || 'Producto'} x{item.quantity} - ${item.product?.price || 0}
                </li>
              ))}
            </ul>
            <div className="text-right font-bold text-green-700 mt-2">
              Total: ${order.total}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
