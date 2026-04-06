import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79,
    category: "Electronics",
    image:
      "https://avstore.in/cdn/shop/files/1.AVStore-Sonos-Ace-Front-Angled-View-Hero-Black.jpg?v=1725620870",
  },
  {
    id: 2,
    name: "Minimalist White Watch",
    category: "Accessories",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    id: 3,
    name: "Smart Assistant Speaker",
    category: "Electronics",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800",
  },
  {
    id: 4,
    name: "Pro Digital DSLR Camera",
    category: "Electronics",
    price: 1200.0,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
  },
  {
    id: 5,
    name: "Classic Red Sneakers",
    category: "Footwear",
    price: 75.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 7,
    name: "Urban Travel Backpack",
    category: "Accessories",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
  },
  {
    id: 9,
    name: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 145.0,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800",
  },
  {
    id: 10,
    name: "Wooden Minimalist Desk",
    category: "Furniture",
    price: 220.0,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
  },
  {
    id: 12,
    name: "Gold Frame Sunglasses",
    category: "Accessories",
    price: 150.0,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
  },
  {
    id: 13,
    name: "Grey Cotton Hoodie",
    category: "Apparel",
    price: 55.0,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
  },
  {
    id: 14,
    name: "Scented Soy Candle",
    category: "Home Decor",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
  },
  {
    id: 15,
    name: "Matte Black Coffee Mug",
    category: "Kitchen",
    price: 15.0,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
  },
  {
    id: 16,
    name: "Potted Monstera Plant",
    category: "Home",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800",
  },
  {
    id: 17,
    name: "Vintage Road Bike",
    category: "Sports",
    price: 850.0,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
  },
  {
    id: 18,
    name: "Natural Skincare Oil",
    category: "Beauty",
    price: 34.0,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800",
  },
  {
    id: 20,
    name: "Modern Table Lamp",
    category: "Home Decor",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
  },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Featured");

  const categories = [
    "All Categories",
    ...new Set(products.map((p) => p.category)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Apply sorting
  if (sortBy === "Price: Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "Newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }
  // Featured is the default order (no sorting needed)

  return (
    <div className="min-h-screen text-white pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/90 border border-white/20 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-black/90 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer pr-10"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-black/90 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer pr-10"
              >
                <option value="Featured">Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest">Newest</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No products found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
