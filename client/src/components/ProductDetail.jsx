import { useState } from "react";

export default function ProductDetail({ product, onAddToCart, onClose }) {
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <p className="mb-2 text-gray-600">{product.description}</p>
        <p className="mb-4 text-green-600 font-bold">${product.price}</p>
        <div className="flex items-center mb-4">
          <label className="mr-2 font-semibold">Cantidad:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={() => onAddToCart(product, quantity)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
