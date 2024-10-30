// // components/Products/Products.tsx
// import React from "react";
// import Image from 'next/image';
// import Link from "next/link";
// import { Product } from "@/data/products";

// interface ProductsProps {
//   products: Product[];
// }

// const Products: React.FC<ProductsProps> = ({ products }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {products.map((product) => (
//         <div key={product.id} className="bg-white p-6 rounded-lg shadow-custom">
//             <Link href={`/products`}>
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={400}
//             height={400}
//             className="w-full h-48 object-cover mb-4"
//           />
//           {/* <h3 className="text-xl font-semibold text-black">{product.name}</h3>
//           <p className="text-black">#{product.price}</p> */}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;


// components/Products/Products.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product1 from "@/assets/women1.webp"
import Product2 from "@/assets/bag1.jpg"
import Product3 from "@/assets/men_bag1.jpg"
import Product4 from "@/assets/men_wear3.jpeg"
import Product5 from "@/assets/wears1.jpeg"
import Product6 from "@/assets/kid_wear2.jpg"

const Products = () => {
  // Dummy product data
  const products = [
    {
      id: "1",
      name: "Product 1",
      price: "20.00",
      image: Product1, // Ensure you have the images in your public folder or update the paths
    },
    {
      id: "2",
      name: "Product 2",
      price: "30.00",
      image: Product2,
    },
    {
      name: "Product 3",
      image: Product3,
    },
    {
      name: "Product 4",
      image: Product4,
    },
    {
      name: "Product 5",
      image: Product5,
    },
    {
      name: "Product 6",
      image: Product6,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div className="bg-white p-6 rounded-lg shadow-custom">
          <Link href={`/shop`}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-48 object-cover mb-4"
            />
          </Link>
          {/* <h3 className="text-xl font-semibold text-black">{product.name}</h3>
          <p className="text-black">#{product.price}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Products;
