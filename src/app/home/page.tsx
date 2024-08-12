// pages/index.tsx
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/NavBar";
import Products from "@/components/Products/Products";
import React from "react";
import Image from 'next/image';
import Link from "next/link";
import BG1 from "@/assets/bg-1.jpg";
import Men from "@/assets/men_wear1.jpeg"
import women from "@/assets/Shoes_bags4.jpeg"
import Kids from "@/assets/kid.jpg"
import Product1 from "@/assets/shoes_bags1.jpeg"
import Product2 from "@/assets/shoes_bags2.jpeg"
import Product3 from "@/assets/shoes_bags3.jpeg"


const Home = () => {
  const products = [
    { id: '1', name: 'Product 1', price: '$49.99', image: Product1 },
    { id: '2', name: 'Product 2', price: '$59.99', image: Product2 },
    { id: '3', name: 'Product 3', price: '$39.99', image: Product3 },
  ];

  return (
    <>
      <Navbar />
      <div className="h-20"></div>
      <div className="">
        {/* Hero Section */}
        <section className="relative bg-light-black-4 py-20 mb-20">
          <div className="absolute inset-0">
            <Image
              src={BG1}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              quality={100}
              className="opacity-50"
            />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Our Semight Fashion Store</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">Discover the latest trends and collections.</p>
            <Link href="/shop" className="bg-black text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-gray-800 transition">Shop Now
            </Link>
          </div>
        </section>

        <div className="px-24">
        {/* Featured Products */}
        <div>
        <h2 className="text-3xl font-bold text-black-1 mb-8 text-center">Our Product</h2>
        <Products products={products} />
        </div>

        {/* Categories */}
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black-1 mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image src={Men} alt="Men" width={400} height={400} className="w-full h-48 object-cover mb-4"/>
                <h3 className="text-xl font-semibold text-black-1">Men</h3>
                <Link href="/shop/men" className="text-blue hover:underline">Shop Men</Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image src={women} alt="Women" width={400} height={400} className="w-full h-48 object-cover mb-4"/>
                <h3 className="text-xl font-semibold text-black-1">Women</h3>
                <Link href="/shop/women" className="text-blue hover:underline">Shop Women</Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image src={Kids} alt="Kids" width={400} height={400} className="w-full h-48 object-cover mb-4"/>
                <h3 className="text-xl font-semibold text-black-1">Kids</h3>
                <Link href="/shop/kids" className="text-blue hover:underline">Shop Kids</Link>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
