// "use client"
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { categoryProducts, Product } from "@/data/products"

// const ShopCategoryPage = () => {
//   const params = useParams();
//   const category = params?.category;

//   if (!category || typeof category !== 'string' || !(category in categoryProducts)) {
//     return <p>Category not found</p>;
//   }

//   const products: Product[] = categoryProducts[category];

//   return (
//     <div>
//       <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white p-6 rounded-lg shadow-custom">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={400}
//               height={400}
//               className="w-full h-48 object-cover mb-4"
//             />
//             <h3 className="text-xl font-semibold text-light-black-5">{product.name}</h3>
//             <p className="text-light-black-5">{product.price}</p>
//             <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopCategoryPage;


"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

// Define Product interface (you may already have this)
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

  // Log the category to ensure it's coming through correctly
  console.log("Category:", category);

  useEffect(() => {
    if (typeof category === "string") {
      // Fetch products from the backend
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/products/category/${category}`);
          console.log("API response:", response.data); // Log response data
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching products:", err); // Log error if the request fails
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
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-custom">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-light-black-5">{product.name}</h3>
            <p className="text-light-black-5">{product.price}</p>
            <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategoryPage;
