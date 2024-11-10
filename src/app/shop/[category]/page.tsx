"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ShopCategoryPage = () => {
  const params = useParams();
  const category = params?.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof category === "string") {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/products/category/${category}`);
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to load products. Please try again later.");
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [category]);

  if (!category || typeof category !== "string") return <p>Category not found</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 capitalize">
        {category} Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-48 sm:h-64 object-cover rounded mb-4"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm sm:text-base">${product.price}</p>
            <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline text-sm sm:text-base mt-2 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategoryPage;
