"use client"
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { categoryProducts, Product } from "@/data/products"

const ShopCategoryPage = () => {
  const params = useParams();
  const category = params?.category;

  if (!category || typeof category !== 'string' || !(category in categoryProducts)) {
    return <p>Category not found</p>;
  }

  const products: Product[] = categoryProducts[category];

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-light-black-5">{product.name}</h3>
            <p className="text-light-black-5">{product.price}</p>
            <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategoryPage;
