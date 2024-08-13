// components/Products/Products.tsx
import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-6 rounded-lg shadow-custom">
            <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-black">{product.name}</h3>
          <p className="text-black">#{product.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
