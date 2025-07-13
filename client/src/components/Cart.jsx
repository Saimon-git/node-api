import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Cart({ cart, onRemove, onClear, onOrder, loading, error, orderSuccess }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!cart.length) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faShoppingCart} className="text-blue-500" /> Carrito
      </h2>
      <ul className="mb-4">
        {cart.map((item) => (
          <li key={item.product.id} className="flex justify-between items-center border-b py-2">
            <div>
              <span className="font-semibold">{item.product.name}</span>
              <span className="ml-2 text-gray-500">x{item.quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">${item.product.price * item.quantity}</span>
              <button
                className="text-red-500 hover:bg-red-100 rounded-full p-2 transition-colors"
                onClick={() => onRemove(item.product.id)}
                title="Quitar del carrito"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold">Total:</span>
        <span className="text-green-700 font-bold">${total}</span>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {orderSuccess && <p className="text-green-600 text-sm mb-2">¡Orden generada exitosamente!</p>}
      <div className="flex gap-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          onClick={onClear}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faTrash} /> Vaciar carrito
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 flex items-center gap-2 justify-center"
          onClick={onOrder}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {loading ? "Generando orden..." : "Generar orden"}
        </button>
      </div>
    </div>
  );
}
