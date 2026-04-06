import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { Auth } from "../context/AuthContext";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79,
    category: "Electronics",
    image:
      "https://avstore.in/cdn/shop/files/1.AVStore-Sonos-Ace-Front-Angled-View-Hero-Black.jpg?v=1725620870",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
  },
  {
    id: 2,
    name: "Minimalist White Watch",
    category: "Accessories",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    description:
      "Elegant minimalist design with precision Japanese movement and water-resistant dial.",
  },
  {
    id: 3,
    name: "Smart Assistant Speaker",
    category: "Electronics",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800",
    description:
      "AI-powered speaker with crystal clear sound and smart home integration capabilities.",
  },
  {
    id: 4,
    name: "Pro Digital DSLR Camera",
    category: "Electronics",
    price: 1200.0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    description:
      "Professional DSLR camera with 4K video recording and advanced autofocus system.",
  },
  {
    id: 5,
    name: "Classic Red Sneakers",
    category: "Footwear",
    price: 75.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    description:
      "Comfortable classic sneakers with premium cushioning and durable rubber sole.",
  },
  {
    id: 7,
    name: "Urban Travel Backpack",
    category: "Accessories",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description:
      "Spacious backpack designed for urban travelers with multiple compartments and USB charging.",
  },
  {
    id: 9,
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 145.0,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
    description:
      "RGB mechanical keyboard with responsive switches and customizable lighting effects.",
  },
  {
    id: 10,
    name: "Wooden Minimalist Desk",
    category: "Furniture",
    price: 220.0,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
    description:
      "Eco-friendly wooden desk with minimalist design, perfect for home offices and studios.",
  },
  {
    id: 12,
    name: "Gold Frame Sunglasses",
    category: "Accessories",
    price: 150.0,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
    description:
      "Stylish sunglasses with UV protection and premium polarized lenses.",
  },
  {
    id: 13,
    name: "Grey Cotton Hoodie",
    category: "Apparel",
    price: 55.0,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    description:
      "Soft and comfortable cotton hoodie, perfect for casual wear in any season.",
  },
  {
    id: 14,
    name: "Scented Soy Candle",
    category: "Home Decor",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
    description:
      "Natural soy candle with premium fragrances that lasts up to 50 hours.",
  },
  {
    id: 15,
    name: "Matte Black Coffee Mug",
    category: "Kitchen",
    price: 15.0,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    description:
      "Sleek matte black ceramic mug, dishwasher safe and perfect for daily use.",
  },
  {
    id: 16,
    name: "Potted Monstera Plant",
    category: "Home",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
    description:
      "Beautiful indoor Monstera plant that purifies air and adds natural beauty to any space.",
  },
  {
    id: 17,
    name: "Vintage Road Bike",
    category: "Sports",
    price: 850.0,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
    description:
      "Classic vintage road bike with lightweight frame and smooth gear transitions.",
  },
  {
    id: 18,
    name: "Natural Skincare Oil",
    category: "Beauty",
    price: 34.0,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800",
    description:
      "Organic skincare oil infused with natural ingredients for healthy and glowing skin.",
  },
  {
    id: 20,
    name: "Modern Table Lamp",
    category: "Home Decor",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    description:
      "Contemporary table lamp with dimmable LED and elegant design.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(Auth);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Product not found</p>
          <button
            onClick={() => navigate("/dashboard/products")}
            className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    navigate("/dashboard/cart");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-400 mb-8 text-sm">
          <button
            onClick={() => navigate("/dashboard/products")}
            className="hover:text-yellow-400 transition-colors"
          >
            Products
          </button>
          <ChevronRight size={16} />
          <span>{product.category}</span>
          <ChevronRight size={16} />
          <span className="text-gray-600 truncate">
            {product.name.substring(0, 30)}...
          </span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 w-full h-full min-h-96 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start">
            {/* Category Badge */}
            <div className="inline-block w-fit">
              <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-2 rounded-full mb-4">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-bold mb-4 text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-700">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">4.5 (120 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-5xl font-bold text-yellow-400 mb-6">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-400">Quantity:</span>
              <div className="flex items-center border border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-yellow-400 hover:bg-gray-800 transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 text-white min-w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-yellow-400 hover:bg-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors text-lg"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button className="w-full border-2 border-gray-700 hover:border-yellow-400 text-gray-300 hover:text-yellow-400 font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Heart size={20} />
              Add to Wishlist
            </button>

            {/* Info Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-700">
              {/* Free Delivery */}
              <div className="border border-gray-700 rounded-lg p-4 text-center hover:border-yellow-400 transition-colors">
                <Truck size={24} className="mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold text-sm">Free Delivery</p>
                <p className="text-gray-400 text-xs">On orders $50+</p>
              </div>

              {/* Secure Pay */}
              <div className="border border-gray-700 rounded-lg p-4 text-center hover:border-yellow-400 transition-colors">
                <Shield size={24} className="mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold text-sm">Secure Pay</p>
                <p className="text-gray-400 text-xs">256-bit SSL</p>
              </div>

              {/* Easy Returns */}
              <div className="border border-gray-700 rounded-lg p-4 text-center hover:border-yellow-400 transition-colors">
                <RotateCcw size={24} className="mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-gray-400 text-xs">30-day policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
