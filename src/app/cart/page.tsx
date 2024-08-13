"use client";
import Link from 'next/link';
import { useCart } from "@/Context/CartContext";
import { MdClose } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);
  
  return isLoggedIn;
};

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const isLoggedIn = useAuth();

  const totalAmount = cart.reduce((total, item) => 
    total + parseFloat(item.product.price.replace('$', '')) * item.quantity, 0
  );

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push('/payment'); // Redirect to payment section
    } else {
      router.push('/login'); // Redirect to login page
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center text-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/shop" className="text-secondary hover:underline">Back to Shop</Link>
      </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <div className="flex flex-col">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.product.name}</h2>
                  <p className="text-light-black-7">{item.product.price}</p>
                  <p className="text-light-black-7">Quantity: {item.quantity}</p>
                  {item.size && <p className="text-secondary">Size: {item.size}</p>}
                </div>
              </div>
              <button
                className="p-2 text-light-black-7"
                onClick={() => removeFromCart(item.product.id)}
              >
                <MdClose size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="ml-8 flex-shrink-0 w-64">
        <h2 className="text-2xl font-semibold mb-4">Total Amount</h2>
        <p className="text-lg mb-4">${totalAmount.toFixed(2)}</p>
        <button
          className="py-1 px-2 mb-4 rounded-md text-white bg-danger"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="py-2 px-4 rounded-md text-white bg-secondary hover:bg-light-yellow"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
