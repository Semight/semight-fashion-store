"use client"
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/NavBar";
import Products from "@/components/Products/Products";
import React, { useState } from "react";
import Product1 from "@/assets/shoes_bags1.jpeg"
import Product2 from "@/assets/shoes_bags2.jpeg"
import Product3 from "@/assets/shoes_bags3.jpeg"
import { getImageUrl } from "@/utils/imageUtils";
import Image from "next/image";
import Link from "next/link";

// Dummy product data (you can replace this with actual data fetched from an API)
const allProducts = [
  { id: '1', name: 'Product 1', price: '$49.99', image: Product1, category: 'men' },
  { id: '2', name: 'Product 2', price: '$59.99', image: Product2, category: 'women' },
  { id: '3', name: 'Product 3', price: '$39.99', image: Product3, category: 'kids' },
  // Add more products as needed
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="h-44"></div>
      <div className="flex px-24">
        {/* Sidebar for Categories */}
        <aside className="w-1/4 p-4 bg-gray-200">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            <li>
              <button
                className={`block p-2 w-full text-left ${selectedCategory === null ? 'bg-blue text-white' : 'bg-light-black-2'}`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`block p-2 w-full text-left ${selectedCategory === 'men' ? 'bg-blue text-white' : 'bg-light-black-2'}`}
                onClick={() => setSelectedCategory('men')}
              >
                Men
              </button>
            </li>
            <li>
              <button
                className={`block p-2 w-full text-left ${selectedCategory === 'women' ? 'bg-blue text-white' : 'bg-light-black-2'}`}
                onClick={() => setSelectedCategory('women')}
              >
                Women
              </button>
            </li>
            <li>
              <button
                className={`block p-2 w-full text-left ${selectedCategory === 'kids' ? 'bg-blue text-white' : 'bg-light-black-2'}`}
                onClick={() => setSelectedCategory('kids')}
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
              className="p-2 border rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                    <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
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
