import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser, cart } = useContext(Auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    } catch (_) {
      return null;
    }
  })();

  const user = loggedInUser || storedUser;
  const displayName = user?.name || user?.email?.split("@")[0] || "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <header className="bg-black/80 backdrop-blur-xl border-b border-white/5 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/home")}
          className="text-xl font-bold tracking-tight text-white cursor-pointer"
        >
          Sky<span className="text-lime-400">Mart</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? "text-lime-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? "text-lime-400" : "text-gray-300 hover:text-white"
              }`
            }
          >
            Products
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/cart")}
            className="relative hidden rounded border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-lime-400 hover:text-white md:inline-flex"
          >
            <ShoppingCart className="w-5 h-6" />
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1.5 text-[10px] font-bold text-black">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          <div className="hidden items-center gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 md:flex">
            <div className="flex h-6 items-center justify-center rounded-full p-2 bg-lime-400 text-sm font-bold text-black">
              {initial}
            </div>
            <div className="text-sm">
              <p className="font-semibold text-white">{displayName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="hidden rounded border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:border-lime-400 hover:text-white md:inline-flex"
          >
            <LogOut className="w-5 h-6" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/cart")}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-gray-200 transition hover:border-lime-400 hover:text-white md:hidden"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-gray-200 transition hover:border-lime-400 hover:text-white md:hidden"
          >
            <LogOut className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-gray-200 transition hover:border-lime-400 hover:text-white md:hidden"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/5 bg-black/95 md:hidden">
          <div className="space-y-4 px-4 py-4">
            <div className="space-y-2">
              <NavLink
                to="/dashboard/home"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "text-lime-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard/products"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "text-lime-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Products
              </NavLink>
            </div>

            <div className="pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-sm font-semibold text-red-500 transition hover:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
