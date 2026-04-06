import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { PackageIcon, TrendingUp, Star, Tag } from "lucide-react";
import { Auth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { loggedInUser, cart } = useContext(Auth);

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    } catch (_) {
      return null;
    }
  })();

  const user = loggedInUser || storedUser;
  const name = user?.name || user?.email?.split("@")[0] || "there";
  const cartValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-6 text-white md:px-8 ">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="grid gap-8 rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_90px_rgba(0,0,0,0.25)] md:grid-cols-[1.6fr_1fr] md:p-10">
          <div className="relative overflow-hidden rounded-[30px] bg-[#090909] p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]"></div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Welcome back,
                </h1>
                <p className="text-5xl font-extrabold text-lime-400 sm:text-6xl">
                  {name}!
                </p>
              </div>
              <p className="max-w-xl text-sm text-gray-300 sm:text-base">
                Discover today&apos;s picks — hand-curated products across
                electronics, fashion, and more.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/products")}
                  className="inline-flex items-center justify-center rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
                >
                  Shop Now
                  <span className="ml-2 text-lg">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/products")}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-lime-400 hover:text-lime-300"
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-lime-400/20 bg-lime-400/10 p-5">
              <p className="text-4xl font-bold text-lime-400">20+</p>
              <p className="mt-2 text-sm text-gray-300">Products Available</p>
            </div>
            <div className="rounded-[24px] border border-white/20 bg-black/60 p-5">
              <p className="text-4xl font-bold text-white">Free</p>
              <p className="mt-2 text-sm text-gray-400">Delivery on ₹999+</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:border-lime-400/40">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-lime-400/10 text-lime-400">
              <PackageIcon className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold">{cart.length}</p>
            <p className="mt-3 text-sm text-gray-400">Cart Items</p>
            <p className="mt-1 text-xs text-gray-500">In your bag</p>
          </article>

          <article className="rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:border-lime-400/40">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-sky-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold">${cartValue.toFixed(2)}</p>
            <p className="mt-3 text-sm text-gray-400">Cart Value</p>
            <p className="mt-1 text-xs text-gray-500">Ready to checkout</p>
          </article>

          <article className="rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:border-lime-400/40">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-900 text-amber-300">
              <Star className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold">5</p>
            <p className="mt-3 text-sm text-gray-400">Top Products</p>
            <p className="mt-1 text-xs text-gray-500">Highly rated</p>
          </article>

          <article className="rounded-[26px] border border-white/10 bg-white/5 p-6 transition hover:border-lime-400/40">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-violet-900 text-violet-300">
              <Tag className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold">6</p>
            <p className="mt-3 text-sm text-gray-400">Categories</p>
            <p className="mt-1 text-xs text-gray-500">To explore</p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Home;
