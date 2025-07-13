import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:3000/api";

export default function ProductList({ token, onProductClick, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al obtener productos");
        setProducts(data);
      } catch (err) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProducts();
  }, [token]);

  if (!token) return null;
  if (loading) return <p className="text-center mt-8">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!products.length) return <p className="text-center mt-8">No hay productos disponibles.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">Productos</h2>
      <ul className="flex flex-col gap-8">
        {products.map((p) => (
          <li
            key={p.id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 px-6 flex flex-row items-center gap-6 min-h-[180px] group"
          >
            {/* Imagen placeholder alineada a la izquierda con margen izquierda */}
            <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden" style={{paddingLeft: '1em'}}>
              <img
                src={`https://placehold.co/128x128?text=Producto`}
                alt={p.name}
                className="object-contain w-full h-full"
              />
            </div>
            {/* Detalles centrados */}
            <div className="flex-1 w-full flex flex-col items-center justify-center cursor-pointer" onClick={() => onProductClick && onProductClick(p)}>
              <span className="block text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-center">{p.name}</span>
              <span className="block text-gray-500 text-base mb-2 text-center">{p.description}</span>
              {/* Etiquetas ejemplo */}
              <div className="flex flex-wrap items-center gap-2 mb-2 justify-center">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Llega mañana</span>
                <span className="text-pink-600 text-xs font-bold italic">SUPERMERCADO</span>
                <span className="text-green-700 text-xs font-bold flex items-center gap-1"><svg className="w-4 h-4 inline-block text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>FULL</span>
              </div>
              {/* Calificación ejemplo */}
              <div className="flex items-center gap-1 text-blue-500 text-sm justify-center">
                <span>4.9</span>
                <svg width="14" height="14" className="text-yellow-400" fill="currentColor" viewBox="0 0 20 20" style={{minWidth:'14px',minHeight:'14px'}}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                <span className="text-gray-400">(59)</span>
              </div>
            </div>
            {/* Precio y botón carrito alineados a la derecha con margen derecha */}
            <div className="flex flex-col items-end gap-3 min-w-[110px] ml-auto"  style={{marginRight: '1rem'}}>
              <span className="text-green-600 font-extrabold text-2xl">${p.price}</span>
              <button
                className="cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-md transition-colors"
                title="Agregar al carrito"
                onClick={e => { e.stopPropagation(); onAddToCart && onAddToCart(p, 1); }}
                style={{marginRight: '-0.5rem',marginTop: '0.5rem', padding: '1em'}}
              >
                <FontAwesomeIcon icon={faCartPlus} size="lg" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
