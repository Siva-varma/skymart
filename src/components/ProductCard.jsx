import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Auth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(Auth);
  const existingItem = cart.find((item) => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/dashboard/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === product.id);
      if (item) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQty = (e) => {
    e.stopPropagation();
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecreaseQty = (e) => {
    e.stopPropagation();
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-black/80 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative z-0 overflow-hidden bg-gray-100 h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col grow">
        {/* Product Name */}
        <h3 className=" font-semibold text-sm line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-gray-600 text-xs">
            ({Math.floor(Math.random() * 300)})
          </span>
        </div>

        {/* Price */}
        <div className="text-yellow-400 font-bold text-lg mb-3">
          ${product.price.toFixed(2)}
        </div>

        {/* Footer - Button */}
        <div className="mt-auto flex gap-2">
          {existingItem ? (
            <div className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-2 py-2">
              <button
                onClick={handleDecreaseQty}
                className="h-9 w-9 rounded-lg bg-black/70 text-white transition hover:bg-black"
              >
                -
              </button>
              <span className="text-sm font-semibold text-white">
                {existingItem.quantity}
              </span>
              <button
                onClick={handleIncreaseQty}
                className="h-9 w-9 rounded-lg bg-black/70 text-white transition hover:bg-black"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          )}
          {/* <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Heart size={16} className="text-gray-600" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
