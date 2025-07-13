import { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";
import UserDetail from "./components/UserDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:3000/api"; // Cambia esto si tu backend está en otra URL

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('main'); // 'main', 'detail', 'cart', 'orders'
  const [cart, setCart] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrder = async () => {
    setOrderLoading(true);
    setOrderError("");
    setOrderSuccess(false);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al generar la orden");
      setOrderSuccess(true);
      setCart([]);
    } catch (err) {
      setOrderError(err.message || "Error inesperado");
    } finally {
      setOrderLoading(false);
    }
  };

  // Al cargar, verifica si hay token guardado
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuth = async ({ email, password }) => {
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const res = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error de autenticación");
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    }
    setUser(data.user || { email });
    localStorage.setItem("user", JSON.stringify(data.user || { email }));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  const handleAddToCart = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setSelectedProduct(null);
    setView('main');
  };

  const handleCartClick = () => {
    setView('cart');
    setSelectedProduct(null);
  };

  const handleOrdersClick = () => {
    setView('orders');
    setSelectedProduct(null);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setView('main');
  };

  const handleCloseCart = () => {
    setView('main');
  };

  if (user) {
    if (view === 'detail' && selectedProduct) {
      return (
        <div className="min-h-screen bg-gray-100 pb-16 flex flex-col items-center pt-8">
          <button
            className="self-start ml-4 mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
            onClick={handleCloseDetail}
          >
            ← Volver
          </button>
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onClose={handleCloseDetail}
          />
        </div>
      );
    }
    if (view === 'cart') {
      return (
        <div className="min-h-screen bg-gray-100 pb-16 flex flex-col items-center pt-8">
          <button
            className="self-start ml-4 mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
            onClick={handleCloseCart}
          >
            ← Volver
          </button>
          <Cart
            cart={cart}
            onRemove={handleRemoveFromCart}
            onClear={handleClearCart}
            onOrder={handleOrder}
            loading={orderLoading}
            error={orderError}
            orderSuccess={orderSuccess}
          />
        </div>
      );
    }
    if (view === 'orders') {
      return (
        <div className="min-h-screen bg-gray-100 pb-16 flex flex-col items-center pt-8">
          <button
            className="self-start ml-4 mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
            onClick={() => setView('main')}
          >
            ← Volver
          </button>
          <OrderHistory token={token} />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-gray-100 pb-16">
        {/* Nuevo header flex */}
        <div className="flex items-center justify-between px-8 pt-6 pb-2 bg-white shadow-sm mb-6">
          {/* Menú de navegación */}
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={handleOrdersClick}
              title="Ver historial de órdenes"
            >
              <span className="font-bold text-blue-700">Órdenes</span>
            </button>
          </div>
          {/* Usuario y logout tipo dropdown */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 font-bold text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer">
                <span>{user.email}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
            {/* Carrito alineado a la derecha */}
            <button
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow hover:bg-gray-100 transition-colors ml-4 cursor-pointer"
              onClick={handleCartClick}
              title="Ver carrito"
              style={{marginRight: '1.5rem'}}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-green-600" />
              {(() => {
                const count = cart.reduce((acc, item) => acc + item.quantity, 0);
                if (count > 9) return <span className="!font-bold !text-yellow-500">{count}</span>;
                if (count > 0) return <span className="!font-bold !text-blue-600">{count}</span>;
                return <span className="!font-bold !text-green-700">{count}</span>;
              })()}
            </button>
          </div>
        </div>
        <ProductList token={token} onProductClick={handleProductClick} onAddToCart={handleAddToCart} />
        {/* <OrderHistory token={token} /> */}
        {/* <UserDetail token={token} /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100">
      <AuthForm onAuth={handleAuth} isLogin={isLogin} />
      <div className="text-center mt-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setIsLogin((v) => !v)}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
}

export default App;
