"use client";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";

const FLUTTERWAVE_PAYMENT_LINK = "https://sandbox-flw-web-v3.herokuapp.com/pay/1wtjngidgodk";

const Payment = () => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth()
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const amount = cart.reduce((total, item) => {
      const price = typeof item.product.price === 'string'
        ? parseFloat(item.product.price.replace('$', ''))
        : item.product.price; // Assuming price is a number if it's not a string
      return total + price * item.quantity;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  const handlePayment = () => {
    if (!isAuthenticated) {
      console.log("User is authenticated:", isAuthenticated);
      router.push('/login');
    } else {
      window.location.href = FLUTTERWAVE_PAYMENT_LINK;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <p className="text-lg mb-4">Total Amount: #{totalAmount.toFixed(2)}</p>
      <button
        className="py-2 px-4 rounded-md text-white bg-primary hover:bg-primary-1"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
