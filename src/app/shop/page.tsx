"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/NavBar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  _id: string;
  name: string;
  price: string;
  images: string;
  category: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        // Map _id to id for use in the component
        setProducts(data.map((product) => ({ ...product, id: product._id })));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  })

  const handleCategorySelect = (category: string | null) => {
    console.log("Selected Category:", category);
    setSelectedCategory(category);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="h-44"></div>
      <div className="flex px-24">
        {/* Sidebar for Categories */}
        <aside className="w-1/4 p-4 bg-secondary">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            <li>
              <button
                className={`block p-2 w-full text-left ${
                  selectedCategory === null ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => handleCategorySelect(null)}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`block p-2 w-full text-left ${
                  selectedCategory === "men"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                onClick={() => handleCategorySelect("men")}
              >
                Men
              </button>
            </li>
            <li>
              <button
                className={`block p-2 w-full text-left ${
                  selectedCategory === "women"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                onClick={() => handleCategorySelect("women")}
              >
                Women
              </button>
            </li>
            <li>
              <button
                className={`block p-2 w-full text-left ${
                  selectedCategory === "kids"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
                onClick={() => handleCategorySelect("kid")}
              >
                Kids
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="p-2 border-none rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-custom"
                  >
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.images.length > 0 ? product.images[0] : '/default-image.png'} 
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h3 className="text-xl font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">#{product.price}</p>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
