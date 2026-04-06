import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(Auth);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCart([]);
    toast.success("Order placed successfully!");
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard/products")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-lime-400 hover:text-lime-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </button>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300">
            <span className="font-semibold text-white">{totalItems}</span> items in cart
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-12 text-center text-gray-300">
            <p className="text-2xl font-semibold text-white mb-4">Your cart is empty</p>
            <p className="mb-6 text-sm text-gray-400">
              Add products from the shop to see them here.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              className="rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Shop Products
            </button>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1.7fr_0.9fr]">
            <section className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-full rounded-3xl object-cover lg:h-40 lg:w-40"
                    />
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <p className="text-xl font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gray-500">
                          {item.category}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white transition hover:text-lime-400"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-4 min-w-[32px] text-center text-sm text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white transition hover:text-lime-400"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-red-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-3 text-right">
                      <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                      <p className="text-2xl font-semibold text-lime-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="mb-8 rounded-3xl bg-black/40 p-4 text-sm text-gray-400">
                Shipping will be calculated at checkout.
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-full bg-lime-400 px-5 py-4 text-sm font-semibold text-black transition hover:bg-lime-300"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-4 w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-gray-200 transition hover:border-lime-400 hover:text-white"
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;