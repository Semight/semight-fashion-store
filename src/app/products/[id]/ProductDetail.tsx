"use client";

import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { useCart } from '@/Context/CartContext';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
}

const ProductDetail = ({ product }: { product: Product | null }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(product?.images[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ product, quantity, size });
      setShowModal(true);
    }
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/shop" className="text-blue hover:underline">Back to Shop</Link>
      <div className="flex flex-col md:flex-row mt-4">
        {/* Main Image */}
        <div className="w-full md:w-1/2">
          <img src={selectedImage || ''} alt={product.name} className="w-full h-auto object-cover" />
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="w-24 h-24 object-cover cursor-pointer border-2 border-light-black-4 hover:border-blue"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-light-black-7 mt-2">{product.price}</p>
          <p className="text-light-black-7 mt-4">{product.description}</p>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Select Size</h2>
            <div className="flex space-x-2 mt-2">
              {product.sizes.map((sizeOption) => (
                <button
                  key={sizeOption}
                  className={`px-4 py-2 border rounded-md ${size === sizeOption ? 'bg-blue text-white' : 'bg-white'}`}
                  onClick={() => setSize(sizeOption)}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <button
              className="p-2 border rounded-md text-light-black-7"
              onClick={() => handleQuantityChange(-1)}
            >
              <AiOutlineMinus />
            </button>
            <span className="mx-2 text-lg">{quantity}</span>
            <button
              className="p-2 border rounded-md text-light-black-7"
              onClick={() => handleQuantityChange(1)}
            >
              <AiOutlinePlus />
            </button>
          </div>

          <button
            className="mt-4 py-2 px-4 rounded-md text-white bg-black hover:bg-light-black-5"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-light-black-4 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg relative w-1/2">
            <button
              className="absolute top-2 right-2 text-light-black-7"
              onClick={() => setShowModal(false)}
            >
              <MdClose size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Product Added to Cart</h2>
            <p className="mb-4">You have added {quantity} {product.name}(s) to your cart.</p>
            <div className="flex justify-between mt-4">
              <Link href="/shop">
                <button className="py-2 px-4 rounded-md text-white bg-blue hover:bg-primary-1">Continue Shopping</button>
              </Link>
              <Link href="/cart">
                <button className="py-2 px-4 rounded-md text-white bg-black hover:bg-primary-1">View Cart and Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
